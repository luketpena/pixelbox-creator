import React, {Component} from 'react';
import {connect} from 'react-redux';

//-----< Component Imports -----\\
import DetailsFilterRow from './DetailsFilterRow';


class DetailsLayerFilter extends Component {


  renderFilters = ()=> {
    const filterList = this.props.frame.layerData[this.props.select].filter;
    //Loops through all filters and collect the names that are on the list
    const currentFilters = [];
    for (let i=0; i<filterList.length; i++) {
      currentFilters.push(filterList[i].name)
    }
    
    return filterList.map( (item,i)=>{
      return <DetailsFilterRow key={i} index={i} select={this.props.select} filter={item} currentFilters={currentFilters}/>
    })
  }

  addFilter = ()=> {
    this.props.dispatch({type: 'ADD_NEW_FILTER', payload: this.props.select});
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

  render() {
    return (
      <div id="details-layer-filters">
        <label>Filters</label>
        <div id="details-layer-filter-box">
          <table id="details-layer-filters-table">
            <tbody>
              {this.renderFilters()}
            </tbody>
          </table>
        </div>
        <div className="addFilter-bar">
          <button className="btn-addFilter" onClick={this.addFilter}>Add Filter</button>
        </div>
      </div>
    )
  }
}

export default connect(state=>({
  select: state.edit.select,
  frame: state.edit
}))(DetailsLayerFilter);