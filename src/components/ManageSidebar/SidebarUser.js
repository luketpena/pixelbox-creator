import React from 'react';
import styled from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';

const avatarUrl = 'https://w5insight.com/wp-content/uploads/2014/07/placeholder-user-400x400.png';

//-----< Styling >-----\\
const Container = styled.div`
  grid-area: user;
  background-color: var(--color-bkg-light);
  padding: 8px;
`;
const Avatar = styled.img`
  margin-top: 16px;
  width: 128px;
  height: 128px;
  border-radius: 50%;
  border: 6px solid var(--color-primary);
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
  margin: 24px 0;
`;

//-----< Component Function >-----\\
export default function ManageSidebar() {

  let user = useSelector(state=>state.user);
  let frame = useSelector(state=>state.frame);

  return (
    <Container>
      <Avatar src={avatarUrl}/>
      <Username>{user.username}</Username>
      <FrameNumber>{frame.length} {(frame.length===1)? 'frame' : 'frames'}</FrameNumber>
      <DetailsButton className="button-primary">Account Details</DetailsButton>
    </Container>
  )
}