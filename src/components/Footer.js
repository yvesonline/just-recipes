import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { FaUtensils, FaHeart } from 'react-icons/fa';

export default () => {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            short_name
            version
          }
        }
      }
    `
  )
  return (
    <div>
      <br />
      <footer className="footer">
        <div className="content has-text-centered">
          <p>
            <FaUtensils />&nbsp;<strong>{data.site.siteMetadata.title}</strong>
          </p>
          <p>
            Version <span className="logo rounded">{data.site.siteMetadata.version}</span>
          </p>
          <p>
            Made with <FaHeart /> in London.
          </p>
        </div>
      </footer>
    </div>
  )
}