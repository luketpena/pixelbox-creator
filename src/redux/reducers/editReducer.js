const editReducer = (state = {
    select: -1,
    bkg_url: 'https://i.ibb.co/BB16CGL/layer1.png',
    layerData: [
      {layer_name: 'Forest Back', layer_url: 'https://i.ibb.co/wWHn1gj/layer2.png', layer_str: .1, blendmode: 'normal', filter: []},
      {layer_name: 'Sphere', layer_url: 'https://i.ibb.co/j61b2c3/layer3.png', layer_str: .3, blendmode: 'luminosity', filter: []},
      {layer_name: 'Forest Mid', layer_url: 'https://i.ibb.co/f8R94JB/layer4.png', layer_str: .6, blendmode: 'lighten', filter: []},
      {layer_name: 'Fog', layer_url: 'http://www.transparentpng.com/thumb/fog/heroes-and-icons-fog-png-35.png', layer_str:.8, blendmode: 'normal', filter: []},
      {layer_name: 'Forest Front', layer_url: 'https://i.ibb.co/y4dmZt2/layer5.png', layer_str: 1, blendmode: 'normal', filter: []}
    ],
    size: [256,128],
    extend: [32,8],
    display: [512,256],
    framerate: 5,
    smoothing: .2,
    pixelsnap: true
  }, action) => {
  switch (action.type) {
    case 'SET_FRAME_SIZE': return {...state, size: action.payload};
    case 'SET_FRAME_EXTEND': return {...state, extend: action.payload};
    case 'SET_FRAME_DISPLAY': return {...state, display: action.payload};
    case 'SET_FRAME_BKG': return {...state, bkg_url: action.payload};
    case 'SET_FRAME_FRAMERATE': return {...state, framerate: action.payload};
    case 'SET_FRAME_SMOOTHING': return {...state, smoothing: action.payload};
    case 'SET_FRAME_PIXELSNAP': return {...state, pixelsnap: action.payload};

    case 'SET_LAYER_SELECT': return {...state, select: action.payload};
    case 'SET_LAYER_DATA': 
      let setLayerData = [...state.layerData];
      setLayerData[action.payload.index] = action.payload.value;
      return {...state, layerData: setLayerData}
    case 'SET_LAYER_DATA_PROP':
      let setLayerDataProp = [...state.layerData];
      setLayerDataProp[action.payload.index][action.payload.prop] = action.payload.value;
      return {...state, layerData: setLayerDataProp}
    case 'ADD_NEW_LAYER':
      let newLayer = {layer_name: 'Untitled', layer_url: '', layer_str: 1, blendmode: 'normal'};
      return {...state, layerData: [...state.layerData, newLayer]}
    case 'REMOVE_LAYER':
      let removedLayerData = [...state.layerData];
      removedLayerData.splice(action.payload,1);
      return {...state, layerData: removedLayerData}
    case 'MOVE_LAYER':
      const {index, newPos} = action.payload;
      let layerData_move = [...state.layerData];
      let movedLayer = layerData_move.splice(index,1)[0];
      layerData_move.splice(newPos,0,movedLayer);
      return {...state, layerData: layerData_move}
    case 'SET_LAYER_FILTER':
      let layerData_filter = [...state.layerData];
      console.log('SET_LAYER_FILTER data:',layerData_filter);
      
      //layerData_filter.layerData.filter[action.payload.index] = action.payload.newFilter;
      return {...state, layerData: layerData_filter}
    default: return state;
  }
};

// user will be on the redux state at:
// state.user
export default editReducer;
