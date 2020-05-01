import React from "react"
import { graphql, Link } from "gatsby"
import moment from "moment"
import Layout from "../components/Layout"
import SEO from "../components/SEO"
import RecipeSmallBox from "../components/RecipeSmallBox"

export default ({ pageContext, data }) => {
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
            count={node.node.aggregateRating ? node.node.aggregateRating.ratingCount : undefined}
            />
        </div>
      ))}
    </div>
  ))
  const abc = "abcdefghijklmnopqrstuvwxyz"
  return (
    <Layout>
      <SEO
        title={"Recipes (" + pageContext.letter.toUpperCase() + ")" }
        description={"Our overview of recipes (" + pageContext.letter.toUpperCase() + ")" }
      />
      <nav className="pagination is-centered" role="navigation" aria-label="pagination">
        <ul className="pagination-list">
          {abc.split("").map((letter, _) => (
              <li key={letter}>
              {pageContext.letter === letter &&
                <Link to={"/recipes/page-" + letter} className="pagination-link is-current" aria-label={"Page " + letter.toUpperCase()} aria-current="page">{letter.toUpperCase()}</Link>
              }
              {pageContext.letter !== letter &&
                <Link to={"/recipes/page-" + letter} className="pagination-link" aria-label={"Page " + letter.toUpperCase()} aria-current="page">{letter.toUpperCase()}</Link>
              }
              </li>
          ))}
        </ul>
      </nav>
      {content}
    </Layout>
  )
}

export const query = graphql`
  query($regex: String!) {
    allRecipe(
      sort: {order: DESC, fields: fields___numId}
      filter: {name: {regex: $regex}}
    ) {
      edges {
        node {
          name
          image_internal
          totalTime
          aggregateRating {
            ratingValue
            ratingCount
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