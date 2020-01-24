import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import avatars from '../avatars/avatars';

//-----< Styling >-----\\
const Container = styled.div`
  grid-area: user;
  background-color: var(--color-bkg-light);
  padding: 8px;
  button {
    display: block;
    margin: 8px auto;
    width: 150px;
  }
`;
const AvatarBorder = styled.div`
  margin: 16px auto;
  width: 128px;
  height: 128px;
  border-radius: 50%;
  border: 6px solid var(--color-primary);
  background-color: var(--color-primary-dark);
`;
const Avatar = styled.img`
  position: relative;
  width: 100%;
  height: 100%;
  bottom: 20%;
  image-rendering: pixelated;
  image-rendering: -moz-crisp-edges;
  image-rendering: -webkit-crisp-edges;
`;
const Username = styled.h2`
  font-family: var(--font-header);
  color: var(--color-text-light);
  margin: 0 ;
`;
const FrameNumber = styled.p`
  font-family: var(--font-main);
  color: var(--color-text-mid);
  margin: 0;
`;
const DetailsButton = styled.button`
  
`;

//-----< Component Function >-----\\
export default function ManageSidebar() {

  let [mount, setMount] = useState(false);

  const dispatch = useDispatch();

  useEffect(()=> {
    if (!mount) {
      setMount(true);
      dispatch({type: 'FETCH_USER_INFO'});
    }
    
  },[mount, dispatch])

  let user = useSelector(state=>state.user);
  let userInfo = useSelector(state=>state.info);
  let frame = useSelector(state=>state.frame);

  return (
    <Container>
      <AvatarBorder>
        <Avatar src={avatars.getAvatars()[userInfo.avatar]}/>
      </AvatarBorder>
      <Username>{user.username}</Username>
      <FrameNumber>{frame.length} {(frame.length===1)? 'frame' : 'frames'}</FrameNumber>
      <DetailsButton className="button-primary">Account Details</DetailsButton>
      <LogOutButton/>
    </Container>
  )
}