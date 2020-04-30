import React from "react"
import { globalHistory as history } from "@reach/router"
import { useStaticQuery, graphql, Link } from "gatsby"
import { FaUtensils, FaSearch } from "react-icons/fa";

export default ({ breadcrumbOverride }) => {
  const { location } = history
  let paths = []
  let link = `/`
  for (const [index, value] of location.pathname.split("/").entries()) {
    if (value !== ``) {
      paths.push({
        index: index,
        link: link + value + `/`,
        text: value.replace(/-/g, " "),
        active: false,
      })
      link = value + `/`
    }
  }
  if (paths.length === 0 && breadcrumbOverride) {
    paths.push({
      index: 1,
      link: "",
      text: breadcrumbOverride,
      active: false,
    })
  }
  if (paths.length >= 1) {
    paths[paths.length - 1].active = true
  }
  if (paths.length >= 1 && breadcrumbOverride) {
    paths[paths.length - 1].text = breadcrumbOverride
  }
  const data = useStaticQuery(
  graphql`
    query {
      site {
        siteMetadata {
          title
          short_name
        }
      }
    }
  `
  )
  return (
    <div>
      <nav className="navbar is-fixed-top" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <Link to="/" className="logo navbar-item has-text-black title mt-10 mb-10 ml-20"><FaUtensils />&nbsp;{data.site.siteMetadata.title}</Link>

          <div role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </div>
        </div>
        <div className="navbar-end mb-10 mr-20">
          <div className="navbar-item">
            <div className="buttons">
              <Link to="/search" className="button is-primary"><strong><FaSearch /></strong></Link>
              <Link to="/recipes" className="button is-primary"><strong>A-Z</strong></Link>
              <Link to="/recipes/page-1" className="button is-primary"><strong>Recipes</strong></Link>
              <Link to="/tags/" className="button is-primary"><strong>Tags</strong></Link>
            </div>
          </div>
        </div>
      </nav>
      {paths.length >= 1 &&
        <nav className="breadcrumb mt-80" aria-label="breadcrumbs">
          <ul>
            <li><Link to="/">{data.site.siteMetadata.short_name}</Link></li>
            {paths.map((path, index) => (
              <li key={path.link} className={path.active ? "is-active is-capitalized" : "is-capitalized"}><Link to={path.link}>{path.text}</Link></li>
            ))}
          </ul>
        </nav>
      }
      <br />
    </div>
  )
}
