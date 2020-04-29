import React from "react"
import { graphql } from "gatsby"
import moment from "moment"
import Layout from "../components/Layout"
import SEO from "../components/SEO"
import RecipeSmallBox from "../components/RecipeSmallBox"
import SortingButton from "../components/SortingButton"

export default ({ pageContext, data }) => {
  const tag = pageContext.tag.charAt(0).toUpperCase() + pageContext.tag.slice(1)
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
      <SEO title={tag} description={"Tags about '"+tag+"'"} />
      <div className="buttons is-right">
        <SortingButton
          name="Rating" direction="Up"
          link={"/tags/" + pageContext.tag + "/sorted-by-rating-in-descending-order"}
          disabled={(pageContext.sortBy === "aggregateRating___ratingValue" && pageContext.sortDir === "DESC")} />
        <SortingButton
          name="Rating" direction="Down"
          link={"/tags/" + pageContext.tag + "/sorted-by-rating-in-ascending-order"}
          disabled={(pageContext.sortBy === "aggregateRating___ratingValue" && pageContext.sortDir === "ASC")} />
        <SortingButton
          name="Date" direction="Up"
          link={"/tags/" + pageContext.tag + "/sorted-by-date-in-descending-order"}
          disabled={(pageContext.sortBy === "fields___numId" && pageContext.sortDir === "DESC")} />
        <SortingButton
          name="Date" direction="Down"
          link={"/tags/" + pageContext.tag + "/sorted-by-date-in-ascending-order"}
          disabled={(pageContext.sortBy === "fields___numId" && pageContext.sortDir === "ASC")} />
      </div>
      {content}
    </Layout>
  )
}

export const query = graphql`
  query($tag: String!, $sortBy: [RecipeFieldsEnum], $sortDir: [SortOrderEnum]) {
    allRecipe(filter: {fields: {keywords: {in: [$tag]}}}, , sort: {order: $sortDir, fields: $sortBy}) {
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