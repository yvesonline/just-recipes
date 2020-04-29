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
            />
        </div>
      ))}
    </div>
  ))
  return (
    <Layout>
      <SEO
        title={"Recipes (" + pageContext.currentPage +"/" + pageContext.numPages + ")" }
        description={"Our overview of recipes (" + pageContext.currentPage +"/" + pageContext.numPages + ")" }
      />
      <nav className="pagination is-centered" role="navigation" aria-label="pagination">
        {pageContext.currentPage !== 1 &&
          <Link to={"recipes/page-" + (pageContext.currentPage - 1)} className="pagination-previous">Previous</Link>
        }
        {pageContext.currentPage === 1 &&
          <Link to={"recipes/page-" + (pageContext.currentPage - 1)} className="pagination-previous" disabled>Previous</Link>
        }
        {pageContext.currentPage !== pageContext.numPages &&
          <Link to={"recipes/page-" + (pageContext.currentPage + 1)} className="pagination-next">Next</Link>
        }
        {pageContext.currentPage === pageContext.numPages &&
          <Link to={"recipes/page-" + (pageContext.currentPage + 1)} className="pagination-next" disabled>Next</Link>
        }
        <ul className="pagination-list">
          {pageContext.currentPage >= 3 &&
            <li><Link to="recipes/page-1" className="pagination-link" aria-label="Goto page 1">1</Link></li>
          }
          {pageContext.currentPage >= 3 &&
            <li><span className="pagination-ellipsis">&hellip;</span></li>
          }
          {pageContext.currentPage >= 2 &&
            <li><Link to={"recipes/page-" + (pageContext.currentPage - 1)} className="pagination-link" aria-label={"Goto page " + (pageContext.currentPage - 1)}>{(pageContext.currentPage - 1)}</Link></li>
          }
          <li><Link to={"recipes/page-" + pageContext.currentPage} className="pagination-link is-current" aria-label={"Page " + pageContext.currentPage} aria-current="page">{pageContext.currentPage}</Link></li>
          {pageContext.currentPage + 1 <= pageContext.numPages &&
            <li><Link to={"recipes/page-" + (pageContext.currentPage + 1)} className="pagination-link" aria-label={"Goto page " + (pageContext.currentPage + 1)}>{(pageContext.currentPage + 1)}</Link></li>
          }
          {pageContext.currentPage <= pageContext.numPages - 2 &&
            <li><span className="pagination-ellipsis">&hellip;</span></li>
          }
          {pageContext.currentPage <= pageContext.numPages - 2 &&
            <li><Link to={"recipes/page-" + pageContext.numPages} className="pagination-link" aria-label={"Goto page " + pageContext.numPages }>{pageContext.numPages}</Link></li>
          }
        </ul>
      </nav>
      {content}
    </Layout>
  )
}

export const query = graphql`
  query($skip: Int!, $limit: Int!) {
    allRecipe(
      skip: $skip
      limit: $limit
      sort: {order: DESC, fields: fields___numId}
    ) {
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