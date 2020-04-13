import React from "react"
import { graphql } from "gatsby"

export default ({ data }) => {
  return (
    <ul>
      {data.allRecipe.edges.map(({ node }, index) => (
        <li>{index}: {node.name}</li>
      ))}
    </ul>
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