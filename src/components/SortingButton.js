import React from "react"
import { Link } from "gatsby"
import { FaCaretSquareDown, FaCaretSquareUp } from "react-icons/fa";

export default (props) => {
  return (
    <Link to={props.link}>
      {props.disabled === true &&
        <button className="button" disabled>
          <span>{props.name}</span>&nbsp;
          {props.direction === "Up" &&
            <FaCaretSquareUp />
          }
          {props.direction === "Down" &&
            <FaCaretSquareDown />
          }
        </button>
      }
      {props.disabled === false &&
        <button className="button">
          <span>{props.name}</span>&nbsp;
          {props.direction === "Up" &&
            <FaCaretSquareUp />
          }
          {props.direction === "Down" &&
            <FaCaretSquareDown />
          }
        </button>
      }
    </Link>
  )
}