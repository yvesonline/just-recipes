import React from "react"
import { graphql, Link } from "gatsby"
import moment from "moment"
import { FaStopwatch, FaUtensils, FaStar, FaRegStar } from "react-icons/fa";
import Layout from "../components/Layout"
import SEO from "../components/SEO"

export default ({ data }) => {
  const recipe = data.recipe
  const file = data.file
  if (recipe.recipeInstructions === null) {
    recipe.recipeInstructions = new Map()
  }
  return (
    <Layout breadcrumbOverride={recipe.fields.numId}>
      <SEO title={recipe.name} description={recipe.description} />
      <p className="title is-2 has-text-grey-dark">{recipe.name}</p>
      <p className="subtitle is-4">
        <FaStopwatch />&nbsp;{moment.duration(recipe.totalTime).humanize()}
        &nbsp;&nbsp;&nbsp;
        <FaUtensils />&nbsp;{recipe.recipeYield}
        &nbsp;&nbsp;&nbsp;
        {recipe.aggregateRating &&
          <span>
            {recipe.aggregateRating.ratingValue === 0 &&
              <span>
                <FaRegStar className="has-text-light" />
                <FaRegStar className="has-text-light" />
                <FaRegStar className="has-text-light" />
                <FaRegStar className="has-text-light" />
                <FaRegStar className="has-text-light" />
              </span>
            }
            {recipe.aggregateRating.ratingValue === 1 &&
              <span>
                <FaStar className="has-text-warning" />
                <FaRegStar className="has-text-light" />
                <FaRegStar className="has-text-light" />
                <FaRegStar className="has-text-light" />
                <FaRegStar className="has-text-light" />
              </span>
            }
            {recipe.aggregateRating.ratingValue === 2 &&
              <span>
                <FaStar className="has-text-warning" />
                <FaStar className="has-text-warning" />
                <FaRegStar className="has-text-light" />
                <FaRegStar className="has-text-light" />
                <FaRegStar className="has-text-light" />
              </span>
            }
            {recipe.aggregateRating.ratingValue === 3 &&
              <span>
                <FaStar className="has-text-warning" />
                <FaStar className="has-text-warning" />
                <FaStar className="has-text-warning" />
                <FaRegStar className="has-text-light" />
                <FaRegStar className="has-text-light" />
              </span>
            }
            {recipe.aggregateRating.ratingValue === 4 &&
              <span>
                <FaStar className="has-text-warning" />
                <FaStar className="has-text-warning" />
                <FaStar className="has-text-warning" />
                <FaStar className="has-text-warning" />
                <FaRegStar className="has-text-light" />
              </span>
            }
            {recipe.aggregateRating.ratingValue === 5 &&
              <span>
                <FaStar className="has-text-warning" />
                <FaStar className="has-text-warning" />
                <FaStar className="has-text-warning" />
                <FaStar className="has-text-warning" />
                <FaStar className="has-text-warning" />
              </span>
            }
            &nbsp;({recipe.aggregateRating.ratingCount})&nbsp;
          </span>
        }
        {!recipe.aggregateRating &&
          <span>No rating&nbsp;</span>
        }
      </p>
      <div className="field is-grouped is-grouped-multiline pb-20">
        {Array.from(recipe.fields.keywords.entries(), ([key, value]) => (
          <div className="control" key={key}>
            <span className="tag is-light is-capitalized"><Link className="has-text-black" to={"/tags/" + value}>{value.replace(/-/g, " ")}</Link></span>
          </div>
        ))}
      </div>
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
      <div className="tile is-ancestor">
        <div className="tile is-5 is-parent">
          <div className="tile is-child content">
            <p className="title is-2 has-text-grey-dark">Ingredients</p>
            <ul>
              {Array.from(recipe.recipeIngredient.entries(), ([key, value]) => (
                <li key={key}>{value}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="tile is-parent">
          <div className="tile is-child content">
            <p className="title is-2 has-text-grey-dark">Steps</p>
            {Array.from(recipe.recipeInstructions.entries(), ([key, value]) => (
              <div>
                <span className="tag is-primary is-large">{key + 1}</span>
                <p className="mt-10 mb-10">{value.text}</p>
              </div>
            ))}
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
      fields {
        keywords
        numId
      }
      recipeIngredient
      recipeInstructions {
        text
      }
      aggregateRating {
        ratingValue
        ratingCount
      }
    }
    file(name: { eq: $image_internal }) {
      publicURL
    }
  }
`