import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/Layout"
import SEO from "../components/SEO"

export default ({ data }) => {
  const threshold = 10
  let keywords = new Map()
  let keywordsReduced = new Map()
  let keywordsSorted = undefined
  // Compile map of keywords with frequencies
  data.allRecipe.edges.forEach(({ node }) => {
    node.fields.keywords.forEach((item) => {
      if (keywords.has(item)) {
        keywords.set(item, keywords.get(item) + 1)
      } else {
        keywords.set(item, 1)
      }
    })
  })
  // Filter by threshold
  keywords.forEach((value, key) => {
    if (value >= threshold) {
      keywordsReduced.set(key, value)
    }
  })
  // Sort by frequencies
  keywordsSorted = new Map([...keywordsReduced.entries()].sort((a, b) => b[1] - a[1]));
  return (
    <Layout>
      <SEO title="Tags" description="Our overview of tags" />
      <div className="field is-grouped is-grouped-multiline">
        {Array.from(keywordsSorted.entries(), ([key, value]) => (
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