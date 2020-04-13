import React from "react"
import { useStaticQuery, graphql } from "gatsby"

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
    <footer class="footer">
      <div class="content has-text-centered">
        <p>
          <span class="logo rounded">{data.site.siteMetadata.short_name}</span>&nbsp;&nbsp;&nbsp;&nbsp;<strong>{data.site.siteMetadata.title}</strong>&nbsp;&nbsp;&nbsp;&nbsp;Version {data.site.siteMetadata.version}
        </p>
      </div>
    </footer>
  )
}