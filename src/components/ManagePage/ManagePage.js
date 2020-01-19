import React from 'react';
import styled from 'styled-components';

//-----< Component Imports >-----\\
import ManageMain from '../ManageMain/ManageMain';
import ManageSidebar from '../ManageSidebar/ManageSidebar';

//-----< Styling >-----\\
const ManageContainer = styled.div`
  display: grid;
  grid-template-areas: "sidebar main";
  grid-template-columns: 256px 1fr; 
`;
const ManageBkg = styled.div`
  min-height: 100vh;
  
  @keyframes scroll{
    100%{
      background-position:0px 160px;
    }
  }
`;

// background-color: var(--color-bkg-main);
//   background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 20 20'%3E%3Cg %3E%3Cpolygon fill='%231c2024' points='20 10 10 0 0 0 20 20'/%3E%3Cpolygon fill='%231c2024' points='0 10 0 20 10 20'/%3E%3C/g%3E%3C/svg%3E");
//   animation: scroll 5s infinite linear;


export default function ManagePage() {

  return (
    <ManageBkg>
      <ManageContainer>
        <ManageMain />
        <ManageSidebar />
      </ManageContainer>
    </ManageBkg>
  )
}