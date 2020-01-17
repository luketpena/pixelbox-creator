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
  
`;

export default function ManagePage() {

  return (
    <ManageBkg className="scroll-bkg">
      <ManageContainer>
        <ManageMain />
        <ManageSidebar />
      </ManageContainer>
    </ManageBkg>
  )
}