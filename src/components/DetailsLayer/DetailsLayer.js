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

const filterNameList = [
  'blur',
  'brightness',
  'contrast',
]


class DetailsLayer extends Component {

  state = {
    layer_name: this.props.layerData[this.props.select].layer_name,
    layer_url: this.props.layerData[this.props.select].layer_url,
    layer_str: this.props.layerData[this.props.select].layer_str,
    blendmode: this.props.layerData[this.props.select].blendmode,
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
              <td>
                <input 
                  type="number"
                  value={this.state.layer_str} 
                  onChange={(event)=>this.handleChange(event,'layer_str')}  
                  onBlur={this.handleBlur}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div id="details-layer-filters">
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
        </div>
      </div>
    )
  }
}

export default connect(state=>({
  layerData: state.edit.layerData,
  select: state.edit.select
}))(DetailsLayer);