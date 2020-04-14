import React from "react"
import { globalHistory as history } from '@reach/router'
import { useStaticQuery, graphql, Link } from "gatsby"
import { FaUtensils } from 'react-icons/fa';

export default ({ breadcrumbOverride }) => {
  const { location } = history
  let paths = []
  for (const [index, value] of location.pathname.split("/").entries()) {
    if (value !== ``) {
      paths.push({
        index: index,
        link: `/` + value + `/`,
        text: decodeURI(value).charAt(0).toUpperCase() + decodeURI(value).slice(1),
        active: false,
      })
    }
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
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <Link to="/" className="logo navbar-item has-text-black title mt-10 mb-10"><FaUtensils />&nbsp;{data.site.siteMetadata.title}</Link>

          <div role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </div>
        </div>
        <div className="navbar-end mb-20">
          <div className="navbar-item">
            <div className="buttons">
              <Link to="/recipes/" className="button is-primary"><strong>Recipes</strong></Link>
              <Link to="/tags/" className="button is-primary"><strong>Tags</strong></Link>
            </div>
          </div>
        </div>
      </nav>
      {paths.length >= 1 &&
        <nav className="breadcrumb" aria-label="breadcrumbs">
          <ul>
            <li><Link to="/">{data.site.siteMetadata.short_name}</Link></li>
            {paths.map((path, index) => (
              <li key={path.link} className={path.active ? "is-active" : ""}><Link to={path.link}>{path.text}</Link></li>
            ))}
          </ul>
        </nav>
      }
      <br />
    </div>
  )
}
