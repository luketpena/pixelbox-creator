import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import styled from 'styled-components';

import AvatarSelect from '../AvatarSelect/AvatarSelect';
import LoginErrorBar from './LoginErrorBar';
import LoginInput from './LoginInput';

const InputBox = styled.div`
  background-color: var(--color-bkg-light);
  position: relative;
  overflow: hidden;
  grid-area: main;
  width: 100%;
  max-width: 512px;
  margin: 0 auto;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 32px 16px -2px var(--color-shadow-main);
`;

const Container = styled.div`
  background-color: var(--color-bkg-main);
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 20 20'%3E%3Cg %3E%3Cpolygon fill='%231c2024' points='20 10 10 0 0 0 20 20'/%3E%3Cpolygon fill='%231c2024' points='0 10 0 20 10 20'/%3E%3C/g%3E%3C/svg%3E");

  
  width: 100vw;
  height: 100vh;
  padding: 64px;
  /* animation: scroll 5s infinite linear; */
  box-sizing: border-box;
  @keyframes scroll{
  100%{
    background-position:0px 160px;
  }
`;

const Box = styled.div`
  display: grid;
  width: 80%;
  margin: 0 auto;
  grid-template-areas: ${props=>(props.loginMode==='login'? '"main"' : '"avatar main"')};
  grid-template-columns: ${props=>(props.loginMode==='login'? '1fr' : '256px 1fr')};
`;

const SwitchButton = styled.button`
  width: 128px;
  margin-top: 64px;
`;

export default function RegisterPage() {

  const dispatch = useDispatch();
  let errors = useSelector(state=>state.errors);
  let loginMode = useSelector(state=>state.loginMode);
  

  

  function renderAvatarSelect() {
    if (loginMode==='register') {
      return <AvatarSelect />
    }
  }

  function renderSwitchButton() {
    if (loginMode==='login') {
      return <SwitchButton
      type="button"
      className="link-button"
      onClick={() => {
        dispatch({type: 'SET_TO_REGISTER_MODE'});
        dispatch({type: 'CLEAR_LOGIN_ERROR'});
      }}
    >
      Register
    </SwitchButton>
    } else {
      return <SwitchButton
      type="button"
      className="link-button"
      onClick={() => {
        dispatch({type: 'SET_TO_LOGIN_MODE'})
        dispatch({type: 'CLEAR_REGISTRATION_ERROR'})
      }}
    >
      Login
    </SwitchButton>
    }
  }

  function renderErrorBar() {
    if (errors.registrationMessage || errors.loginMessage) {
      return <LoginErrorBar />
    }
  }

  return (
    <Container>
      
      <Box loginMode={loginMode}>
        {renderAvatarSelect()}

        <InputBox>
          {renderErrorBar()}

          <h1 className="logReg-title">{loginMode}</h1>
          <LoginInput />
            
          {renderSwitchButton()}
        </InputBox>
      </Box>
    </Container>
  );
}
