import React, {Component} from 'react';
import {connect} from 'react-redux';

//-----< Component Imports >-----\\
import DetailsLayerMain from './DetailsLayerMain';
import DetailsLayerFilter from './DetailsLayerFilter';





class DetailsLayer extends Component {

  

  handleChange = (event,prop)=> {
    this.setState({[prop]: event.target.value})
  }

  updateFilterValue = (event,index)=> {
    let filterCopy = [...this.state.filter];
    filterCopy[index].value = event.target.value;
    this.setState({
      filter: filterCopy
    })
  }

  handleBlur = ()=> {
    this.triggerChange();
  }

  handleReducerChange = (event,prop)=> {
    this.setState({[prop]: event.target.value})    
    this.props.dispatch({
      type: 'SET_LAYER_DATA', 
      payload: {
        index: this.props.select,
        prop: prop,
        value: event.target.value
      }
    });
  }

  triggerChange = ()=> {
    this.props.dispatch({
      type: 'SET_LAYER_DATA', 
      payload: {
        index: this.props.select,
        value: this.state
      }
    });
  }  

  render() {
    

    return (
      <div id="details-layer" className="details-widget">
        
        <DetailsLayerMain />
        <DetailsLayerFilter />
        
      </div>
    )
  }
}

export default connect(state=>({ select: state.edit.select }))(DetailsLayer);