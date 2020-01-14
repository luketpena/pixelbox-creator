import React from 'react';
import {connect} from 'react-redux';

default export SizeInputRow extends Component {

  state = {
    width: this.props.frame[this.props.sizeType][0],
    height: this.props.frame[this.props.sizeType][1]
  }

  //Submits changes to state from inputs
  handleChange = (event, prop)=> {
    this.setState({[prop]: event.target.value});
    console.log('Attribute:',this.props.sizeType,'Value:',event.target.value,'Index:',prop);
  }

  //Submits changes to the reducer once an input leaves focus
  handleBlur = ()=> {
    console.log('INPUT RECEIVED!');
    switch(this.props.sizeType) {
      case 'size': this.props.dispatch({type: 'SET_FRAME_SIZE', payload: [Number(this.state.width),Number(this.state.height)]}); break;
      case 'extend': this.props.dispatch({type: 'SET_FRAME_EXTEND', payload: [Number(this.state.width),Number(this.state.height)]}); break;
      case 'display': this.props.dispatch({type: 'SET_FRAME_DISPLAY', payload: [Number(this.state.width),Number(this.state.height)]}); break;
      default: break;
    }
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

  render() {
    return (
      <tr>
        <td>{this.props.title}</td>
        {/* -----< Input Width Property >----- */}
        <td>
          <input 
            type="number" 
            className="input-with-unit" 
            value={this.state.width}
            onChange={(event)=>this.handleChange(event,'width')}
            onBlur={this.handleBlur}
            onKeyPress={this.handleKeyPress}
          />
          <span className="input-unit">px</span>
          </td>
        <td>X</td>
        {/* -----< Input Height Property >----- */}
        <td>
          <input 
            type="number" 
            className="input-with-unit" 
            value={this.state.height}
            onChange={(event)=>this.handleChange(event,'height')}
            onBlur={this.handleBlur}
            onKeyPress={this.handleKeyPress}
          />
          <span className="input-unit">px</span>
        </td>
      </tr>
    )
  }
}

export default connect(state=>({frame: state.edit}))(SizeInputRow);