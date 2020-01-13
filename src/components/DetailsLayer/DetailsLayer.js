import React, {Component} from 'react';
import {connect} from 'react-redux';

//-----< Component Imports >-----\\
import DetailsLayerMain from './DetailsLayerMain';



const filterNameList = [
  'blur',
  'brightness',
  'contrast',
]

class DetailsLayer extends Component {

  state = {
    filter: [],
    filterList: {
      blur: {unit: 'px', default: 0, selected: false}
    }
  }

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

  clickClose = ()=> {
    this.props.dispatch({type: 'SET_LAYER_SELECT', payload: -1})
  }

  addFilter = ()=> {
    let newFilter = [...this.state.filter, {name: 'none', unit: '', value: ''}];
    this.setState({
      filter: newFilter
    });
    this.props.dispatch({
      type: 'SET_LAYER_FILTER',
      payload: {
        index: this.props.select,
        newFilter: newFilter
      }
    })
  }

  removeFilter = (index)=> {
    let filterCopy = [...this.state.filter];
    filterCopy.splice(index,1);
    this.setState({
      filter: filterCopy
    })
  }

  selectFilter = (event, index)=> {
    const selectedFilter = event.target.value;
    let filterCopy = this.state.filter;
    filterCopy[index].name = selectedFilter;
    filterCopy[index].unit = this.state.filterList[selectedFilter].unit;
    filterCopy[index].value = this.state.filterList[selectedFilter].default;
    this.setState({
      filters: filterCopy
    })
    console.log('New filter state:',filterCopy[index]);
    
  }

  renderFilters = ()=> {
    return this.state.filter.map( (item,i)=>{
      return (
        <tr key={i}>
          <td>
            <select onChange={(event)=>this.selectFilter(event,i)}>
              <option value={'none'}>none</option>
              {filterNameList.map( (filter,i)=> {
              return <option key={i} value={filter}>{filter}</option>
              })}
            </select>
          </td>
          <td>
            <input 
              type="number" 
              className="input-with-unit" 
              value={this.state.filter[i].value}
              onChange={(event)=>this.updateFilterValue(event,i)}
            />
            <span className="input-unit">{item.unit}</span>
          </td>
          <td><button onClick={()=>this.removeFilter(i)}>Remove</button></td>
        </tr>
      )
    })
  }

  render() {
    

    return (
      <div id="details-layer" className="details-widget">
        <button onClick={this.clickClose}>Close</button>
        <DetailsLayerMain select={this.props.select}/>
        
        {/* <div id="details-layer-filters">
          <label>Filters</label>
          <table id="details-layer-filters-table">
            <tbody>
              {this.renderFilters()}
              <tr>
                <td>&nbsp;</td>
                <td><button onClick={this.addFilter}>Add Filter</button></td>
                <td>&nbsp;</td>
              </tr>
            </tbody>
          </table>
        </div> */}
      </div>
    )
  }
}

export default connect(state=>({ select: state.edit.select }))(DetailsLayer);