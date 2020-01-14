import React from 'react';
import styled from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';

const avatarUrl = 'https://w5insight.com/wp-content/uploads/2014/07/placeholder-user-400x400.png';

//-----< Styling >-----\\
const Container = styled.div`
  grid-area: user;
  background-color: white;
  padding: 8px;
`;
const Avatar = styled.img`
  width: 128px;
  height: 128px;
  border-radius: 50%;
`;
const Username = styled.h2`
  margin: 0 ;
`;
const FrameNumber = styled.p`
  margin: 0;
`;
const DetailsButton = styled.button`
  margin-top: 32px;
`;

//-----< Component Function >-----\\
export default function ManageSidebar() {

  let user = useSelector(state=>state.user);

  return (
    <Container>
      {JSON.stringify(user)}
      <Avatar src={avatarUrl}/>
      <Username>{user.username}</Username>
      <FrameNumber># of frames</FrameNumber>
      <DetailsButton>Account Details</DetailsButton>
    </Container>
  )
}