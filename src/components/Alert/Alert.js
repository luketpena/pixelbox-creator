import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

const Container = styled.div`
  z-index: 100;
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  backdrop-filter: blur(4px);
  background-color: rgba(0,0,0,.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AlertCard = styled.div`
  max-width: 90%;
  min-width: 256px;
  min-height: 128px;
  background-color: var(--color-bkg-main);
  border-radius: 4px;
  overflow: hidden;
  padding: 8px;

  display: grid;
  grid-template-areas: 
    "main" 
    "action";
  grid-template-rows: 1fr 32px;
`;

const AlertMain = styled.div`
  grid-area: main;
  padding: 24px;
`;

const AlertTitle = styled.p`
  color: var(--color-text-light);
  font-family: var(--font-header);
  font-size: 24px;
  margin: 0;
`;
const AlertMessage = styled.p`
  color: var(--color-text-mid);
  font-family: var(--font-main);
  margin: 0;
`;

const AlertAction = styled.div`
  grid-area: action;
  display: flex;
  justify-content: center;
`;

const ActionButton = styled.button`
  margin-left: 4px;
  padding: 0 16px;
`;

export default function Alert(props) {

  const alert = useSelector(state=>state.errors.appMessage);

  function renderConfirm() {
    if (alert.confirm && props.confirm) {
    return <ActionButton className="button-confirm" onClick={props.confirm}>{alert.confirm}</ActionButton>
    }
  }
  function renderReject() {
    if (alert.reject && props.reject) {
      return <ActionButton className="button-reject" onClick={props.reject}>{alert.reject}</ActionButton>
    }
  }
  function renderNeutral() {
    if (alert.neutral && props.neutral) {
      return <ActionButton onClick={props.neutral}>{alert.neutral}</ActionButton>
    }
  }

  return (
    <Container>
      <AlertCard>

        <AlertMain>
          <AlertTitle>{alert.title}</AlertTitle>
          <AlertMessage>{alert.message}</AlertMessage>
        </AlertMain>

        <AlertAction>
          {renderConfirm()}
          {renderNeutral()}
          {renderReject()}
        </AlertAction>

      </AlertCard>
    </Container>
  )
}