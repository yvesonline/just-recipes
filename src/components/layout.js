import React from "react"
import Header from "../components/header"
import Footer from "../components/footer"
import "../scss/styles.scss"

export default ({ breadcrumbOverride, children }) => (
  <div className="container">
    <Header breadcrumbOverride={breadcrumbOverride}></Header>
    {children}
    <Footer></Footer>
  </div>
)
