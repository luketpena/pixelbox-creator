import React, {Component} from 'react';
import {connect} from 'react-redux';
import SizeInputRow from '../SizeInputRow/SizeInputRow';

class DetailsFrame extends Component {

  state = {
    bkg_url: this.props.frame.bkg_url,
    framerate: this.props.frame.framerate,
    smoothing: this.props.frame.smoothing,
    pixelsnap: this.props.frame.pixelsnap
  }

  handleChange = (event,prop)=> {
    this.setState({[prop]: event.target.value})
  }

  handleBlur = (prop)=> {
    switch(prop) {
      case 'bkg_url': this.props.dispatch({type: 'SET_FRAME_BKG', payload: this.state.bkg_url}); break;
      case 'framerate': this.props.dispatch({type: 'SET_FRAME_FRAMERATE', payload: Number(this.state.framerate) }); break;
      case 'smoothing': this.props.dispatch({type: 'SET_FRAME_SMOOTHING', payload: Number(this.state.smoothing) }); break;
      default: break;
    }  
  }

  togglePixelsnap = ()=> {
    this.setState({
      pixelsnap: !this.state.pixelsnap
    })
    this.props.dispatch({type: 'SET_FRAME_PIXELSNAP', payload: !this.state.pixelsnap });
  }

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
          <label>
            Background url: 
            <input 
              id="in-background-url" 
              type="text" 
              value={this.state.bkg_url}
              onChange={(event)=>this.handleChange(event,'bkg_url')}
              onBlur={()=>this.handleBlur('bkg_url')}
            />
          </label>
          <div id="details-frame-smoothing">
            <table>
              <tbody>
                <tr>
                  <td>Framerate:</td>
                  <td>
                    <input 
                      type="number" 
                      className="input-with-unit"
                      value={this.state.framerate}
                      onChange={(event)=>this.handleChange(event,'framerate')}
                      onBlur={()=>this.handleBlur('framerate')}
                    />
                    <span className="input-unit">fps</span>
                    </td>
                </tr>
                <tr>
                  <td>Smoothing:</td>
                  <td>
                    <input 
                      type="number" 
                      className="input-with-unit"
                      value={this.state.smoothing}
                      onChange={(event)=>this.handleChange(event,'smoothing')}
                      onBlur={()=>this.handleBlur('smoothing')}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Pixelsnap:</td>
                  <td>
                    <input 
                      type="checkbox"
                      checked={this.state.pixelsnap}
                      onChange={this.togglePixelsnap}
                    />
                  </td>
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