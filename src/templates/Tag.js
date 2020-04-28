import React from "react"
import { graphql, Link } from "gatsby"
import moment from "moment"
import { FaCaretSquareDown, FaCaretSquareUp } from "react-icons/fa";
import Layout from "../components/Layout"
import SEO from "../components/SEO"
import RecipeSmallBox from "../components/RecipeSmallBox"

export default ({ pageContext, data }) => {
  console.log(pageContext)
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
      <div class="buttons is-right">
          <Link to={"/tags/" + pageContext.tag + "/aggregateRating___ratingValue/ASC"}>
            <button className="button">
              <span>Rating</span>&nbsp;
              <FaCaretSquareDown />
            </button>
          </Link>
          <Link to={"/tags/" + pageContext.tag + "/aggregateRating___ratingValue/DESC"}>
            <button className="button">
              <span>Rating</span>&nbsp;
              <FaCaretSquareUp />
            </button>
          </Link>
          <Link to={"/tags/" + pageContext.tag + "/aggregateRating___ratingValue/ASC"}>
            <button className="button">
              <span>Date</span>&nbsp;
              <FaCaretSquareDown />
            </button>
          </Link>
          <Link to={"/tags/" + pageContext.tag + "/aggregateRating___ratingValue/DESC"}>
            <button className="button">
              <span>Date</span>&nbsp;
              <FaCaretSquareUp />
            </button>
          </Link>
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