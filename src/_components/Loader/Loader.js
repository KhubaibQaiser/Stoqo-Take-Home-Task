import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from '../';
import { LOADER_STATES } from '../../_constants';
import { ApiActions } from '../../_store/';
import './Loader.css';

class Loader extends Component {

  render() {
    let LoaderStyle = { display: "none" };
    let RetryMessageStyle = { display: "none" };
    let SpinnerStyle = { display: "none" };
    switch (this.props.loaderState.isLoading) {
      case LOADER_STATES.SHOW:
        SpinnerStyle.display = LoaderStyle.display = "";
        break
      case LOADER_STATES.HIDE:
        RetryMessageStyle.display = LoaderStyle.display = "";
        break
      default:
        break
    }
    if (!this.props.loaderState.isBlocking)
      LoaderStyle.pointerEvents = "none";

    return (
      <div id="Loader" className="Loader" style={LoaderStyle}>
        <div className="loader-msg-overlay" style={RetryMessageStyle}>
          <div className="loader-msg-wrapper">
            <div className="loader-msg">
              <span className="close-btn" onClick={() => this.props.dispatch(ApiActions.cancel())}><i className="fa fa-times"></i> Close</span>
              <div className="RetryMessageBox">
                <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNi4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkNhcGFfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiDQoJIHdpZHRoPSI1NnB4IiBoZWlnaHQ9IjU2cHgiIHZpZXdCb3g9IjAgMCA1NiA1NiIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgNTYgNTYiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPHBhdGggZmlsbD0iIzRGNjE2QiIgZD0iTTMzLjg4Miw0Ni4zMjRjMCwzLjIxNy0yLjYwNiw1LjgyMy01LjgyMyw1LjgyM2MtMy4yMTcsMC01LjgyMi0yLjYwNi01LjgyMi01LjgyM3MyLjYwNS01LjgyMiw1LjgyMi01LjgyMg0KCQlDMzEuMjc1LDQwLjUwMiwzMy44ODIsNDMuMTA3LDMzLjg4Miw0Ni4zMjR6IE0zNy4yMDUsMjUuODc3Yy0xLjgzNC0wLjc3My0zLjczNC0xLjMwOS01LjY4Ni0xLjU5Nmw5Ljg5Myw5Ljg4N2wzLjI2MS0zLjI2DQoJCUM0Mi41MTYsMjguNzUxLDQwLjAwNCwyNy4wNTYsMzcuMjA1LDI1Ljg3N3ogTTE4LjA3MiwyNi4yNDVjLTIuNTg3LDEuMjE2LTQuOTEzLDIuODc0LTYuOTA3LDQuOTQzbDcuMTY5LDYuOTMzDQoJCWMyLjA4Mi0yLjE1Nyw0Ljc0NC0zLjUyMiw3LjY0My0zLjk3MUwxOC4wNzIsMjYuMjQ1eiBNNi4yMDksMTQuMzc1QzMuOTgzLDE1Ljg0NywxLjkwOCwxNy41MzYsMCwxOS40NWw3LjA1MSw3LjA1DQoJCWMxLjkyLTEuOTIsNC4wNzEtMy41NTMsNi40MDgtNC44NjlMNi4yMDksMTQuMzc1eiBNNDMuNDI2LDEwLjkxYy00Ljg2OS0yLjA0NS0xMC4wNDMtMy4wODYtMTUuMzY3LTMuMDg2DQoJCWMtMy44ODQsMC03LjY4LDAuNTU1LTExLjMzOSwxLjY0Nmw4LjQ2NSw4LjQ2NmMwLjk0OC0wLjA5MywxLjkwOC0wLjEzNywyLjg3NC0wLjEzN2M3Ljg4NiwwLDE1LjMxLDMuMDU1LDIwLjkxNiw4LjYwM0w1NiwxOS4zMTkNCgkJQzUyLjM1OSwxNS43MTYsNDguMTMzLDEyLjg4Niw0My40MjYsMTAuOTF6IE0zLjM5MSw3LjkxMUw0Mi4zNTksNDYuODhsNC4wNTktNC4wNTlMNy40NSwzLjg1M0wzLjM5MSw3LjkxMXoiLz4NCjwvZz4NCjwvc3ZnPg0K" alt="No internet" />
                <br /><br />
                Check your Internet Connection and try again.
              </div>
              <div className="">
                <Button onClick={() => this.props.dispatch(ApiActions.retry())}>Retry</Button>
              </div>
            </div>
          </div>

        </div>

        <div className="spinner-wrapper" style={SpinnerStyle}>
          <div className="spinner">Loading...</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loaderState: state.AppControlState.loaderState
  };
}

const connectedLoader = connect(mapStateToProps)(Loader);
export { connectedLoader as Loader };
