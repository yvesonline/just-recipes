import React from "react"
import { Link } from "gatsby"
import { FaStar, FaRegStar } from 'react-icons/fa';

export default (props) => {
  return (
    <Link to={props.link}>
      <div className="card">
        <div className="card-header">
          <div className="card-header-title is-centered">
            {props.name}
          </div>
        </div>
        <div className="card-image">
          <figure className="image">
            <img src={props.image} alt=" " />
          </figure>
        </div>
        <div className="card-content">
          <div className="content">
            {props.stars === undefined &&
              <span>
                No rating
              </span>
            }
            {props.stars === 0 &&
              <span>
                <FaRegStar className="has-text-light" />
                <FaRegStar className="has-text-light" />
                <FaRegStar className="has-text-light" />
                <FaRegStar className="has-text-light" />
                <FaRegStar className="has-text-light" />
              </span>
            }
            {props.stars === 1 &&
              <span>
                <FaStar className="has-text-warning" />
                <FaRegStar className="has-text-light" />
                <FaRegStar className="has-text-light" />
                <FaRegStar className="has-text-light" />
                <FaRegStar className="has-text-light" />
              </span>
            }
            {props.stars === 2 &&
              <span>
                <FaStar className="has-text-warning" />
                <FaStar className="has-text-warning" />
                <FaRegStar className="has-text-light" />
                <FaRegStar className="has-text-light" />
                <FaRegStar className="has-text-light" />
              </span>
            }
            {props.stars === 3 &&
              <span>
                <FaStar className="has-text-warning" />
                <FaStar className="has-text-warning" />
                <FaStar className="has-text-warning" />
                <FaRegStar className="has-text-light" />
                <FaRegStar className="has-text-light" />
              </span>
            }
            {props.stars === 4 &&
              <span>
                <FaStar className="has-text-warning" />
                <FaStar className="has-text-warning" />
                <FaStar className="has-text-warning" />
                <FaStar className="has-text-warning" />
                <FaRegStar className="has-text-light" />
              </span>
            }
            {props.stars === 5 &&
              <span>
                <FaStar className="has-text-warning" />
                <FaStar className="has-text-warning" />
                <FaStar className="has-text-warning" />
                <FaStar className="has-text-warning" />
                <FaStar className="has-text-warning" />
              </span>
            }
            <br />
            {props.time}
          </div>
        </div>
      </div>
    </Link>
  )
}