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

class App extends Component {
  render() {
    const text = 'Hi @all! #foo and #bar etc. @Kuba';
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
        {withTags(text, options)}
      </div>
    );
  }
}

export default App;
