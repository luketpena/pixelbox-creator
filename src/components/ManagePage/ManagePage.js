import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';

//-----< Component Imports >-----\\
import ManageMain from '../ManageMain/ManageMain';
import ManageSidebar from '../ManageSidebar/ManageSidebar';
import Alert from '../Alert/Alert';

//-----< Styling >-----\\
const ManageContainer = styled.div`
  display: grid;
  grid-template-areas: "sidebar main";
  grid-template-columns: 256px 1fr; 
  

`;
const ManageBkg = styled.div`
  min-height: 100vh;
  
`;

// background-color: var(--color-bkg-main);
//   background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 20 20'%3E%3Cg %3E%3Cpolygon fill='%231c2024' points='20 10 10 0 0 0 20 20'/%3E%3Cpolygon fill='%231c2024' points='0 10 0 20 10 20'/%3E%3C/g%3E%3C/svg%3E");
//   animation: scroll 5s infinite linear;


export default function ManagePage() {

  const dispatch = useDispatch();
  const [mount,setMount] = useState(false)
  let alert = useSelector(state=>state.errors.appMessage);

  useEffect(()=>{
    if (!mount) {
      setMount(true);
      dispatch({type: 'EXPORT_SET_ACTIVE', payload: false});
      dispatch({type: 'SET_APP_ALERT_ACTIVE', payload: false});
    }   
  },[mount,dispatch]);

  function renderAlert() {
    if (alert.active) {
      console.log('HELLO FROM RENDER ALERT');
      return <Alert />
    }
  }

  return (
    <ManageBkg className="bkg-scales">
      <ManageContainer>
        <ManageMain />
        <ManageSidebar />
      </ManageContainer>
      {renderAlert()}
    </ManageBkg>
  )
}