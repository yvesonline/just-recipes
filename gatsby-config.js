
module.exports = {
  siteMetadata: {
    title: `Just Recipes`,
    short_name: `JR`,
    description: `A frontend to view recipes`,
    author: `Yves Weissig`,
    version: `0.1`,
  },
  plugins: [
    {
      resolve: `gatsby-transformer-json`,
      options: {
        typeName: `Recipe`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `jsons`,
        path: `${__dirname}/data/jsons/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/data/images/`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Just Recipes`,
        short_name: `JR`,
        description: `A frontend to view recipes`,
        lang: `en`,
        start_url: `/`,
        background_color: `#6b37bf`,
        theme_color: `#6b37bf`,
        // Enables "Add to Homescreen" prompt and disables browser UI (including back button)
        // see https://developers.google.com/web/fundamentals/web-app-manifest/#display
        display: `standalone`,
        icon: `src/images/icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    {
      resolve: `@gatsby-contrib/gatsby-plugin-elasticlunr-search`,
      options: {
        fields: [`name`, `description`, `slug`, `aggregateRating`],
        resolvers: {
          Recipe: {
            name: node => node.name,
            description: node => node.description,
            slug: node => node.fields.slug,
            aggregateRating: node => node.aggregateRating,
          }
        },
      },
    },
  ]
}
