import React, {Component} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';

//-----< Component Imports -----\\
import DetailsFilterRow from './DetailsFilterRow';

const Container = styled.div`
  height: 126px;
  position: relative;
  grid-area: filters;
  margin-left: 8px;
  border-radius: 8px;
  overflow: hidden;
  color: var(--color-text-darkest);
  font-family: var(--font-input);
  display: grid;
  grid-template-areas: "title" "filterList";
  grid-template-rows: auto 1fr;
`;

const FilterBox = styled.div`
  grid-area: filterList;
  overflow-y: scroll;
  border-radius: 8px;
  background-color: var(--color-bkg-light);
  padding-bottom: 32px;
`;

const TitleBox = styled.div`
  grid-area: title;
`;

const AddBar = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: rgba(0,0,0,.8);
  padding: 4px 0;
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
        <TitleBox>
          <label>Filters</label>
        </TitleBox>
        <FilterBox>

          {this.renderFilters()}
        </FilterBox>
        <AddBar>
          <button className="btn-addFilter button-confirm" onClick={this.addFilter}>Add Filter</button>
        </AddBar>
      </Container>
    )
  }
}

export default connect(state=>({
  select: state.edit.select,
  frame: state.edit
}))(DetailsLayerFilter);