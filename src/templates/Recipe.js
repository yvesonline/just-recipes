import React from "react"
import { graphql } from "gatsby"
import moment from "moment"
import { FaStopwatch, FaUtensils } from "react-icons/fa";
import Layout from "../components/Layout"
import SEO from "../components/SEO"

export default ({ data }) => {
  const recipe = data.recipe
  const file = data.file
  return (
    <Layout breadcrumbOverride={recipe.name}>
      <SEO title={recipe.name} description={recipe.description} />
      <p className="title is-2">{recipe.name}</p>
      <p className="subtitle is-4">
        <FaStopwatch />&nbsp;{moment.duration(recipe.totalTime).humanize()}
        &nbsp;&nbsp;&nbsp;
        <FaUtensils />&nbsp;{recipe.recipeYield}
      </p>
      <div className="tile is-ancestor">
        <div className="tile is-5 is-parent">
          <div className="tile is-child">
            <p>{recipe.description}</p>
          </div>
        </div>
        <div className="tile is-parent">
          <div className="tile is-child">
            <figure className="image is-3by2">
              {file !== null
                ? <img src={file.publicURL} alt=" " />
                : <img src="/480x320.png" alt=" " />
              }
            </figure>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!, $image_internal: String) {
    recipe(fields: { slug: { eq: $slug } }) {
      name
      description
      recipeYield
      totalTime
      image_internal
    }
    file(name: { eq: $image_internal }) {
      publicURL
    }
  }
`