
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
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroup-sizing-default">API Key</span>
          </div>
          <input type="text" className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" value={props.apiKey} onChange={e => props.setApiKey(e.target.value)} />
        </div>
        <em>You can get an API key from <a href="https://beta.openai.com/account/api-keys">here</a>.</em>
        <br /><br />
        <h4>AI Text Model Settings</h4>
        <br />
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroup-sizing-default">AI Model</span>
          </div>
          <select className="form-select" value={props.model} onChange={e => props.setModel(e.target.value)}>
            {props.models.map((model, index) => (
              <option key={index} value={model}>{model}</option>
            ))}
          </select>
          <br />
        </div>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroup-sizing-default">Temperature</span>
          </div>
          <input type="range" className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" min="0" max="1" step="0.1" value={props.temperature} onChange={e => props.setTemperature(e.target.value)} title="What sampling temperature to use. Higher values means the model will take more risks. Try 0.9 for more creative applications, and 0 (argmax sampling) for ones with a well-defined answer." />
          <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroup-sizing-default">{props.temperature}</span>
          </div>
        </div>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroup-sizing-default">Top P</span>
          </div>
          <input type="range" className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" min="0.1" max="1.0" step="0.1" value={props.topP} onChange={e => props.setTopP(e.target.value)} title="An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered." />
          <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroup-sizing-default">{props.topP}</span>
          </div>
        </div>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroup-sizing-default">Frequence Penalty</span>
          </div>
          <input type="range" className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" min="-2.0" max="2.0" step="0.1" value={props.frequencyPenalty} onChange={e => props.setFrequencyPenalty(e.target.value)} title="Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim." />
          <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroup-sizing-default">{props.frequencyPenalty}</span>
          </div>
        </div>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroup-sizing-default">Presence Penalty</span>
          </div>
          <input type="range" className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" min="-2.0" max="2.0" step="0.1" value={props.presencePenalty} onChange={e => props.setPresencePenalty(e.target.value)} title="Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics." />
          <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroup-sizing-default">{props.presencePenalty}</span>
          </div>
        </div>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroup-sizing-default">Max Tokens</span>
          </div>
          <input type="number" className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" min="1" max="4096" value={props.maxTokens} onChange={e => props.setMaxTokens(e.target.value)} title="The maximum number of tokens to generate in the completion.
  
                  The token count of your prompt plus max_tokens cannot exceed the model's context length. Most models have a context length of 2048 tokens (except for the newest models, which support 4096)." />
          <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroup-sizing-default">{props.maxTokens}</span>
          </div>
        </div>
        <div  className="input-group mb-3">
          <div className="input-group-prepend">
            <div className="input-group-text initial-prompt-text-inputs">
              <input type="checkbox" aria-label="Checkbox for following text input" defaultChecked={props.initialPromptEnabled} onChange={e => props.setInitialPromptEnabled(!props.initialPromptEnabled)} />
            </div>
          </div>
          <textarea type="text" className="form-control" aria-label="Text input with checkbox" value={props.initialPrompt} onChange={e => props.setInitialPrompt(e.target.value)} disabled={!props.initialPromptEnabled}/>
          <div className="input-group-prepend">
            <span className="input-group-text initial-prompt-text-inputs" id="inputGroup-sizing-default">Initial <br /> Prompt <br /> {props.initialPromptEnabled ? ' Enabled' : ' Disabled'}</span>
          </div>
        </div>
        <br />
        <h4>AI Image Model Settings</h4>
        <br />
        <form>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroup-sizing-default">Image Resolution</span>
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