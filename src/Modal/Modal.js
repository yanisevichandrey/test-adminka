import React from 'react';
import './Modal.css';

const modal = (props) => {
    return(
        <div className="Modal" 
        style={{
            display: props.isDelete || props.isAdd || props.isEdit ? 'block' : 'none'
        }}>
            {props.children}
        </div>
    )
}

export default modal;