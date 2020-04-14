import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

export default ({ data }) => {
  return (
    <Layout>
      <SEO title="Recipes" description="Our overview of recipes" />
      <table>
        <thead>
          <tr>
            <th>slug</th>
            <th>name</th>
            <th>ratingCount</th>
            <th>ratingValue</th>
          </tr>
        </thead>
        <tbody>
          {data.allRecipe.edges.map(({ node }, index) => (
            <tr key={index}>
              <td><Link to={"/recipes/" + node.fields.slug}>{node.fields.slug}</Link></td>
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
          fields {
            slug
          }
        }
      }
    }
  }
`