import React from 'react';
import styled from 'styled-components';

const Container = styled.span`
  position: relative;
  display: inline-flex;
  justify-content: center;

  &:hover {
    > .info {
      visibility: visible;
      opacity: 1;
      top: -2.3rem;
    }
  }
`;

const Text = styled.span`
  cursor: pointer;
  text-decoration: underline;
  font-style: italic;
`;

const Info = styled.span`
  position: absolute;
  overflow: hidden;
  white-space: nowrap;
  
  padding: 0.5rem;
  border-radius: 0.3rem;
  text-align: center;  
  font-size: 1rem;
  background: black;
  color: white;

  visibility: hidden;
  opacity: 0;
  top: -2.5rem;
  transition: all 0.3s ease-in-out;
`;

function User({ children }){
  return(
<Container>
      ✌️<Text>{children}</Text>
      <Info className="info">Peace and love {children}!</Info>
    </Container>
  );
}

export default User;