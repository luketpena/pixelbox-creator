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
const DownloadButton = styled.a`
  box-sizing: border-box;
  border-radius: 4px;
  border: none;
  box-shadow: 0 2px 4px -2px var(--color-shadow-main);
  transition: all .2s;
  outline: none;
  font-family: var(--font-button);
  font-size: 16px;
  font-weight: lighter;
  border: 1px solid var(--color-confirm-dark);
  width: 100%;
  display: block;
  margin-bottom: 8px;
  padding: 4px;
  &:hover {
    cursor: pointer;
    background-color: var(--color-text-light);
    color: var(--color-text-dark);
    box-shadow: 0 6px 8px -4px var(--color-shadow-main);
  }
`;
const HomeButton = styled.button`
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 8px;
`;

const fs = require('fs');
const Path = require('path');
const axios = require('axios');

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