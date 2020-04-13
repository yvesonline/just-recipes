import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

export default ({ data }) => {
  console.log(data)
  return (
    <Layout>
      <h1>My Site's Recipes</h1>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>ratingCount</th>
            <th>ratingValue</th>
          </tr>
        </thead>
        <tbody>
          {data.allRecipe.edges.map(({ node }, index) => (
            <tr key={index}>
              <td>{node.id}</td>
              <td>{node.name}</td>
              <td>{node.aggregateRating.ratingCount}</td>
              <td>{node.aggregateRating.ratingValue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  )
}

export const query = graphql`
  query {
    allRecipe(sort: {order: [DESC, DESC], fields: [aggregateRating___ratingValue, aggregateRating___ratingCount]}, filter: {aggregateRating: {ratingValue: {ne: null}, ratingCount: {gt: 30}}}) {
      edges {
        node {
          id
          name
          aggregateRating {
            ratingCount
            ratingValue
          }
        }
      }
    }
  }
`