
module.exports = {
  siteMetadata: {
    title: `NYT Cooking Frontend`,
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `jsons`,
        path: `${__dirname}/../nyt-cooking-scraper/recipes/jsons/`,
      },
    },
  ]
}
