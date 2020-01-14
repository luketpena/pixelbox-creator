import React from 'react';
import styled from 'styled-components';

//-----< Component Imports >-----\\
import SidebarLinks from './SidebarLinks';
import SidebarUser from './SidebarUser';

//-----< Styling >-----\\
const Sidebar = styled.div`
  grid-area: sidebar;
  display: grid;
  grid-template-areas:
    "user"
    "links";
  grid-template-rows: 256px 1fr;
  background-color: gray;
  height: 100vh;
  width: 256px;
  position: fixed;
`;

export default function ManageSidebar() {

  return (
    <Sidebar>
      <SidebarUser />
      <SidebarLinks />
    </Sidebar>
  )
}