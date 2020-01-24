import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import styled from 'styled-components';

//-----< Component Imports >-----\\
import AvatarSelect from '../AvatarSelect/AvatarSelect';
import Alert from '../Alert/Alert';

const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
`;

const Content = styled.div`
  width: 100%;
  display: grid;
  grid-template-areas: "avatar account";
  justify-content: center;
`;

const Account = styled.div`
  min-width: 300px;
  grid-area: account;
  background-color: var(--color-bkg-light);
  border-radius: 16px;
  flex-wrap: wrap;
  justify-content: center;
  margin: 32px 16px;
  padding: 16px 16px;
  box-shadow: 0 32px 16px -2px var(--color-shadow-main);
  position: relative;

  h1, h2 {
    font-family: var(--font-header);
    margin: 0;
  }
  h1 {
    color: var(--color-text-light);
  }
  h2 {
    margin-top: 4px;
    color: var(--color-text-light-faded);
  }
  button {
    display: block;
    margin: 16px auto;
    width: 90%;
  }
  label {
    display: block;
    margin: 2px auto;
    font-family: var(--font-input);
    color: var(--color-text-light);
  }

  input {
    width: 100%;
  }

  .bottom-button {
    width: 90%;
    position: absolute;
    bottom: 0;
    left: 5%;
  }
`;

const InputRow = styled.div`

`;

export default function AccountDetails() {

  const userInfo = useSelector(state=>state.info);
  const user = useSelector(state=>state.user);
  const avatar = useSelector(state=>state.register.avatar);
  const alert = useSelector(state=>state.errors.appMessage);

  const history = useHistory();
  const dispatch = useDispatch();
  let [mount,setMount] = useState(false);
  let [mode,setMode] = useState('display');
  let [username,setUsername] = useState((user.username? user.username : ''));
  let [password,setPassword] = useState('');
  let [passwordCheck,setPasswordCheck] = useState('');
  const [alertActive, setAlertActive] = useState(false);

  

  useEffect(()=>{
    if (!mount) {
      setMount(true);
      dispatch({type: 'FETCH_USER_INFO'});
      dispatch({type: 'SET_APP_ALERT_ACTIVE', payload: false});
    }

    if (alert.active && alertActive) {
      switch(alert.response) {
        case 'neutral': alertCancel(); break;
      }
    }
  },[mount,dispatch,alert,user,userInfo,history,alertActive]);

  function renderAlert() {
    if (alert.active) {
      return <Alert />
    }
  }

  function alertCancel() {
    setAlertActive(false);
    dispatch({type: 'RESET_APP_ALERT'});
  }

  function renderAvatarSelect() {
    if (userInfo.avatar) {
      return <AvatarSelect avatarStart={userInfo.avatar}/>
    }
  }

  function goToControlPanel() {
    if (avatar) {
      dispatch({type: 'CHANGE_AVATAR', payload: avatar})
    }
    history.push('/manage')
  }

  function submitUsername(event) {
    event.preventDefault();
    dispatch({type: 'CHANGE_USERNAME', payload: {username}})
    setMode('display');
  }

  function submitPassword(event) {
    event.preventDefault();
    if (password.length>3) {
      if (password===passwordCheck) {
        dispatch({type: 'CHANGE_PASSWORD', payload: {password}})
        setPassword('');
        setPasswordCheck('');
        setMode('display');
      } else {
        setAlertActive(true);
        dispatch({
          type: 'SET_APP_ALERT',
          payload: {
            response: 'none',
            title: `Whoopsie`,
            message: 'The passwords you entered do not match.',
            neutral: 'My bad...',
          }
        })
      }
    } else {
      setAlertActive(true);
        dispatch({
          type: 'SET_APP_ALERT',
          payload: {
            response: 'none',
            title: `Whoopsie`,
            message: 'Your password has to be better than that.',
            neutral: 'Try again...',
          }
        })
    }
    
  }

  function renderAccountSettings() {
    switch(mode) {
      case 'display': return (
        <>
          
          <h2>{user.username}</h2>
          <button onClick={()=>setMode('password')}>Change Password</button>
          <button onClick={()=>setMode('username')}>Change Username</button>
          <button className="bottom-button button-primary" onClick={goToControlPanel}>Back to Control Panel</button>
        </>
      )
      case 'password': return (
        <>
          <h2>Change Password</h2>
          <form onSubmit={submitPassword}>
            <InputRow>
              <label>New Password:</label>
              <input value={password} onChange={(event)=>setPassword(event.target.value)} className="details-input" type="password"/>
            </InputRow>
            <InputRow>
              <label>Confirm Password:</label>
              <input value={passwordCheck} onChange={(event)=>setPasswordCheck(event.target.value)} className="details-input" type="password"/>
            </InputRow>
            <button className="button-confirm">Submit</button>
          </form>
          <button className="bottom-button button-primary" onClick={()=>setMode('display')}>Cancel</button>
        </>
      )
      case 'username': return (
        <>
          <h2>Change Username</h2>
          <form onSubmit={submitUsername}>
            <InputRow>
              <label>Username:</label>
              <input value={username} onChange={(event)=>setUsername(event.target.value)} className="details-input" type="text" />
            </InputRow>
            <button className="button-confirm">Submit</button>
          </form>
          <button className="bottom-button button-primary" onClick={()=>setMode('display')}>Cancel</button>
        </>
      )
    }
  }

  return (
    <Container className="bkg-scales">
      <Content>
        {renderAvatarSelect()}
        <Account>
          <h1>Settings</h1>
          {renderAccountSettings()}
        </Account>
      </Content>
      {renderAlert()}
    </Container>
  )
}