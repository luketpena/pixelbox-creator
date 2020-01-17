import React from 'react';
import styled from 'styled-components';

//-----< Styling >-----\\
const Container = styled.div`
  grid-area: links;
  background-color: var(--color-bkg-main);
  position: relative;
  padding-top: 8px;
  padding-top: 32px;
`;
const LinkButton = styled.button`
  width: 100%;
  margin-bottom: 8px;
`;
const HomeButton = styled.button`
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 8px;
`;

export default function ManageSidebar() {

  return (
    <Container>
      <LinkButton className="button-confirm">Download pixelbox.js</LinkButton>
      <LinkButton>Documentation</LinkButton>
      <HomeButton className="button-reject">Back to Home</HomeButton>
    </Container>
  )
}