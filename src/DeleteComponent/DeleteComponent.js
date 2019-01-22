import React from 'react';
import './DeleteComponent.css'

const deleteComponent = (props) => {
    return (
        <div className="deleteBlock">
            <h2>Are you sure?</h2>
            <div className="wrapBtns">
                <button className="btn btn-success" onClick={props.deleteProduct}>Yes</button>
                <button className="btn btn-danger" onClick={props.hide}>No</button>
            </div>
        </div>
    )
}

export default deleteComponent;