import React from 'react';
import styled from 'styled-components';

//-----< Component Imports >-----\\
import SizeInputRow from './SizeInputRow';

//-----< Styling >-----\\
const Container = styled.div`
margin: 0 auto;
`;
const Table = styled.table`
  grid-area: size;
  margin-right: 8px;
  border-collapse: collapse;
  table-layout: fixed;
  thead {
    font-family: var(--font-input);
    color: var(--color-text-darkest);
  }
`;

const TitleColumn = styled.th`
  width: 80px;
`;

//-----< Component Function >-----\\
export default function DetailsFrameSize() {
  //>> Render
  return (
    <Container>
      <Table>
      
        <thead>
          <tr>
            <TitleColumn>&nbsp;</TitleColumn>
            <th>Width</th>
            <th>&nbsp;</th>
            <th>Height</th>
          </tr>
        </thead>

        <tbody>
          <SizeInputRow title="Size" sizeType="size"/>
          <SizeInputRow title="Extend" sizeType="extend"/>
          <SizeInputRow title="Display" sizeType="display"/>
        </tbody>

      </Table>
    </Container>
  )
}