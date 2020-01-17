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
  grid-template-rows: auto 1fr;
  background-color: gray;
  height: 100vh;
  width: 256px;
  position: fixed;
  box-shadow: 0 0 16px 0 var(--color-shadow-main);
  overflow: hidden;
`;

export default function ManageSidebar() {

  return (
    <Sidebar>
      <SidebarUser />
      <SidebarLinks />
    </Sidebar>
  )
}