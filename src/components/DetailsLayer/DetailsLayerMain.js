import React, {Component} from 'react';
import {connect} from 'react-redux';

//A list of all available blendmodes
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

class DetailsLayerMain extends Component {

  state = {
    layer_name: this.props.layerData.layer_name,
    layer_url: this.props.layerData.layer_url,
    layer_str: this.props.layerData.layer_str,
    blendmode: this.props.layerData.blendmode,
  }

  handleChange = (event,prop)=> {
    this.setState({[prop]: event.target.value})
  }

  handleBlur = (prop)=> {
    this.triggerChange(prop);
  }

  //Dispatches the value of a prop to the reducer
  triggerChange = (prop)=> {
    const myPayload = {
      index: this.props.select,
      prop: prop,
      value: this.state[prop]
    }
    this.props.dispatch({type: 'SET_LAYER_PROP', payload: myPayload});
  }

  //Uses the event value to both dispatch to the reducer AND update the state
  triggerChangeEvent = (event,prop)=> {
    this.setState({[prop]: event.target.value});
    this.props.dispatch({
      type: 'SET_LAYER_PROP', 
      payload: {
        index: this.props.select,
        prop: prop,
        value: event.target.value
      }
    });
  }

  //Used for making inputs responsive to keystrokes
  handleKeyPress = (event)=> {
    switch(event.key) {
      case 'Enter': 
        document.activeElement.blur();
        break;
      default: break;
    }
  }

  clickClose = ()=> {
    this.props.dispatch({type: 'SET_LAYER_SELECT', payload: -1})
  }

  render() {
    return (
      <div id="details-layer-main">
        <table >
            <tbody>
              {/* -----< Layer Name Input >----- */}
              <tr>
                <td>Layer Name:</td>
                <td>
                  <input 
                    value={this.state.layer_name} 
                    onChange={(event)=>this.handleChange(event,'layer_name')}  
                    onBlur={()=>this.handleBlur('layer_name')}
                    onKeyPress={this.handleKeyPress}
                    type="text"
                  />
                </td>
              </tr>
              {/* -----< Layer URL Input >----- */}
              <tr>
                <td>Image url:</td>
                <td>
                  <input 
                    value={this.state.layer_url} 
                    onChange={(event)=>this.handleChange(event,'layer_url')} 
                    onBlur={()=>this.handleBlur('layer_url')}
                    onKeyPress={this.handleKeyPress}
                    type="text"
                  />
                </td>
              </tr>
              {/* -----< Blendmode Select >----- */}
              <tr>
                <td>Blendmode:</td>
                <td>
                  <select 
                    value={this.state.blendmode} 
                    onChange={(event)=>this.triggerChangeEvent(event,'blendmode')}
                  >
                    {blendmodes.map( (item,i)=>{
                      return <option key={i} value={item}>{item}</option>
                    })}
                  </select>
                </td>
              </tr>
              {/* -----< Strength Input >----- */}
              <tr>
                <td>Strength:</td>
                <td>
                  <input 
                    value={this.state.layer_str} 
                    onChange={(event)=>this.handleChange(event,'layer_str')}  
                    onBlur={()=>this.handleBlur('layer_str')}
                    onKeyPress={this.handleKeyPress}
                    type="number"
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <button onClick={this.clickClose}>Close</button>
        </div>
    )
  }
}

export default connect(state=>({
  select: state.edit.select,
  layerData: state.edit.layerData[state.edit.select]
})) (DetailsLayerMain);