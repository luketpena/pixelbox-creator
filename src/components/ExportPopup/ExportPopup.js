import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: absolute;
  background-color: rgba(0,0,0,.5);
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ExportWindow = styled.div`
  background-color: var(--color-bkg-light);
  max-width: 800px;
  width: 100%;
  max-height: 500px;
  height: 100%;
  border-radius: 16px;
  padding: 16px;
`;

const CodeBlock = styled.div`
  background-color: var(--color-bkg-main);
  width: 100%;
  height: 100%;
`;

export default function ExportPopup() {
  return (
    <Container>
      <ExportWindow>
        <CodeBlock>

        </CodeBlock>
      </ExportWindow>
    </Container>
  )
}