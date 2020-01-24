import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import ExportPopup from '../ExportPopup/ExportPopup';

//-----< Component Imports >-----\\
import EditWindowLayers from '../EditWindowLayers/EditWindowLayers';
import EditWindowDetails from '../EditWindowDetails/EditWindowDetails'
import EditWindowPreview from '../EditWindowPreview/EditWindowPreview';

import Alert from '../Alert/Alert';

export default function EditorPage() {

  const dispatch = useDispatch();

  const exporter = useSelector(state=>state.exporter);
  let alert = useSelector(state=>state.errors.appMessage);
  
  const [mount,setMount] = useState(false)
  
  useEffect(()=>{
    if (!mount) {
      setMount(true);
      dispatch({type: 'EXPORT_SET_ACTIVE', payload: false});
      dispatch({type: 'SET_APP_ALERT_ACTIVE', payload: false});
    }   
  },[mount,dispatch]);

  function renderExport() {
    if (exporter.active) {
      return <ExportPopup />
    }
  }

  function renderAlert() {
    if (alert.active) {
      console.log('HELLO FROM RENDER ALERT');
      return <Alert />
    }
  }

  return (
    <div id="edit-page">

      <EditWindowPreview />
      <EditWindowLayers />
      <EditWindowDetails />
      {renderAlert()}
      {renderExport()}
    </div>
  )
}