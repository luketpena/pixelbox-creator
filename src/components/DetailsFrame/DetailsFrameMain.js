import React, {Component} from 'react';
import {connect} from 'react-redux';

class DetailsFrameMain extends Component {

  state = {
    bkg_url: this.props.frame.bkg_url,
    framerate: this.props.frame.framerate,
    smoothing: this.props.frame.smoothing,
    pixelsnap: this.props.frame.pixelsnap
  }

  //Submits a change to the state
  handleChange = (event,prop)=> {
    this.setState({[prop]: event.target.value})
  }

  //Submits acknowledges changes to the reducer
  handleBlur = (prop)=> {
    switch(prop) {
      case 'bkg_url': this.props.dispatch({type: 'SET_FRAME_BKG', payload: this.state.bkg_url}); break;
      case 'framerate': this.props.dispatch({type: 'SET_FRAME_FRAMERATE', payload: Number(this.state.framerate) }); break;
      case 'smoothing': this.props.dispatch({type: 'SET_FRAME_SMOOTHING', payload: Number(this.state.smoothing) }); break;
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

  //Submits a call to the reducer to toggle the Pixelsnap property
  togglePixelsnap = ()=> {
    this.setState({
      pixelsnap: !this.state.pixelsnap
    })
    this.props.dispatch({type: 'SET_FRAME_PIXELSNAP', payload: !this.state.pixelsnap });
  }

  render() {
    return (
      <div id="details-frame-main">
          {/* -----< Background Input >----- */}
          <label>
            Background url: 
            <input 
              id="in-background-url" 
              type="text" 
              value={this.state.bkg_url}
              onChange={(event)=>this.handleChange(event,'bkg_url')}
              onBlur={()=>this.handleBlur('bkg_url')}
              onKeyPress={this.handleKeyPress}
            />
          </label>

          <div id="details-frame-main-inputs">
            <table>
              <tbody>
                {/* -----< Framerate Input >----- */}
                <tr>
                  <td>Framerate:</td>
                  <td>
                    <input 
                      type="number" 
                      className="input-with-unit"
                      value={this.state.framerate}
                      onChange={(event)=>this.handleChange(event,'framerate')}
                      onBlur={()=>this.handleBlur('framerate')}
                      onKeyPress={this.handleKeyPress}
                    />
                    <span className="input-unit">fps</span>
                    </td>
                </tr>
                {/* -----< Smoothing Input >----- */}
                <tr>
                  <td>Smoothing:</td>
                  <td>
                    <input 
                      type="number" 
                      className="input-with-unit"
                      value={this.state.smoothing}
                      onChange={(event)=>this.handleChange(event,'smoothing')}
                      onBlur={()=>this.handleBlur('smoothing')}
                      onKeyPress={this.handleKeyPress}
                    />
                  </td>
                </tr>
                {/* -----< Pixelsnap Toggle >----- */}
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
                {/* -----< Overflow Toggle >----- */}
                <tr>
                  <td>Hide overflow:</td>
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
    )
  }
}

export default connect(state=>({frame: state.edit}))(DetailsFrameMain);