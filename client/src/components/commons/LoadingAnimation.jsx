import React, {Component} from 'react'
import './loadingAnimation.css'
class LoadingAnimation extends Component {
    render () {
        return (
            <div className = 'loading-container'>
            <img
            className="loader"
            src="../loader.gif"
            alt=""
          />
        </div>)
    }
}
export default LoadingAnimation