import React from 'react';
import {useDispatch} from 'react-redux';
import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  grid-template-areas: "select input remove";
  grid-template-columns: auto 1fr auto;
  margin: 8px 0;
`;

const SelectBox = styled.div`
  grid-are: select;
  padding: 0 8px;
`;
const InputBox = styled.div`
  grid-area: input;
  position: relative;
  input {
    width: 100%;
  }
  span {
    position: absolute;
    right: 6px;
    bottom: 6px;
  }
`;
const RemoveBox = styled.div`
  grid-area: remove;
  padding: 0 8px;
`;

const filterNameList = [
  'blur',
  'brightness',
  'contrast',
  'grayscale',
  'hue-rotate',
  'invert',
  'opacity',
  'saturate',
  'sepia'
]

export default function DetailsFilterRow(props) {

  const dispatch = useDispatch();

  function renderFilterValue() {
    return (
      <>
        <input 
          type="number" 
          className="input-with-unit details-input" 
          value={props.filter.value}
          onChange={(event)=>updateFilterValue(event,props.index)}
        />
        <span className="input-unit" >{(props.filter.unit? props.filter.unit : '')}</span>
      </>
    )
  }

  function updateFilterValue(event,prop) {
    dispatch({
      type: 'SET_FILTER_VALUE',
      payload: {
        value: event.target.value,
        select: props.select,
        index: props.index
      }
    })
  }

  function selectFilter(event) {
    dispatch({
      type: 'SET_FILTER_TYPE',
      payload: {
        select: props.select,
        index: props.index,
        value: event.target.value
      }
    })
  }

  function removeFilter(index) {
    dispatch({
      type: 'REMOVE_FILTER',
      payload: {
        index: index,
        select: props.select
      }
    })
  }

  return (
    <Container>
      <SelectBox>
        <select value={props.filter.name} onChange={(event)=>selectFilter(event)}>
          <option disabled value={'none'}>none</option>
          {filterNameList.map( (filter,i)=> {
          let find = (props.currentFilters.indexOf(filter)!==-1);        
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
      </SelectBox>
      <InputBox>
        {renderFilterValue()}
      </InputBox>
      <RemoveBox>
        <button 
          className="button-reject"
          onClick={()=>removeFilter(props.index)}
        >
          Remove
        </button>
      </RemoveBox>
    </Container>
  )

}