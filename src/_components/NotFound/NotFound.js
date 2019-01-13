import React from 'react';
import { Button } from '../';
import { PAGE_SET } from '../../_constants';
import { appController } from '../../_helpers';
import './NotFound.css';

const NotFound = (props) => {
    return (
        <div className="NotFound">
            <h1>4<span>0</span>4</h1>
            <h2>The page you requested could not be found!</h2>
            <Button className="btn-small" onClick={() => appController.pageSwitch(PAGE_SET.LOGIN)}>GO TO HOME</Button>
        </div>
    );
}

export { NotFound };