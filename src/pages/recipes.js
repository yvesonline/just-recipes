import React from "react"
import { Link } from "gatsby"
import Layout from "../components/Layout"
import SEO from "../components/SEO"

export default () => {
  const abc = "abcdefghijklmnopqrstuvwxyz"
  return (
    <Layout>
      <SEO title="Recipes" description="Our overview of recipes" />
      <nav className="pagination is-centered" role="navigation" aria-label="pagination">
        <ul className="pagination-list">
          {abc.split("").map((letter, _) => (
              <li key={letter}><Link to={"/recipes/page-" + letter} className="pagination-link" aria-label={"Page " + letter.toUpperCase()} aria-current="page">{letter.toUpperCase()}</Link></li>
          ))}
        </ul>
      </nav>
    </Layout>
  )
}