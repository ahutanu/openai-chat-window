import React, { useState, useEffect, useRef } from "react";
import { Configuration, OpenAIApi } from "openai";
import { Button } from 'react-bootstrap';
import hljs from 'highlight.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faGear, faImage } from '@fortawesome/free-solid-svg-icons';
import { TypeAnimation } from 'react-type-animation';
import ChatWindowSettings from "./ChatWindowSettings";
import ChatWindowNavigation from "./ChatWindowNavigation";

const ChatWindow = () => {
  const [message, setMessage] = useState("");
  const [temperature, setTemperature] = useState(0.7);
  const [apiKey, setApiKey] = useState('');
  const [model, setModel] = useState("text-davinci-003");
  const [models, setModels] = useState([]);
  const [maxTokens, setMaxTokens] = useState(1536);
  const [loading, setLoading] = useState(false);
  const [conversation, setConversation] = useState([]);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const chatContainerRef = useRef(null);
  const [imageResolution, setImageResolution] = useState("512x512");
  const [images, setImages] = useState([]);
  const [frequencyPenalty, setFrequencyPenalty] = useState(0);
  const [presencePenalty, setPresencePenalty] = useState(0);
  const [topP, setTopP] = useState(0.9);
  const [initialPrompt, setInitialPrompt] = useState("The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly. The AI provides help with anything, including questions about code, as the AI is an expert in everything including in all the major programming languages and is great at pair programming and debugging. Whenever the AI provided a code snippet, it was always enclosed between three backqoutes. The AI knew its limitations though, and it was not afraid to say \"I don't know.\" whenever he was not certain about an answer. \nUser: Hello, how are you?\nAI: I am an AI created by OpenAI. How can I help you today?\nUser:");
  const [initialPromptEnabled, setInitialPromptEnabled] = useState(true);
  const [totalConversationTokenUsage, setTotalConversationTokenUsage] = useState(0);
  const [totalPromptTokenUsage, setTotalPromptTokenUsage] = useState(0);

  const configuration = new Configuration({
    apiKey: apiKey,
  });

  const openai = new OpenAIApi(configuration);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let previousMessages = conversation.map(chat => chat.author + ':' + chat.message).join("\n");
    //if beginning of conversation, set background story to train AI responses if enabled
    if (conversation.length === 0 && initialPromptEnabled) {
      previousMessages = initialPrompt;
    }
    setConversation([...conversation, { message: message, author: "User", timestamp: new Date() }]);
    const prompt = previousMessages + "\n" + message;
    openai.createCompletion({
      model: model,
      prompt: prompt,
      temperature: parseFloat(temperature),
      top_p: parseFloat(topP),
      max_tokens: maxTokens,
      frequency_penalty: parseFloat(frequencyPenalty),
      presence_penalty: parseFloat(presencePenalty)
    })
      .then(response => {
        if (response && response.data.choices && response.data.choices.length > 0) {
          setConversation(
            [
              ...conversation,
              { message: (conversation.length === 0 && initialPromptEnabled) ? prompt : message, author: "User", timestamp: new Date(), prompt_tokens: (response.data.usage.prompt_tokens - totalPromptTokenUsage) },
              { message: response.data.choices[0].text.trim().replace(/(^AI:)/gi, ""), author: "AI", timestamp: new Date(), completion_tokens: response.data.usage.completion_tokens }
            ]
          );
        } else {
          console.log('No response from API.');
        }
        setLoading(false);
        setTotalPromptTokenUsage(response.data.usage.prompt_tokens);
        setTotalConversationTokenUsage(response.data.usage.total_tokens);
      })
      .catch(error => console.log(error));
    setMessage("");
  }

  const handleClearHistory = () => {
    setConversation([]);
  }

  const handleRequestImage = async (e) => {
    e.preventDefault();
    setLoading(true);
    openai.createImage({
      prompt: message,
      model: "image-alpha-001",
      size: imageResolution,
      n: 1
    })
      .then(response => {
        if (response && response.data.data && response.data.data.length > 0) {
          const imageUrl = response.data.data[0].url;
          setImages(
            [
              ...images,
              { message: message, author: "User", timestamp: new Date() },
              { message: imageUrl, author: "DALL-E", timestamp: new Date() }
            ]
          );
        } else {
          console.log('No response from API.');
        }
        setLoading(false);
      })
      .catch(error => console.log(error));
  }

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [conversation]);

  useEffect(() => {
    openai.listModels().then(response => {
      let modelsList = [];
      if (response.data.data && response.data.data.length > 0) {
        response.data.data.map((model, index) => {
          modelsList.push(model.id);
        })
      }
      setModels(modelsList);
    }).catch(error => console.log(error));
  }, []);

  return (
    <div className="d-flex flex-column h-100">
      <div className="flex-grow-1 overflow-auto">
        <ChatWindowNavigation model={model} maxTokens={maxTokens} totalConversationTokenUsage={totalConversationTokenUsage} handleClearHistory={handleClearHistory}></ChatWindowNavigation>
        <div className="container-fluid row chat-window">
          <div ref={chatContainerRef} className="message-list">
            <ul>
              {conversation.concat(images).map((chat, index) => (
                <div>
                  <li key={index} className={`chat-bubble ${chat.author.toLowerCase()}`}>
                    <div style={{ whiteSpace: "pre-wrap" }}>
                      <strong>{chat.author}:</strong>
                      {chat.author === 'DALL-E' &&
                        <img src={chat.message} alt="Generated by DALL-E" />
                      }
                      {chat.author === 'AI' &&
                        <div dangerouslySetInnerHTML={{
                          __html: chat.message.replace(/```(.+?)```/gs, (match, code) => {
                            return hljs.highlightAuto(code).value;
                          })
                        }}></div>
                      }
                      {chat.author !== 'AI' && chat.author !== 'DALL-E' && <div>{chat.message}</div>}
                    </div>
                  </li>
                  <div className={`timestamp ${chat.author.toLowerCase()}`}>
                    <p>
                      {chat.author === 'AI' && <em>Completions Token Usage: {chat.completion_tokens}. Received at </em>}
                      {chat.author === 'User' && <em>Prompt Token Usage: {chat.prompt_tokens}. Sent at </em>}
                      <em>{chat.timestamp.toLocaleString()}.</em>
                    </p>
                  </div>
                </div>
              ))}
              {loading && <div>
                <li key={conversation.length - 1} className='chat-bubble ai'>
                  <TypeAnimation
                    sequence={['AI is typing...', 1000, '']}
                    speed={75}
                    deletionSpeed={75}
                    wrapper="div"
                    repeat={Infinity}
                  />
                </li>
              </div>}
            </ul>
          </div>
          <div className="form-container d-flex w-100" resize="vertical">
            <form className="form-inline w-100 message-input" onSubmit={handleSubmit}>
              <textarea
                type="text"
                className="form-control w-100"
                placeholder="Type a message"
                aria-describedby="button-addon2"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <Button
                className="btn btn-outline-secondary"
                type="button"
                id="button-addon3"
                variant="secondary"
                title="Settings"
                onClick={() => setShowSettingsModal(true)}
              ><FontAwesomeIcon icon={faGear} size="1x" /></Button>
              <Button
                className="btn btn-outline-secondary"
                type="button" id="button-addon4"
                variant="secondary"
                title="Request Image"
                onClick={handleRequestImage}
              ><FontAwesomeIcon icon={faImage} size="1x" /></Button>
              <Button
                className="btn btn-outline-secondary"
                id="button-addon2"
                variant="primary"
                type="submit"
                title="Send message"
              ><FontAwesomeIcon icon={faPaperPlane} size="1x" /></Button>
            </form>
          </div>
          <ChatWindowSettings
            temperature={temperature}
            setTemperature={setTemperature}
            apiKey={apiKey}
            setApiKey={setApiKey}
            model={model}
            setModel={setModel}
            maxTokens={maxTokens}
            setMaxTokens={setMaxTokens}
            showSettingsModal={showSettingsModal}
            setShowSettingsModal={setShowSettingsModal}
            imageResolution={imageResolution}
            setImageResolution={setImageResolution}
            frequencyPenalty={frequencyPenalty}
            setFrequencyPenalty={setFrequencyPenalty}
            presencePenalty={presencePenalty}
            setPresencePenalty={setPresencePenalty}
            topP={topP}
            setTopP={setTopP}
            initialPrompt={initialPrompt}
            setInitialPrompt={setInitialPrompt}
            initialPromptEnabled={initialPromptEnabled}
            setInitialPromptEnabled={setInitialPromptEnabled}
            models={models}
          ></ChatWindowSettings>
        </div>
      </div>
    </div>
  );
}

export default ChatWindow;