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
      value: keywords.map((item, key) => item.trim()),
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      allRecipe {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `)
  result.data.allRecipe.edges.forEach(({ node }) => {
    createPage({
      path: `recipes` + node.fields.slug,
      component: path.resolve(`./src/templates/Recipe.js`),
      context: {
        slug: node.fields.slug,
      },
    })
  })
  const result2 = await graphql(`
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
  `)
  let keywords = new Set()
  result2.data.allRecipe.edges.forEach(({ node }) => {
    node.fields.keywords.map((item, key) => keywords.add(item))
  })
  keywords.forEach((value) => {
    createPage({
      path: `tags/` + value,
      component: path.resolve(`./src/templates/Tag.js`),
      context: {
        tag: value,
      },
    })
  })
}