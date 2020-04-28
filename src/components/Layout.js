import React from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import "../scss/styles.scss"

export default ({ breadcrumbOverride, children }) => (
  <div className="container">
    <Header breadcrumbOverride={breadcrumbOverride}></Header>
    {children}
    <Footer></Footer>
  </div>
)
