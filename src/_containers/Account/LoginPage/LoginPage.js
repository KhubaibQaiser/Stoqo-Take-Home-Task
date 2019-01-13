import React, { Component } from 'react';
import { connect } from 'react-redux';
import { UserActions } from '../../../_store/Actions/user.actions';
import { PAGE_SET } from '../../../_constants';
import { appController } from '../../../_helpers';
import { Button, InputBox, AlertBox } from '../../../_components';

class LoginPage extends Component {
    login = {
        username: "",
        password: ""
    };

    onChange = (e) => {
        this.login[e.currentTarget.name] = e.currentTarget.value.trim();
    };

    onLogin = (e) => {
        this.props.dispatch(UserActions.login(this.login))
    };

    onSignup = (e) => {
        appController.pageSwitch(PAGE_SET.SIGN_UP);
    };

    render() {
        return (
            <div className="DialogBoxContainer AccountPage">
                <div className="DialogBoxWrapper">
                    <div className="Logo"></div>
                    <div className="small text-light-orange mb-3">Proceed to login</div>
                    <InputBox type="text" label="Enter Username:" placeholder="Username" name="username" onChange={this.onChange} />
                    <InputBox type="password" label="Enter Password:" placeholder="Password" name="password" onChange={this.onChange} />
                    <Button onClick={this.onLogin} className="mb-3 mt-3">Login</Button>
                    <Button onClick={this.onSignup} className="ButtonWhite mb-3">Create New Account</Button>
                    <AlertBox />
                </div>
            </div>
        );
    }
}

const connectedLogin = connect()(LoginPage);
export { connectedLogin as LoginPage };