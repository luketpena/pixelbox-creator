import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
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

export default function DetailsLayerFilter() {

  const dispatch = useDispatch();

  const frame = useSelector(state=>state.edit);

  function renderFilters() {
    const filterList = frame.layerData[frame.select].filter;
    //Loops through all filters and collect the names that are on the list
    const currentFilters = [];
    for (let i=0; i<filterList.length; i++) {
      currentFilters.push(filterList[i].name)
    }
    console.log(currentFilters);
    
    return filterList.map( (item,i)=>{
      return <DetailsFilterRow key={i} index={i} select={frame.select} filter={item} currentFilters={currentFilters}/>
    })
  }

  function addFilter(){
    dispatch({type: 'ADD_NEW_FILTER', payload: frame.select});
  } 

  function renderAddButton() {
    if (frame.layerData[frame.select].filter.length<9) {
      return <button className="btn-addFilter button-confirm" onClick={addFilter}>Add Filter</button>
    }
  }

  return (
    <Container>
      <TitleBox>
        <label>Filters</label>
      </TitleBox>
      <FilterBox>
        {renderFilters()}
      </FilterBox>
      <AddBar>
        {renderAddButton()}
      </AddBar>
    </Container>
  )
}

