import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';
import { PAGE_SET } from '../../_constants';
import { animations, appController } from '../../_helpers';
import { AlertActions } from '../../_store';
import { LoginPage, SignupPage } from '../'
import './AccountPage.css';

class AccountPage extends Component {
    constructor(props) {
        super(props);
        this.EnteringAnimation = animations.ltrEnter;
        this.ExitingAnimation = animations.ltrExit;
        this.props.history.listen((location, action) => {
            if(location.pathname === PAGE_SET.LOGIN || location.pathname === PAGE_SET.SIGN_UP)
                this.props.dispatch(AlertActions.clear());
        });
    }


    onTabClick = (e) => {
        appController.PageSwitch(e.currentTarget.getAttribute("data-path"));
    }

    render() {
        if (this.props.history.location.state && this.props.history.location.state.direction) {
            this.EnteringAnimation = (this.props.history.location.state.direction === "rtl") ? animations.rtlEnter : animations.ltrEnter;
            this.ExitingAnimation = (this.props.history.location.state.direction === "rtl") ? animations.rtlExit : animations.ltrExit;
        }
        return (
            <div className="container">
                <AnimatedSwitch runOnMount={false} atEnter={this.EnteringAnimation} atLeave={this.ExitingAnimation} atActive={animations.Active} mapStyles={animations.MapStyles} className="switch-wrapper UserAccount">
                    <Route exact path={PAGE_SET.LOGIN} component={LoginPage} />
                    <Route exact path={PAGE_SET.SIGN_UP} component={SignupPage} />
                    <Route exact path={PAGE_SET.ACCOUNT} render={() => (<Redirect to={PAGE_SET.LOGIN} />)} />
                    <Route render={() => <Redirect to={PAGE_SET.NOT_FOUND} />} />
                </AnimatedSwitch>
            </div>
        );
    }
}

const routedComp = withRouter(connect()(AccountPage));
export { routedComp as AccountPage }