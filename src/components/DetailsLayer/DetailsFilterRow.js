import React, {Component} from 'react';
import {connect} from 'react-redux';

const filterNameList = [
  'blur',
  'brightness',
  'contrast'
]

class DetailsFilterRow extends Component {

  renderFilterValue = ()=> {
    return (
      <>
        <input 
          type="number" 
          className="input-with-unit" 
          value={this.props.filter.value}
          onChange={(event)=>this.updateFilterValue(event,this.props.index)}
        />
        <span className="input-unit" >{this.props.filter.unit}</span>
      </>
    )
  }

  updateFilterValue = (event,prop)=> {
    this.props.dispatch({
      type: 'SET_FILTER_VALUE',
      payload: {
        value: event.target.value,
        select: this.props.select,
        index: this.props.index
      }
    })
  }

  selectFilter = (event)=> {
    this.props.dispatch({
      type: 'SET_FILTER_TYPE',
      payload: {
        select: this.props.select,
        index: this.props.index,
        value: event.target.value
      }
    })
  }

  removeFilter = (index)=> {
    this.props.dispatch({
      type: 'REMOVE_FILTER',
      payload: {
        index: index,
        select: this.props.select
      }
    })
  }

  render() {
    return (
      <tr>
        <td>
          <select value={this.props.filter.name} onChange={(event)=>this.selectFilter(event)}>
            <option disabled value={'none'}>none</option>
            {filterNameList.map( (filter,i)=> {
            let find = (this.props.currentFilters.indexOf(filter.name)!==-1);
            return (
              <option 
                disabled={find} 
                key={i} 
                value={filter}
              >{filter}
              </option>
            )
            })}
          </select>
        </td>
        <td>
          {this.renderFilterValue()}
        </td>
        <td>
          <button 
            className="button-reject"
            onClick={()=>this.removeFilter(this.props.index)}
          >
            Remove
          </button>
        </td>
      </tr>
    )
  }
}

export default connect(state=>({
  select: state.edit.select,
  frame: state.edit
}))(DetailsFilterRow);