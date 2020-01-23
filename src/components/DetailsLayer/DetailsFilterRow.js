import React, {Component} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import styled from 'styled-components';

const filterNameList = [
  'blur',
  'brightness',
  'contrast'
]

export default function DetailsFilterRow(props) {

  const dispatch = useDispatch();
  const select = useSelector(state=>state.edit.select);
  const edit = useSelector(state=>state.edit);

  function renderFilterValue() {
    return (
      <>
        <input 
          type="number" 
          className="input-with-unit" 
          value={props.filter.value}
          onChange={(event)=>updateFilterValue(event,props.index)}
        />
        <span className="input-unit" >{(props.filter.unit? props.filter.unit : 'xx')}</span>
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
    <tr>
      <td>
        <select value={props.filter.name} onChange={(event)=>selectFilter(event)}>
          <option disabled value={'none'}>none</option>
          {filterNameList.map( (filter,i)=> {
          let find = (props.currentFilters.indexOf(filter.name)!==-1);
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
        {renderFilterValue()}
      </td>
      <td>
        <button 
          className="button-reject"
          onClick={()=>removeFilter(props.index)}
        >
          Remove
        </button>
      </td>
    </tr>
  )

}