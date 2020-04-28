import React from "react"
import { graphql } from "gatsby"
import moment from "moment"
import Layout from "../components/Layout"
import SEO from "../components/SEO"
import RecipeSmallBox from "../components/RecipeSmallBox"

export default ({ data }) => {
  let thumbs = new Map()
  data.allFile.edges.forEach(({ node }) => {
    thumbs[node.name] = node.publicURL
  })
  const rows = [...Array( Math.ceil(data.allRecipe.edges.length / 3) )]
  const dataRows = rows.map((row, idx) => data.allRecipe.edges.slice(idx * 3, idx * 3 + 3) )
  const content = dataRows.map((row, idx) => (
    <div className="columns" key={idx}>
      {row.map(node => (
        <div className="column is-4" key={node.node.name}>
          <RecipeSmallBox
            link={"/recipes/" + node.node.fields.slug}
            name={node.node.name}
            image={thumbs[node.node.image_internal]}
            time={moment.duration(node.node.totalTime).humanize()}
            stars={node.node.aggregateRating ? node.node.aggregateRating.ratingValue : undefined}
            />
        </div>
      ))}
    </div>
  ))
  return (
    <Layout>
      <SEO title="Recipes" description="Our overview of recipes" />
      {content}
    </Layout>
  )
}

export const query = graphql`
  query {
    allRecipe(sort: {order: [DESC, DESC], fields: [aggregateRating___ratingValue, aggregateRating___ratingCount]}, filter: {aggregateRating: {ratingValue: {ne: null}, ratingCount: {gt: 30}}}) {
      edges {
        node {
          name
          image_internal
          totalTime
          aggregateRating {
            ratingValue
          }
          fields {
            slug
          }
        }
      }
    }
    allFile(filter: {relativePath: {regex: "/.*full.*/"}}) {
      edges {
        node {
          relativePath
          name
          publicURL
        }
      }
    }
  }
`