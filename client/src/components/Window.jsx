import React from "react";
import Modal from "react-modal";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

Modal.setAppElement("#app");

function eraseText() {
    document.getElementById("activity-textarea").value = "";
}

// Prop names come from the documentation from react-modal
const Window = ({ show, onClose, item, handleDescChange, handleTitleChange, handleCommentSave, handleCommentChange, handleArchiveCard }) => {
    return (
        <Modal
            isOpen={show}
            onRequestClose={onClose}
            className={"modal"}
            overlayClassName={"overlay"}
        >
            <div className={"close-btn-ctn"}>
                <input value={item.title} onChange={(event) => handleTitleChange(event, item.id)} style={{ flex: "1 90%", background: "transparent", border: "none", fontSize: "30px" }}></input>
                <button className="close-btn" onClick={onClose}>X</button>
            </div>
            <div>
                <h2>Description</h2>
                <textarea className="input-field" value={item.content} onChange={(event) => handleDescChange(event, item.id)} maxLength={250} style={{background: "transparent", border: "none"}}></textarea>
                <h2>Status</h2>
                <p>{`${item.status.charAt(0).toUpperCase()}${item.status.slice(1)}`} {item.icon}</p>
                <p>Created: {item.created}</p>
                <p>Modified: {item.modified}</p>
            </div>
            <div style={{margin: "3rem 0rem 0rem 0rem"}}>
                <h2>Activity</h2>
                <textarea id="activity-textarea" onChange={(event) => handleCommentChange(event, item.id)} className="input-field" placeholder={"Write a comment..."} maxLength={200} style={{width: "70%", borderRadius: "5px"}}></textarea>
                <button disabled={(item.activity.length == 5 ? true : false)} onClick={() => { handleCommentSave(item.id); eraseText(); }} type="submit" className="comment-btn" style={{bottom: "5%", borderRadius: "5px", margin: "0.5rem 0rem 0.5rem 0rem", display: "block"}}>Save comment</button>
                <span style={{color: "red"}}>{(item.activity.length == 5 ? "Max of 5 comments per card." : "")}</span>
                <div>{item.activity.map((comment, id) => <p key={id}>{id+1}. {comment}</p>)}</div>
            </div>
            <div>
                <h2 style={{margin: "2.5rem 0rem 0rem 0rem"}}>Archive <a className="trash-icon" onClick={() => handleArchiveCard(item.id)}><FontAwesomeIcon icon={faTrash}/></a></h2>
            </div>
        </Modal>
    );
};

export default Window;