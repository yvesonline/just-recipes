import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

export default ({ data }) => {
  return (
    <Layout>
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