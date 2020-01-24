import React, {Component} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';

const Container = styled.div`

  grid-area: main;
  margin-right: 8px;
  font-family: var(--font-input);
  color: var(--color-text-darkest);
  table {
    width: 100%;
    select {
      width: 100%;
    }
    tr td:first-child {
      width: 96px;
      text-align: right;
      padding-right: 8px;
    }
  }
`;

const Slider = styled.input`
  grid-area: slider;
  width: 100%;
  -webkit-appearance: none;  /* Override default CSS styles */
  appearance: none;
  width: 100%; /* Full-width */
  height: 2px; /* Specified height */
  background-color: var(--color-bkg-main);
  outline: none; /* Remove outline */
  opacity: 0.7; /* Set transparency (for mouse-over effects on hover) */
  -webkit-transition: .2s; /* 0.2 seconds transition on hover */
  transition: opacity .2s;

  &::-webkit-slider-thumb {
    -webkit-appearance: none; /* Override default look */
    appearance: none;
    width: 8px; /* Set a specific slider handle width */
    height: 8px; /* Slider handle height */
    background: var(--color-bkg-main);
    cursor: pointer; /* Cursor on hover */
    box-shadow: 0 0 8px 4px var(--color-primary);
  }
  &::-moz-range-thumb {
    -webkit-appearance: none; /* Override default look */
    appearance: none;
    width: 8px; /* Set a specific slider handle width */
    height: 8px; /* Slider handle height */
    background: var(--color-bkg-main);
    cursor: pointer; /* Cursor on hover */
    box-shadow: 0 0 8px 4px var(--color-primary);
  }

  &::-ms-thumb {
    -webkit-appearance: none; /* Override default look */
    appearance: none;
    width: 8px; /* Set a specific slider handle width */
    height: 8px; /* Slider handle height */
    background: var(--color-bkg-main);
    cursor: pointer; /* Cursor on hover */
    box-shadow: 0 0 8px 4px var(--color-primary);
  }
`;

const SliderValue = styled.p`
  grid-area: value;
  font-family: var(--font-input);
  color: var(--color-primary);
  margin: 0;
  margin-right: 8px;
`;

const SliderData = styled.td`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-areas: "value slider";
  align-items: center;
`;


const Input = styled.input`
  width: 100%;
`;

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
      <Container>
        <table >
            <tbody>
              {/* -----< Layer Name Input >----- */}
              <tr>
                <td>Layer Name:</td>
                <td>
                  <Input 
                    value={this.state.layer_name} 
                    className="details-input"
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
                  <Input 
                    value={this.state.layer_url} 
                    className="details-input"
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
                <SliderData>
                  <SliderValue>{Number(this.state.layer_str).toFixed(2)}</SliderValue>
                  <Slider 
                    value={this.state.layer_str} 
                    onChange={(event)=>this.handleChange(event,'layer_str')}  
                    onMouseUp={()=>this.handleBlur('layer_str')}
                    onKeyPress={this.handleKeyPress}
                    type="range"
                    min="0"
                    max="1"
                    step=".05"
                  />
                </SliderData>
              </tr>
            </tbody>
          </table>
          <button onClick={this.clickClose}>Close</button>
        </Container>
    )
  }
}

export default connect(state=>({
  select: state.edit.select,
  layerData: state.edit.layerData[state.edit.select]
})) (DetailsLayerMain);