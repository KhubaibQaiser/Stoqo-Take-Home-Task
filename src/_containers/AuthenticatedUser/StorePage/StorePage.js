import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { PAGE_SET } from '../../../_constants';
import { appController } from '../../../_helpers';
import { UserActions, StoreActions } from '../../../_store';
import { StoresPage } from './StoresPage/StoresPage';
import { StoreInfoPage } from './StoreInfoPage/StoreInfoPage';
import { Button } from '../../../_components';
import "./StorePage.css";

class StorePage extends Component {

  onLogout = (e) => {
    this.props.dispatch(UserActions.logout());
  }

  gotoStoresList = (e) => {
    appController.pageSwitch(PAGE_SET.STORES, { direction: "rtl" });
    this.props.dispatch(StoreActions.clearStoreInfo());
  }


  render() {
    let leftBtStyle = { display: "none" };
    let leftBtClick = null;
    let title = "Store List";
    if (this.props.location.pathname !== PAGE_SET.STORES) {
      leftBtStyle = {};
      leftBtClick = this.gotoStoresList;
      title = "Store Info"
    }

    return (
      <React.Fragment>
        <header className="d-flex f-row StoreHeader">
          <div className="container HeaderWrapper d-flex f-col">
            <div className="SideButton LeftButton">
              <div onClick={leftBtClick} className="GoBackButton" style={leftBtStyle}><span className="fa fa-arrow-left"></span> Store List</div>
            </div>
            <div className="Title">
              <div className="">{title}</div>
            </div>
            <div className="SideButton RightButton">
              <Button onClick={this.onLogout} className="btn-small">Logout</Button>
            </div>
          </div>
        </header>
        <div className="container adjustable-container">
          <Switch className="switch-wrapper">
            <Route path={PAGE_SET.STORE_INFO + ":id"} component={StoreInfoPage} />
            <Route exact path={PAGE_SET.STORES} component={StoresPage} />
          </Switch>
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    store: state.StoreState
  }
}

const connectedComp = connect(mapStateToProps)(StorePage);
export { connectedComp as StorePage };
