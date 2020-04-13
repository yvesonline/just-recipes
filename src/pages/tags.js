import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

export default ({ data }) => {
  let keywords = new Map()
  data.allRecipe.edges.forEach(({ node }) => {
    node.fields.keywords.forEach((item) => {
      if (keywords.has(item)) {
        keywords.set(item, keywords.get(item) + 1)
      } else {
        keywords.set(item, 1)
      }
    })
  })
  return (
    <Layout>
      <h1>My Site's Tags</h1>
      <ul>
        {Array.from(keywords.entries(), ([key, value]) => (
          <li>{key}: {value}</li>
        ))}
      </ul>
    </Layout>
  )
}

export const query = graphql`
  query {
    allRecipe {
      edges {
        node {
          fields {
            keywords
          }
        }
      }
    }
  }
`