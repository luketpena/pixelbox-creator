import React, {Component} from 'react';
import {connect} from 'react-redux';
import SizeInputRow from '../SizeInputRow/SizeInputRow';

class DetailsFrame extends Component {
  render() {
    return (
      <div id="details-frame" className="details-widget">
        
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
        <div id="details-frame-main">
          <input type="text" placeholder="Background URL"/>
          <div id="details-frame-smoothing">
            <label>
              <input type="checkbox"/>
              <span>Smoothing</span>
            </label>
            <table>
              <tbody>
                <tr>
                  <td>Framerate:</td>
                  <td><input type="number" className="input-with-unit"/><span className="input-unit">fps</span></td>
                </tr>
                <tr>
                  <td>Rate:</td>
                  <td><input type="number" className="input-with-unit"/></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(state=>({frame: state.edit}))(DetailsFrame);