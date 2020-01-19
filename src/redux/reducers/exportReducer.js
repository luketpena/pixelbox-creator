const exportReducer = (state = {
  active: false,
  content: 
  `Here is where all of the code goes.
  There can be a lot of it, so I have to write a longer paragraph.
  
  More lines of text.`,
  frame: {}
}, action) => {
  switch (action.type) {
    case 'EXPORT_SET_ACTIVE': return {...state, active: action.payload}
    case 'EXPORT_SET_FRAME': return {...state, frame: action.payload}
    case 'EXPORT_SET_CONTENT':
        return {
          ...state,
          content: 
`setGlobals(${state.frame.smoothing},${state.frame.framerate},${state.frame.pixelsnap});

let layerData = [${state.frame.layerData.map(layer=>{
  return `
  {
    layer_name: ${layer.layer_name},
    layer_url: ${layer.layer_url},
    layer_str: ${layer.layer_str},
    blendmode: ${layer.blendmode},
    filter: [${layer.filter.map(filter=>`name: '${filter.name}', value: ${filter.value}, unit: '${filter.unit}'`)}]
  }`
})}

]

createFrame(
  '#frame-div-id',
  '${state.frame.bkg_url},
  layerData,
  size: [${state.frame.size_x},${state.frame.size_y}],
  extend: [${state.frame.extend_x},${state.frame.extend_y}],
  display: [${state.frame.display_x},${state.frame.display_y}],
  framerate: ${state.frame.framerate},
  smoothing: ${state.frame.smoothing},
  pixelsnap: ${state.frame.pixelsnap}
);
          `
        }
    default: return state;
  }
};

// user will be on the redux state at:
// state.user
export default exportReducer;
