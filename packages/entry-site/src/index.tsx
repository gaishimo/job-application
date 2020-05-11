/** @jsx jsx */
import ReactDOM from "react-dom"
import { css, jsx } from "@emotion/core"

const style = css`
  background-color: rgba(0, 0, 0, 0.1);
`

const element = <h1 css={style}>Hello, world</h1>
ReactDOM.render(element, document.getElementById("application"))
