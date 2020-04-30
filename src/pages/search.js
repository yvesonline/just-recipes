import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import SEO from "../components/SEO"
import Search from "../components/Search"

export default ({ data }) => {
  return (
    <Layout>
      <SEO title="Search" description="Search our recipes" />
      <Search searchIndex={data.siteSearchIndex.index} />
      <br />
    </Layout>
  )
}

export const query = graphql`
  query {
    siteSearchIndex {
      index
    }
  }
`