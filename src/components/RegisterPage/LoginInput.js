import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';

const Label = styled.label`
  display: block;
  color: var(--color-text-light);
  margin-bottom: 8px;
  font-family: var(--font-input);
  input {
    display: block;
    margin: 4px auto;
    width: 128px;
    border: none;
    outline: none;
    border-radius: 4px;
    text-align: center;
  }
`;

const Container = styled.div`
  border: 2px dashed var(--color-confirm-dark);
  max-width: 256px;
  padding: 16px;
  margin: 0 auto;
`;

const Submit = styled.button`
  width: 128px;
`;

export default function LoginInput() {

  const dispatch = useDispatch();
  let loginMode = useSelector(state=>state.loginMode);
  let avatar = useSelector(state=>state.register.avatar)

  function registerUser(event) {
    event.preventDefault();

    if (username && password && avatar) {
      dispatch({
        type: 'REGISTER',
        payload: {
          username: username,
          password: password,
          avatar: avatar
        },
      });
    } else {
      if (!avatar) {
        dispatch({type: 'REGISTRATION_AVATAR_ERROR'});
      } else {
        dispatch({type: 'REGISTRATION_INPUT_ERROR'});
      }
      
    }
  } // end registerUser

  function login(event) {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  } // end login

  let [username, setUsername] = useState('');
  let [password, setPassword] = useState('');

  function handleSubmit(event) {
    switch(loginMode) {
      case 'login': login(event); break;
      case 'register': registerUser(event); break;
    }
  }

  

  return (
    <Container>
      <form onSubmit={(event)=>handleSubmit(event)}>  

          <Label htmlFor="username">
            Username:
            <input
              type="text"
              name="username"
              value={username}
              onChange={(event)=>setUsername(event.target.value)}
            />
          </Label>

          <Label htmlFor="password">
            Password:
            <input
              type="password"
              name="password"
              value={password}
              onChange={(event)=>setPassword(event.target.value)}
            />
          </Label>

          <Submit className="button-confirm">Submit</Submit>
          
      </form>
    </Container>
  )
}