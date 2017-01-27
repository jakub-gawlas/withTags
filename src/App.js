// @flow

import React, { Component } from 'react';
import styled from 'styled-components';
import withTags from './withTags';

const Tag = styled.span`
  color: red;
`;

const User = styled.span`
  background: black;
  color: white;
`;

const Input = styled.input`
  box-sizing: border-box;
  width: 100%;
  font-size: 1.5rem;
  padding: 0.5rem;
`;

const Text = styled.p`
  font-size: 1.5rem;
  margin: 0.5rem;
  margin-top: 1rem;
`;

class App extends Component {

  state = {
    text: 'Hi @all! #foo and #bar etc. @Kuba'
  }

  _onChangeInput = (event: Event) => {
    const target = event.target;
    if(target instanceof HTMLInputElement){
      this.setState({
        text: target.value
      });
    }
  }

  render() {
    const { text } = this.state;
    const options = {
      tags: [
        {
          pattern: /#(\w+)/g,
          component: ([, value], index) => <Tag key={index}>{value}</Tag> 
        },
        {
          pattern: /@(\w+)/g,
          component: ([, value], index) => <User key={index}>{value}</User> 
        }
      ]
    };
    return (
      <div>
        <Input type="text" value={text} onChange={this._onChangeInput} />
        <Text>{withTags(text, options)}</Text>
      </div>
    );
  }
}

export default App;
