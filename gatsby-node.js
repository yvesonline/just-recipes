const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `Recipe`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
    const numId = 0
    createNodeField({
      node,
      name: `numId`,
      value: parseInt(slug.substring(1, slug.indexOf("-"))),
    })
    const keywords = node.keywords.split(",")
    createNodeField({
      node,
      name: `keywords`,
      value: keywords.map((item, key) => item.trim().replace(/ /g, "-")),
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      allRecipe(limit: 1800, sort: {fields: fields___numId, order: DESC}) {
        edges {
          node {
            fields {
              slug
            }
            image_internal
          }
        }
      }
    }
  `)
  // Create paginated recipe pages
  const numRecipes = result.data.allRecipe.edges.length
  const recipesPerPage = 90
  const numPages = Math.ceil(numRecipes / recipesPerPage)
  console.log("-------- PAGINATED RECIPE PAGES --------")
  console.log(numPages)
  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: `/recipes/page-${i + 1}`,
      component: path.resolve("./src/templates/RecipeListNumerical.js"),
      context: {
        limit: recipesPerPage,
        skip: i * recipesPerPage,
        numPages,
        currentPage: i + 1,
      },
    })
  })
  // Create alphabetical recipe pages
  const abc = "abcdefghijklmnopqrstuvwxyz"
  let i = abc.length
  while (i--) {
    createPage({
      path: `/recipes/page-${abc.charAt(i)}`,
      component: path.resolve("./src/templates/RecipeListAlphabetical.js"),
      context: {
        letter: abc.charAt(i),
        regex: `/^[${abc.charAt(i)}${abc.charAt(i).toUpperCase()}].*/`,
      },
    })
  }
  // Create individual recipe pages
  console.log("-------- RECIPE PAGES --------")
  console.log(result.data.allRecipe.edges.length)
  result.data.allRecipe.edges.forEach(({ node }) => {
    createPage({
      path: `recipes` + node.fields.slug,
      component: path.resolve(`./src/templates/Recipe.js`),
      context: {
        slug: node.fields.slug,
        image_internal: node.image_internal,
      },
    })
  })
  const result2 = await graphql(`
    query {
      allRecipe(limit: 1800, sort: {fields: fields___numId, order: DESC}) {
        edges {
          node {
            fields {
              keywords
            }
          }
        }
      }
    }
  `)
  let keywords = new Set()
  result2.data.allRecipe.edges.forEach(({ node }) => {
    node.fields.keywords.map((item, key) => keywords.add(item))
  })
  console.log("-------- TAG PAGES --------")
  console.log(keywords.size)
  /*
  let sortings = [
    ["aggregateRating___ratingValue", "DESC", "sorted-by-rating-in-descending-order"],
    ["aggregateRating___ratingValue", "ASC", "sorted-by-rating-in-ascending-order"],
    ["fields___numId", "DESC", "sorted-by-date-in-descending-order"],
    ["fields___numId", "ASC", "sorted-by-date-in-ascending-order"],
  ]
  */
  keywords.forEach((keyword) => {
    createPage({
      path: `tags/` + keyword,
      component: path.resolve(`./src/templates/Tag.js`),
      context: {
        tag: keyword,
        sortBy: "aggregateRating___ratingValue",
        sortDir: "DESC",
      },
    })
    /*
    sortings.forEach((sorting) => {
      createPage({
        path: `tags/` + keyword + `/` + sorting[2],
        component: path.resolve(`./src/templates/Tag.js`),
        context: {
          tag: keyword,
          sortBy: sorting[0],
          sortDir: sorting[1],
        },
      })
    })
    */
  })
}