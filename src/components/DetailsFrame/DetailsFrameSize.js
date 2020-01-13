import React, {Component} from 'react';
import SizeInputRow from './SizeInputRow';

class DetailsFrameSize extends Component {
  render() {
    return (
      <table id="details-frame-size">
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
        </table>
    )
  }
}

export default DetailsFrameSize;