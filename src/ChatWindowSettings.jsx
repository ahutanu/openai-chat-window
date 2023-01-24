
import React from "react";

import { Modal, Button } from 'react-bootstrap';

function ChatWindowSettings(props) {
    return (<Modal show={props.showSettingsModal} onHide={() => props.setShowSettingsModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Settings</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>API Settings</h4>
        <br />
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroup-sizing-default">API Key</span>
          </div>
          <input type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" value={props.apiKey} onChange={e => props.setApiKey(e.target.value)} />
        </div>
        <br />
        <h4>AI Text Model Settings</h4>
        <br />
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroup-sizing-default">AI Model</span>
          </div>
          <select className="form-select" value={props.model} onChange={e => props.setModel(e.target.value)}>
            <option value="text-davinci-003">Davinci</option>
            <option value="text-curie-001">Curie</option>
            <option value="text-babbage-001">Babbage</option>
            <option value="text-ada-001">Ada</option>
          </select>
          <br />
        </div>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroup-sizing-default">Temperature</span>
          </div>
          <input type="range" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" min="0" max="1" step="0.1" value={props.temperature} onChange={e => props.setTemperature(e.target.value)} title="What sampling temperature to use. Higher values means the model will take more risks. Try 0.9 for more creative applications, and 0 (argmax sampling) for ones with a well-defined answer." />
          <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroup-sizing-default">{props.temperature}</span>
          </div>
        </div>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroup-sizing-default">Frequence Penalty</span>
          </div>
          <input type="range" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" min="-2.0" max="2.0" step="0.1" value={props.frequencyPenalty} onChange={e => props.setFrequencyPenalty(e.target.value)} title="Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim." />
          <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroup-sizing-default">{props.frequencyPenalty}</span>
          </div>
        </div>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroup-sizing-default">Presence Penalty</span>
          </div>
          <input type="range" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" min="-2.0" max="2.0" step="0.1" value={props.presencePenalty} onChange={e => props.setPresencePenalty(e.target.value)} title="Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics." />
          <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroup-sizing-default">{props.presencePenalty}</span>
          </div>
        </div>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroup-sizing-default">Max Tokens</span>
          </div>
          <input type="number" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" min="1" max="4096" value={props.maxTokens} onChange={e => props.setMaxTokens(e.target.value)} title="The maximum number of tokens to generate in the completion.
  
                  The token count of your prompt plus max_tokens cannot exceed the model's context length. Most models have a context length of 2048 tokens (except for the newest models, which support 4096)." />
          <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroup-sizing-default">{props.maxTokens}</span>
          </div>
        </div>
        <br />
        <h4>AI Image Model Settings</h4>
        <br />
        <form>
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroup-sizing-default">Image Resolution</span>
            </div>
            <select className="form-select" value={props.imageResolution} onChange={e => props.setImageResolution(e.target.value)}>
              <option value="1024x1024">1024x1024</option>
              <option value="512x512">512x512</option>
              <option value="256x256">256x256</option>
            </select>
            <br />
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={() => props.setShowSettingsModal(false)}>Save Changes</Button>
      </Modal.Footer>
    </Modal>);
  }

  export default ChatWindowSettings;