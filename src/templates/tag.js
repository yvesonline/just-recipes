import React from "react"
import { globalHistory as history } from '@reach/router'
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

export default ({ data }) => {
  const { location } = history
  const lowercase_tag = decodeURI(location.pathname).slice(location.pathname.lastIndexOf("/") + 1)
  const tag = lowercase_tag.charAt(0).toUpperCase() + lowercase_tag.slice(1)
  return (
    <Layout>
      <SEO title={tag}  description={"Tags about '"+tag+"'"} />
      <ul>
      {data.allRecipe.edges.map(({ node }, index) => (
        <li key={index}>{node.name}</li>
      ))}
      </ul>
    </Layout>
  )
}

export const query = graphql`
  query($tag: String!) {
    allRecipe(filter: {fields: {keywords: {in: [$tag]}}}) {
      edges {
        node {
          name
        }
      }
    }
  }
`