import React from "react"
import Header from "../components/header"
import Footer from "../components/footer"
import "../scss/styles.scss"

export default ({ children }) => (
  <div class="container">
    <Header></Header>
    {children}
    <Footer></Footer>
  </div>
)
