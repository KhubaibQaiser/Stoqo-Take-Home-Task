import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ALERT_STATES } from '../../_constants';
import './AlertBox.css';

class AlertBox extends Component {

    render() {
        let alertStyle = { display: "none" }, alertType = " alert-primary";
        if (this.props.alertState.alert_message && this.props.alertState.alert_message !== "" && this.props.alertState.alert_type) {
            alertStyle = {};
        }
        if (this.props.alertState.alert_type && this.props.alertState.alert_type === ALERT_STATES.SUCCESS)
            alertType = " alert-success";
        else if (this.props.alertState.alert_type && this.props.alertState.alert_type === ALERT_STATES.ERROR)
            alertType = " alert-danger";

        return (
            <div className={"alert mt-3 mb-0" + alertType} role="alert" style={alertStyle}>{this.props.alertState.alert_message}</div>
        );
    }
}

const mapStateToProps = (store) => {
    return {
        alertState: store.AppControlState.alertState
    };
}

const connectComp = connect(mapStateToProps)(AlertBox);
export { connectComp as AlertBox };