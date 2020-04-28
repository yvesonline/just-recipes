# Just Recipes

## Synopsis

Just Recipes is a beautiful frontend for a recipe collection.

It showcases using a static site generator, in this case [Gatsby](https://www.gatsbyjs.org/) in combination with [Bulma](https://bulma.io/).

## Site map

- `/` - **Index** - Lists the latest 3 recipes.
- `/recipes/` - **Recipes** - Lists all recipes, implements pagination.
- `/recipes-alpha/` - **Recipes alphabetical** - Lists all recipes alphabetical.
- `/recipes/<recipe>` - **Recipe Detail** - Shows one recipe.
- `/tags/` - **Tags** - Lists all tags.
- `/tags/<tag>` - **Tag Detail** - Lists all recipes for one tag, implements client-side sorting.
- `/search/` - **Search** - Provides a full-text search.


## Usage & Development

To fire up Just Recipes and develop/build/and so on do the following:

```lang=shell
$ nvm install 10                                         # Make sure to have Node 10 installed
$ nvm use 10                                             # Make sure that Node 10 is selected
$ npm install -g gatsby-cli                              # Make sure Gatsby is installed
$ gatsby help                                            # Display Gatsby Help
$ gatsby develop                                         # Start development server
$ gatsby build                                           # Build a Gatsby App
$ gatsby serve                                           # Serve a Gatsby App
$ npm install --save bulma node-sass gatsby-plugin-sass  # Example of installing plugins
```

## To-do list

- Recipe Detail: Create page
- Search: Create page
- Tag Detail: Implement server-side sorting (by stars, by most recent)
- Recipes: Implement pagination
- Recipes alphabetical: Create page
- Global: Add screenshots to `README.md`
- Global: Create Docker version of application