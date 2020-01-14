import React from 'react';

//-----< Component Imports >-----\\
import DetailsFrameSize from './DetailsFrameSize';
import DetailsFrameMain from './DetailsFrameMain';

export default function DetailsFrame () {
  //>> Render
  return (
    <div id="details-frame" className="details-widget">
      <DetailsFrameSize />
      <DetailsFrameMain />
    </div>
  )
}