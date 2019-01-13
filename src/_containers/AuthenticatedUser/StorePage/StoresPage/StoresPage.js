import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StoreActions } from '../../../../_store';
import { appController } from '../../../../_helpers';
import { PAGE_SET } from '../../../../_constants';
import { Pagination } from '../../../../_components'
import './StoresPage.css';

class StoresPage extends Component {

    componentDidMount() {
        this.props.dispatch(StoreActions.getStores({ page: this.props.stores.curPage }));
    }

    jumpToPage = (index) => {
        this.props.dispatch(StoreActions.getStores({ page: index }));
        this.props.dispatch(StoreActions.applyFilter("all"));
    }

    onFilterChange = (e) => {
        this.props.dispatch(StoreActions.applyFilter(e.currentTarget.value.toLowerCase()));
    }

    render() {
        let stores = null;
        let pages = 0;
        let storeTypes = ["all"];
        if (this.props.stores.list && this.props.stores.list.results) {
            stores = [...this.props.stores.list.results];
            pages = Math.ceil(this.props.stores.list.count / 10);
            stores.forEach((item) => {
                if (storeTypes.indexOf(item.type.toLowerCase()) === -1)
                    storeTypes.push(item.type.toLowerCase());
            });
            if (this.props.stores.curFilter.toLowerCase() !== "all") {
                stores = stores.filter((item) => {
                    return item.type === this.props.stores.curFilter;
                });
            }
        }
        return (
            <React.Fragment>
                <div className="FilterContainer clearfix">
                    <div className="Filter">
                        Filter by
                        <select onChange={this.onFilterChange} defaultValue={this.props.stores.curFilter}>
                            {
                                storeTypes.map((val) => {
                                    return <option key={"option_" + val} value={val}>{val}</option>
                                })
                            }
                        </select>
                    </div>
                </div>
                {
                    stores && stores.length > 0 ?
                        <React.Fragment>
                            <div key="storeTable" className="StoreTableContainer d-flex flex-column">
                                <div className="StoreTableWrapper">
                                    <div className="t-head d-flex f-col">
                                        <div className="t-col t-col-s text-center">#</div>
                                        <div className="t-col">Name</div>
                                        <div className="t-col">Phone</div>
                                        <div className="t-col">Address</div>
                                        <div className="t-col type-col">Type</div>
                                        <div className="t-col">Description</div>
                                    </div>
                                    <div className="t-body">
                                        {
                                            stores.map((item, index) => {
                                                return <StoreItem key={item.name + "_" + item.id} index={item.id} info={item} />;
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="container">
                                <Pagination key="pagination" numPages={pages} curActive={this.props.stores.curPage} onClick={this.jumpToPage} />
                            </div>
                        </React.Fragment>
                        :
                        <div className="d-flex flex-column text-center">
                            <div className="FilterError">
                                {
                                    stores && stores.length === 0 ?
                                        "No store found."
                                        :
                                        null
                                }
                            </div>
                        </div>
                }
            </React.Fragment>
        )
    }
}

const StoreItem = (props) => {
    const onStoreClick = (e) => {
        appController.pageSwitch(PAGE_SET.STORE_INFO + props.info.id, { direction: "ltr" });
    };

    return (
        <div onClick={onStoreClick} className="d-flex f-col StoreItem">
            <div className="t-col t-col-s text-center">{props.index}</div>
            <div className="t-col">{props.info.name}</div>
            <div className="t-col">{props.info.phone}</div>
            <div className="t-col">{props.info.address}</div>
            <div className="t-col type-col">{props.info.type}</div>
            <div className="t-col">{props.info.description}</div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        stores: state.StoreState.allStores
    }
}

const connectedComp = connect(mapStateToProps)(StoresPage)
export { connectedComp as StoresPage };
