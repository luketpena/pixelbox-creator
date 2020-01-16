import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

//-----< Styling >-----\\
const Container = styled.div`
  grid-area: header;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CreateButton = styled.button`
  height: 48px;
  padding: 0 32px;
  transition: all .2s;
  &:hover{
    padding: 0 48px;
  }
`;

export default function MainHeader() {

  const dispatch = useDispatch();

  function clickNew() {
    dispatch({type: 'MAKE_NEW_FRAME'});
  }

  return(
    <Container>
      <CreateButton className="button-confirm" onClick={clickNew}>New Frame</CreateButton>
    </Container>
  );
}