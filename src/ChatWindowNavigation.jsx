import React from "react";
import { Button, Container, Nav, Navbar, Badge } from 'react-bootstrap';

function ChatWindowNavigation(props) {
    return (<Navbar className="navigation" bg="dark" variant="dark" expand="lg" fixed="top">
      <Container fluid>
        <Navbar.Brand>OpenAI Chat</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Button className="menu-button" variant="secondary" size="sm" onClick={props.handleClearHistory}>Start a new conversation</Button>
          </Nav>
          <Nav className="mx-auto info-model">
            <Badge className="info-data" bg="secondary" text="white">Model: {props.model}</Badge>
          </Nav>
          <Nav className="ms-auto">
            <Badge className="info-data" bg="secondary" text="white">{props.totalConversationTokenUsage} Total Tokens Used / {props.maxTokens} Max Tokens</Badge>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>);
  }

export default ChatWindowNavigation;