import React from 'react';
import {useSelector} from 'react-redux';
import ExportPopup from '../ExportPopup/ExportPopup';

//-----< Component Imports >-----\\
import EditWindowLayers from '../EditWindowLayers/EditWindowLayers';
import EditWindowDetails from '../EditWindowDetails/EditWindowDetails'
import EditWindowPreview from '../EditWindowPreview/EditWindowPreview';

export default function EditorPage() {

  const exporter = useSelector(state=>state.exporter);

  function renderExport() {
    if (exporter.active) {
      return <ExportPopup />
    }
  }

  return (
    <div id="edit-page">

      <EditWindowPreview />
      <EditWindowLayers />
      <EditWindowDetails />

      {renderExport()}
    </div>
  )
}