import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/Layout"
import SEO from "../components/SEO"

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
      <SEO title="Tags" description="Our overview of tags" />
      <div className="field is-grouped is-grouped-multiline">
        {Array.from(keywords.entries(), ([key, value]) => (
          <div className="control" key={key}>
            <div className="tags has-addons">
              <span className="tag is-light is-capitalized"><Link className="has-text-black" to={"/tags/" + key}>{key.replace(/-/g, " ")}</Link></span>
              <span className="tag is-primary">{value}</span>
            </div>
          </div>
        ))}
      </div>
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