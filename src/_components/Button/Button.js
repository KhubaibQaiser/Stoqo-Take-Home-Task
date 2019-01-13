import React from 'react';
import './Button.css';

export const Button = (props) => {
  return (
    <button ref={props.refer} onClick={props.onClick} className={"btn" + (props.className ? " " + props.className : "")} name={props.name}>
      {props.children}
    </button>
  );
}