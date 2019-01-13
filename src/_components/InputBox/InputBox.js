import React from 'react';
import { appController } from '../../_helpers';
import './InputBox.css';

export const InputBox = (props) => {
  return (
    <div className="form-group mb-2 text-left">
      <label>{props.label} {(props.is_required === "1") ? <sup className="text-danger">*</sup> : ""}</label>
      <input onInput={appController.formNavigation} {...props} className="form-control" />
    </div>
  );
}
