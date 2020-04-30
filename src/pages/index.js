import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/Layout"
import SEO from "../components/SEO"

export default ({ data }) => {
  let images = new Map()
  data.allFile.edges.forEach(({ node }) => {
    images.set(node.name, node.publicURL)
  })
  return (
    <Layout breadcrumbOverride="The Latest 3 Recipes...">
      <SEO title="All you add is love" description="Welcome to our website" />
      {data.allRecipe.edges.map(({ node }) => (
        <div className="columns" key={node.name}>
          <div className="column is-4">
            <div className="card">
              <div className="card-image">
                <Link className="has-text-primary" to={"/recipes/" + node.fields.slug}>
                  <figure className="image is-3by2">
                    {images.has(node.image_internal)
                      ? <img src={images.get(node.image_internal)} alt=" " />
                      : <img src="/480x320.png" alt=" " />
                    }
                  </figure>
                </Link>
              </div>
            </div>
          </div>
          <div className="column is-8">
            <h1 className="title"><Link className="has-text-primary" to={"/recipes/" + node.fields.slug}>{node.name}</Link></h1>
            <div className="field is-grouped is-grouped-multiline">
              {Array.from(node.fields.keywords.entries(), ([key, value]) => (
                <div className="control" key={key}>
                  <span className="tag is-info is-capitalized"><Link className="has-text-white" to={"/tags/" + value}>{value.replace(/-/g, " ")}</Link></span>
                </div>
              ))}
            </div>
            <span>{node.description}</span>
          </div>
        </div>
      ))}
    </Layout>
  )
}

export const query = graphql`
  query {
    allRecipe(limit: 3, sort: {order: DESC, fields: fields___numId}) {
      edges {
        node {
          fields {
            keywords
            numId
            slug
          }
          name
          keywords
          description
          image_internal
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