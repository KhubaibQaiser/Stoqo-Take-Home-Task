import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PAGE_SET } from '../../../_constants';
import { appController } from '../../../_helpers';
import { Button, InputBox, AlertBox } from '../../../_components';
import { UserActions } from '../../../_store';

class SignupPage extends Component {
    signup = {
        username: "",
        password: ""
    };

    onChange = (e) => {
        this.signup[e.currentTarget.name] = e.currentTarget.value.trim();
    };

    onSignup = (e) => {
        this.props.dispatch(UserActions.signup(this.signup));
    };

    onCancel = (e) => {
        appController.pageSwitch(PAGE_SET.LOGIN, { direction: "rtl" });
    };

    render() {
        return (
            <div className="DialogBoxContainer AccountPage">
                <div className="DialogBoxWrapper">
                    <div className="Logo"></div>
                    <InputBox type="text" label="Enter Username:" placeholder="Username" name="username" onChange={this.onChange} />
                    <InputBox type="password" label="Enter Password:" placeholder="Password" name="password" onChange={this.onChange} />
                    <Button onClick={this.onSignup} className="mb-3 mt-3">Signup</Button>
                    <Button onClick={this.onCancel} className="ButtonWhite mb-3">Go back to Login</Button>
                    <AlertBox />
                </div>
            </div>
        )
    }
}

const connectedComp = connect()(SignupPage);
export { connectedComp as SignupPage };
