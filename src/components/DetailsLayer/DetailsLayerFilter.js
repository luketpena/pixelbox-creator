import React, {Component} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';

//-----< Component Imports -----\\
import DetailsFilterRow from './DetailsFilterRow';

const Container = styled.div`
  position: relative;
  height: 126px;
  grid-area: filters;
  margin-left: 8px;
  border-radius: 8px;
  color: var(--color-text-darkest);
  font-family: var(--font-input);
  overflow: hidden;
`;

const FilterBox = styled.div`
  height: 108px;
  overflow-y: scroll;
  background-color: var(--color-bkg-light);
  border-radius: 8px;
`;

const FilterTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
  tr td:last-child {
    width: 100px;
  }
  tr td:first-child {
    width: 100px;
  }
  input {
    width: 100%;
  }
`;


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
      <Container>
        <label>Filters</label>
        <FilterBox>
          <FilterTable>
            <tbody>
              {this.renderFilters()}
            </tbody>
          </FilterTable>
        </FilterBox>
        <div className="addFilter-bar">
          <button className="btn-addFilter button-confirm" onClick={this.addFilter}>Add Filter</button>
        </div>
      </Container>
    )
  }
}

export default connect(state=>({
  select: state.edit.select,
  frame: state.edit
}))(DetailsLayerFilter);