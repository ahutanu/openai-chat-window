import React from "react";
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faGear, faImage } from '@fortawesome/free-solid-svg-icons';

function ChatWindowMessageInputArea(props) {
    return (<div className="form-container d-flex w-100" resize="vertical">
      <form className="form-inline w-100 message-input" onSubmit={props.handleSubmit}>
        <textarea type="text" className="form-control w-100" placeholder={props.apiKey === '' ? "API Key not set. Check the Settings menu by pressing on the Gear icon." : "Type a message"} aria-describedby="button-addon2" value={props.message} onChange={e => props.setMessage(e.target.value)} disabled={props.apiKey === '' ? true : false} />
        <Button className="btn btn-outline-secondary" type="button" id="button-addon3" variant="secondary" title="Settings" onClick={() => props.setShowSettingsModal(true)}><FontAwesomeIcon icon={faGear} size="1x" /></Button>
        <Button className="btn btn-outline-secondary" type="button" id="button-addon4" variant="secondary" title="Request Image" onClick={props.handleRequestImage} disabled={props.apiKey === '' ? true : false}><FontAwesomeIcon icon={faImage} size="1x" /></Button>
        <Button className="btn btn-outline-secondary" id="button-addon2" variant="primary" type="submit" title="Send message" disabled={props.apiKey === '' ? true : false}><FontAwesomeIcon icon={faPaperPlane} size="1x" /></Button>
      </form>
    </div>);
}

export default ChatWindowMessageInputArea;