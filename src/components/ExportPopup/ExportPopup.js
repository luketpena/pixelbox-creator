import React from 'react';
import styled from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';

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

  display: grid;
  grid-template-areas: "code" "action";
  grid-template-rows: auto 48px;
  box-shadow: 0 0 64px 0 var(--color-shadow-main);
`;

const CodeBlock = styled.div`
  background-color: var(--color-bkg-main);
  width: 100%;
  height: 100%;
  grid-area: code;
  box-shadow: inset 0 2px 4px 0 var(--color-shadow-main);
  padding: 16px;
  box-sizing: border-box;
`;

const ActionBar = styled.div`
  grid-are: action;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const ActionButton = styled.button`
  margin-left: 8px;
`;

const Code = styled.p`
  color: var(--color-confirm);
  font-family: monospace;
  text-align: left;
  white-space: pre-wrap;
`;


export default function ExportPopup() {

  const dispatch = useDispatch();

  let exporter = useSelector(state=>state.exporter);

  function close() {
    dispatch({type: 'EXPORT_SET_ACTIVE', payload: false})
  }

  function copy(str) {
    const el = document.createElement('textarea');
    el.value = str;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  };
  

  return (
    <Container>
      <ExportWindow>
        <CodeBlock>
          <Code>
            {exporter.content}
          </Code>
        </CodeBlock>
        <ActionBar>
          <ActionButton onClick={()=>copy(exporter.content)}className="button-confirm">Copy to Clipboard</ActionButton>
          <ActionButton onClick={close}>Close</ActionButton>
        </ActionBar>
      </ExportWindow>
    </Container>
  )
}