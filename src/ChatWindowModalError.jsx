import React from "react";
import { Button, Modal } from 'react-bootstrap';

function ChatWindowModalError(props) {
    return (
    <Modal show={props.isApiError} backdrop="static" keyboard={false}>
      <Modal.Header>
        <Modal.Title>API Error</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        The API Returned the following error: {props.apiError}.<br />
        Your only option now is to start a new conversation using the button below.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={props.handleCloseErrorModal}>Start a new conversation</Button>
      </Modal.Footer>
    </Modal>
    );
}

export default ChatWindowModalError;