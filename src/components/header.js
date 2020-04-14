import React from "react"
import { Link } from "gatsby"
import { FaUtensils } from 'react-icons/fa';

export default () => (
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <Link to="/" className="logo navbar-item has-text-black title mt-10 mb-10"><FaUtensils />&nbsp;Just Recipes</Link>

      <div role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </div>
    </div>
    <div class="navbar-end mb-20">
      <div class="navbar-item">
        <div class="buttons">
          <Link to="/recipes/" className="button is-primary"><strong>Recipes</strong></Link>
          <Link to="/tags/" className="button is-primary"><strong>Tags</strong></Link>
        </div>
      </div>
    </div>
  </nav>
)
