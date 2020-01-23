import React, {useEffect} from 'react';
import styled from 'styled-components';
import {useSelector, useDispatch} from 'react-redux';

//-----< Component Imports >-----\\
import MainHeader from './MainHeader';
import MainGallery from './MainGallery';
import ExportPopup from '../ExportPopup/ExportPopup';

//-----< Styling >-----\\
const Main = styled.div`
  grid-area: main;
  display: grid;
  grid-template-areas:
    "header"
    "gallery";
  grid-template-rows: 128px 1fr;
`;

export default function ManageMain() {

  const dispatch = useDispatch();
  const user = useSelector(state=>state.user);
  const exporter = useSelector(state=>state.exporter);

  useEffect(()=>{
    dispatch({type: 'GET_USER_FRAMES', payload: user.id})
  });

  function renderExport() {
    if (exporter.active) {
      return <ExportPopup />
    }
  }

  return (
    <Main>
      <MainHeader />
      <MainGallery />
      {renderExport()}
    </Main>
  )
}