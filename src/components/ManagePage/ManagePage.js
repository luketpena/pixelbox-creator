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

export default function ManagePage() {

  return (
    <ManageContainer>
      <ManageMain />
      <ManageSidebar />
    </ManageContainer>
  )
}