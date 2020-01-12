import React, {Component} from 'react';
import {connect} from 'react-redux';

const blendmodes = [
  'normal',
  'multiply',
  'screen',
  'overlay',
  'darken',
  'lighten',
  'color-dodge',
  'color-burn',
  'difference',
  'exclusion',
  'hue',
  'saturation',
  'color',
  'luminosity',
]

const filters = [
  {name: 'none', unit: '', default: ''},
  {name: 'blur', unit: 'px', default: 0},
  {name: 'brightness', unit: '%', default: 100},
  {name: 'contrast', unit: '%', default: 100},
  {name: 'grayscale', unit: '%', default: 0}
]

class DetailsLayer extends Component {

  state = {
    layer_name: this.props.layerData[this.props.select].layer_name,
    layer_url: this.props.layerData[this.props.select].layer_url,
    layer_str: this.props.layerData[this.props.select].layer_str,
    blendmode: this.props.layerData[this.props.select].blendmode
  }

  handleChange = (event,prop)=> {
    this.setState({[prop]: event.target.value})
  }

  handleBlur = ()=> {
    this.triggerChange();
  }

  handleReducerChange = (event,prop)=> {
    this.setState({[prop]: event.target.value})
    const myPayload = {
      index: this.props.select,
      prop: prop,
      value: event.target.value
    }
    this.props.dispatch({type: 'SET_LAYER_DATA_PROP', payload: myPayload});
  }

  triggerChange = ()=> {
    const myPayload = {
      index: this.props.select,
      value: this.state
    }
    this.props.dispatch({type: 'SET_LAYER_DATA', payload: myPayload});
  }

  render() {
    

    return (
      <div id="details-layer" className="details-widget">
        <button>Close</button>
        <table id="details-layer-main">
          <tbody>
            <tr>
              <td>Layer Name:</td>
              <td>
                <input 
                  value={this.state.layer_name} 
                  onChange={(event)=>this.handleChange(event,'layer_name')}  
                  onBlur={this.handleBlur}
                  type="text"
                />
              </td>
            </tr>
            <tr>
              <td>Image url:</td>
              <td>
                <input 
                  value={this.state.layer_url} 
                  onChange={(event)=>this.handleChange(event,'layer_url')} 
                  onBlur={this.handleBlur}
                  type="text"
                />
              </td>
            </tr>
            <tr>
              <td>Blendmode:</td>
              <td>
                <select value={this.state.blendmode} onChange={(event)=>this.handleReducerChange(event,'blendmode')}>
                  {blendmodes.map( (item,i)=>{
                    return <option key={i}>{item}</option>
                  })}
                </select>
              </td>
            </tr>
            <tr>
              <td>Strength:</td>
              <td><input type="number"/></td>
            </tr>
          </tbody>
        </table>
        <div id="details-layer-filters">
          <label>Filters</label>
          <table id="details-layer-filters-table">
            <tbody>
              <tr>
                <td>&nbsp;</td>
                <td><button>Add Filter</button></td>
                <td>&nbsp;</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default connect(state=>({
  layerData: state.edit.layerData,
  select: state.edit.select
}))(DetailsLayer);