import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StoreActions } from '../../../../_store';
import './StoreInfoPage.css';

class StoreInfoPage extends Component {
    componentDidMount() {
        this.props.dispatch(StoreActions.getStoreInfo({ id: this.props.match.params.id }));
    }

    render() {
        const { info } = this.props;
        return (
            <div className="StoreInfo col-12">
                {
                    info.id ?
                        <div className="d-flex flex-column justify-content-center">
                            {
                                info.id > -1 ?
                                    <React.Fragment>
                                        <div className="row">
                                            <div className="HeaderLabel col-12">{info.name}</div>
                                        </div>
                                        <div className="InfoRow row">
                                            <div className="col-4">Phone</div>
                                            <div className="col-8">{info.phone}</div>
                                        </div>
                                        <div className="InfoRow row">
                                            <div className="col-4">Address</div>
                                            <div className="col-8">{info.address}</div>
                                        </div>
                                        <div className="InfoRow row">
                                            <div className="col-4">Type</div>
                                            <div className="col-8">{info.type}</div>
                                        </div>
                                        <div className="InfoRow row">
                                            <div className="col-4">Description</div>
                                            <div className="col-8">{info.description}</div>
                                        </div>
                                    </React.Fragment>
                                    :
                                    <div className="text-center">Store doesn't exist!</div>
                            }
                        </div>
                        :
                        null
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        info: state.StoreState.storeInfo
    }
};

const connectedComp = connect(mapStateToProps)(StoreInfoPage);
export { connectedComp as StoreInfoPage };
