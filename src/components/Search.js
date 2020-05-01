import React, { Component } from "react"
import { Index } from "elasticlunr"
import { Link } from "gatsby"
import { FaSearch, FaStar, FaRegStar } from "react-icons/fa";

export default class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      query: ``,
      results: [],
    }
    this.threshold = 20
  }

  render() {
    return (
      <div>
        <p className="control has-icons-left">
          <input className="input" type="text" placeholder="Search"
                 value={this.state.query} onChange={this.search} />
          <span className="icon is-left">
            <FaSearch />
          </span>
        </p>
        <div className="content">
          <ul>
            {this.state.results.map(page => (
              <li key={page.id}>
                {page.aggregateRating &&
                  <span>
                    {page.aggregateRating.ratingValue === 0 &&
                      <span>
                        <FaRegStar className="has-text-light" />
                        <FaRegStar className="has-text-light" />
                        <FaRegStar className="has-text-light" />
                        <FaRegStar className="has-text-light" />
                        <FaRegStar className="has-text-light" />
                      </span>
                    }
                    {page.aggregateRating.ratingValue === 1 &&
                      <span>
                        <FaStar className="has-text-warning" />
                        <FaRegStar className="has-text-light" />
                        <FaRegStar className="has-text-light" />
                        <FaRegStar className="has-text-light" />
                        <FaRegStar className="has-text-light" />
                      </span>
                    }
                    {page.aggregateRating.ratingValue === 2 &&
                      <span>
                        <FaStar className="has-text-warning" />
                        <FaStar className="has-text-warning" />
                        <FaRegStar className="has-text-light" />
                        <FaRegStar className="has-text-light" />
                        <FaRegStar className="has-text-light" />
                      </span>
                    }
                    {page.aggregateRating.ratingValue === 3 &&
                      <span>
                        <FaStar className="has-text-warning" />
                        <FaStar className="has-text-warning" />
                        <FaStar className="has-text-warning" />
                        <FaRegStar className="has-text-light" />
                        <FaRegStar className="has-text-light" />
                      </span>
                    }
                    {page.aggregateRating.ratingValue === 4 &&
                      <span>
                        <FaStar className="has-text-warning" />
                        <FaStar className="has-text-warning" />
                        <FaStar className="has-text-warning" />
                        <FaStar className="has-text-warning" />
                        <FaRegStar className="has-text-light" />
                      </span>
                    }
                    {page.aggregateRating.ratingValue === 5 &&
                      <span>
                        <FaStar className="has-text-warning" />
                        <FaStar className="has-text-warning" />
                        <FaStar className="has-text-warning" />
                        <FaStar className="has-text-warning" />
                        <FaStar className="has-text-warning" />
                      </span>
                    }
                    &nbsp;({page.aggregateRating.ratingCount})&nbsp;
                  </span>
                }
                {!page.aggregateRating &&
                  <span>No rating&nbsp;</span>
                }
                <Link to={"/recipes/" + page.slug}>{page.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
  getOrCreateIndex = () =>
    this.index
      ? this.index
      : Index.load(this.props.searchIndex)

  compare(a, b) {
    if (a.aggregateRating !== null && b.aggregateRating !== null) {
      if (b.aggregateRating.ratingValue === a.aggregateRating.ratingValue) {
        return b.aggregateRating.ratingCount - a.aggregateRating.ratingCount
      } else {
        return b.aggregateRating.ratingValue - a.aggregateRating.ratingValue
      }
    } else if (a.aggregateRating === null && b.aggregateRating !== null) {
      return 1
    } else if (a.aggregateRating !== null && b.aggregateRating === null) {
      return -1
    } else {
      return 0
    }
  }

  search = evt => {
    const query = evt.target.value
    this.index = this.getOrCreateIndex()
    this.setState({
      query,
      // Query the index with search string to get an [] of IDs
      results: this.index
        .search(query, { expand: true })
        // Map over each ID and return the full document
        .map(({ ref }) => this.index.documentStore.getDoc(ref))
        .sort(this.compare).slice(0, this.threshold),
    })
  }
}