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
  background-color: #22262b;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 1000'%3E%3Cg %3E%3Ccircle fill='%2322262b' cx='50' cy='0' r='50'/%3E%3Cg fill='%23252b33' %3E%3Ccircle cx='0' cy='50' r='50'/%3E%3Ccircle cx='100' cy='50' r='50'/%3E%3C/g%3E%3Ccircle fill='%2328313b' cx='50' cy='100' r='50'/%3E%3Cg fill='%232a3643' %3E%3Ccircle cx='0' cy='150' r='50'/%3E%3Ccircle cx='100' cy='150' r='50'/%3E%3C/g%3E%3Ccircle fill='%232c3c4b' cx='50' cy='200' r='50'/%3E%3Cg fill='%232e4253' %3E%3Ccircle cx='0' cy='250' r='50'/%3E%3Ccircle cx='100' cy='250' r='50'/%3E%3C/g%3E%3Ccircle fill='%2330485b' cx='50' cy='300' r='50'/%3E%3Cg fill='%23324e64' %3E%3Ccircle cx='0' cy='350' r='50'/%3E%3Ccircle cx='100' cy='350' r='50'/%3E%3C/g%3E%3Ccircle fill='%2333546d' cx='50' cy='400' r='50'/%3E%3Cg fill='%23335a75' %3E%3Ccircle cx='0' cy='450' r='50'/%3E%3Ccircle cx='100' cy='450' r='50'/%3E%3C/g%3E%3Ccircle fill='%2334607e' cx='50' cy='500' r='50'/%3E%3Cg fill='%23346787' %3E%3Ccircle cx='0' cy='550' r='50'/%3E%3Ccircle cx='100' cy='550' r='50'/%3E%3C/g%3E%3Ccircle fill='%23336d90' cx='50' cy='600' r='50'/%3E%3Cg fill='%23327499' %3E%3Ccircle cx='0' cy='650' r='50'/%3E%3Ccircle cx='100' cy='650' r='50'/%3E%3C/g%3E%3Ccircle fill='%23317aa2' cx='50' cy='700' r='50'/%3E%3Cg fill='%232e81ab' %3E%3Ccircle cx='0' cy='750' r='50'/%3E%3Ccircle cx='100' cy='750' r='50'/%3E%3C/g%3E%3Ccircle fill='%232b88b4' cx='50' cy='800' r='50'/%3E%3Cg fill='%23268fbd' %3E%3Ccircle cx='0' cy='850' r='50'/%3E%3Ccircle cx='100' cy='850' r='50'/%3E%3C/g%3E%3Ccircle fill='%231f96c7' cx='50' cy='900' r='50'/%3E%3Cg fill='%23159dd0' %3E%3Ccircle cx='0' cy='950' r='50'/%3E%3Ccircle cx='100' cy='950' r='50'/%3E%3C/g%3E%3Ccircle fill='%2300a4d9' cx='50' cy='1000' r='50'/%3E%3C/g%3E%3C/svg%3E");
  background-attachment: fixed;
  background-size: contain;
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
    <ManageBkg>
      <ManageContainer>
        <ManageMain />
        <ManageSidebar />
      </ManageContainer>
      {renderAlert()}
    </ManageBkg>
  )
}