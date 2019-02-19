import React from "react"
import Router from "next/router"

class DefaultCity extends React.Component {
  state = {
    redirect: false
  }

  setRedirectNYC = () => {
    Router.push({
        pathname: '/home',
        query: { search: "New York"}
    })
  }


  setRedirectLA = () => {
    Router.push({
      pathname: '/home',
      query: { search: "Los Angeles"}
    })
  }

  setRedirectBoston = () => {
    Router.push({
      pathname: '/home',
      query: { search: "Boston"}
    })
  }


  render () {
    return (
       <div>
       	<button onClick={this.setRedirectNYC}>NYC</button>
       	<button onClick={this.setRedirectLA}>Los Angeles</button>
        <button onClick={this.setRedirectBoston}>Boston</button>
       </div>
    )
  }
}

export default DefaultCity;
