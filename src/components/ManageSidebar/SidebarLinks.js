import React from 'react';
import styled from 'styled-components';
const axios = require('axios');

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
`

async function download() {
  axios({
    url: '/api/download/jquery',
    method: 'GET',
    responseType: 'blob', // important
  }).then((response) => {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'pixelbox.js');
    document.body.appendChild(link);
    link.click();
  });
}

export default function ManageSidebar() {

  return (
    <Container>
      <LinkButton onClick={download} className="button-confirm" download>Download pixelbox.js</LinkButton>
      <LinkButton>Documentation</LinkButton>
      <HomeButton className="button-reject">Back to Home</HomeButton>
    </Container>
  )
}