import React from "react"
import { graphql } from "gatsby"
import SEO from "../components/seo"

export default ({ data }) => {
  const recipe = data.recipe
  return (
    <div>
      <SEO title={recipe.name} description={recipe.description} />
      <h1>{recipe.name}</h1>
      <div>{recipe.description}</div>
      <div>{recipe.recipeCategory}</div>
    </div>
  )
}

export const query = graphql`
  query($slug: String!) {
    recipe(fields: { slug: { eq: $slug } }) {
      name
      description
      recipeCategory
    }
  }
`