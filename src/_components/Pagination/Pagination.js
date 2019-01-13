import React, { PureComponent } from 'react';
import './Pagination.css';

class Pagination extends PureComponent {
    render() {
        const pageButtons = [];
        for (let i = 0; i < this.props.numPages; i++) {
            pageButtons.push(<li key={"page_" + i} className={"page-item" + ((this.props.curActive === i + 1) ? " active" : "")}><div className="page-link" onClick={() => this.props.onClick(i + 1)}>{i + 1}</div></li>);
        }
        return (
            <nav className="PaginationContainer" aria-label="Pagination navigation">
                <ul className="pagination justify-content-center flex-wrap">
                    {
                        pageButtons
                    }
                </ul>
            </nav>
        );
    }
};

export { Pagination };
