import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import useReactRouter from 'use-react-router';

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
  const {history} = useReactRouter();

  let [myReady, setMyReady] = useState(false)
  let ready = useSelector(state=>state.edit.ready);

  useEffect(()=>{
    if (ready && myReady) {
      setMyReady(false);
      dispatch({type: 'SET_EDIT_READY', payload: false})
      history.push('/edit');
    }
  },[dispatch,myReady,history,ready])

  function clickNew() {
    dispatch({type: 'MAKE_NEW_FRAME'});
    setMyReady(true);
  }

  return(
    <Container>
      <CreateButton className="button-confirm" onClick={clickNew}>New Frame</CreateButton>
    </Container>
  );
}