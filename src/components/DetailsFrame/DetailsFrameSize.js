import React from 'react';
import styled from 'styled-components';

//-----< Component Imports >-----\\
import SizeInputRow from './SizeInputRow';

//-----< Styling >-----\\
const Table = styled.table`
  grid-area: size;
  margin-right: 8px;
`;

//-----< Component Function >-----\\
export default function DetailsFrameSize() {
  //>> Render
  return (
    <Table>
      
        <thead>
          <tr>
            <th>&nbsp;</th>
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
  )
}