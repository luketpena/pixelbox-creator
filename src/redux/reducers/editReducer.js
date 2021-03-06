const demoFrame = {
  ready: false,
  saved: true,
  select: -1,
  id: -1,
  frame_name: 'Untitled Frame',
  bkg_url: 'https://i.ibb.co/BB16CGL/layer1.png',
  layerData: [
    {layer_name: 'Forest Back', layer_url: 'https://i.ibb.co/wWHn1gj/layer2.png', layer_str: .1, blendmode: 'normal', 
    filter: [
      {name: 'blur', value: 16, unit: 'px'},
      {name: 'brightness', value: 100, unit: '%'}
    ]},
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
  pixelsnap: true,
  hideoverflow: false
};

const emptyFrame = {
  ready: false,
  saved: true,
  frame_name: 'Untitled',
  select: 0,
  id: -1,
  bkg_url: '',
  layerData: [
    {layer_name: 'Layer 1', layer_url: '', layer_str: 1, blendmode: 'normal', filter: []}
  ],
  size: [256,128],
  extend: [32,8],
  display: [512,256],
  smoothing: 1,
  framerate: 15,
  pixelsnap: false,
  hideoverflow: true
}

const editReducer = (state = demoFrame, action) => {
  
  const layerDataCopy = [...state.layerData];
  switch (action.type) {
    case 'CONFIRM_SAVE': return {...state, saved: true};
    case 'SET_EDIT_READY': return {...state, ready: action.payload};
    case 'SET_FRAME_SAVE': return {...state, saved: action.payload}
    case 'SET_EDIT_FRAME':
    return {
      ready: true,
      saved: true,
      select: -1,
      layerData: action.payload.layerData,
      id: action.payload.id,
      frame_name: action.payload.frame_name,
      bkg_url: action.payload.bkg_url,
      size: [action.payload.size_x,action.payload.size_y],
      extend: [action.payload.extend_x,action.payload.extend_y],
      display: [action.payload.display_x,action.payload.display_y],
      framerate: action.payload.framerate,
      smoothing: Number(action.payload.smoothing),
      pixelsnap: action.payload.pixelsnap,
      hideoverflow: action.payload.hideoverflow
    }

    case 'MAKE_NEW_FRAME': return {...emptyFrame, ready: true}

    //-----< Frame Setters >-----\\
    case 'SET_FRAME_ID': return {...state, saved: true, id: action.payload}
    case 'SET_FRAME_NAME': return {...state, saved: false, frame_name: action.payload};
    case 'SET_FRAME_SIZE': return {...state, saved: false, size: action.payload};
    case 'SET_FRAME_EXTEND': return {...state, saved: false, extend: action.payload};
    case 'SET_FRAME_DISPLAY': return {...state, saved: false, display: action.payload};
    case 'SET_FRAME_BKG': return {...state, saved: false, bkg_url: action.payload};
    case 'SET_FRAME_FRAMERATE': return {...state, saved: false, framerate: action.payload};
    case 'SET_FRAME_SMOOTHING': return {...state, saved: false, smoothing: action.payload};
    case 'SET_FRAME_PIXELSNAP': return {...state, saved: false, pixelsnap: action.payload};
    case 'SET_FRAME_HIDEOVERFLOW': return {...state, saved: false, hideoverflow: action.payload};

    //-----< Layer Setters >-----\\
    case 'SET_LAYER_SELECT': return {...state, select: action.payload};

    case 'SET_LAYER_PROP':
      layerDataCopy[action.payload.index][action.payload.prop] = action.payload.value;
      return {...state, saved: false, layerData: layerDataCopy};
    case 'SET_LAYER_DATA': return {...state, saved: false, layerData: action.payload};
    case 'ADD_NEW_FILTER':
      layerDataCopy[action.payload].filter.push(
        {name: 'none', value: ''}
      )
      return {...state, saved: false, layerData: layerDataCopy}
    case 'SET_FILTER_VALUE':
      layerDataCopy[action.payload.select].filter[action.payload.index].value = action.payload.value;
      return {...state, saved: false, layerData: layerDataCopy};
    case 'SET_FILTER_TYPE':

      const filters = {
        blur: {filterDefaultValue: 0, filterUnit: 'px'},
        brightness: {filterDefaultValue: 100, filterUnit: '%'},
        contrast: {filterDefaultValue: 100, filterUnit: '%'},
        grayscale: {filterDefaultValue: 0, filterUnit: '%'},
        "hue-rotate": {filterDefaultValue: 0, filterUnit: 'deg'},
        invert: {filterDefaultValue: 0, filterUnit: '%'},
        opacity: {filterDefaultValue: 100, filterUnit: '%'},
        saturate: {filterDefaultValue: 100, filterUnit: '%'},
        sepia: {filterDefaultValue: 0, filterUnit: '%'},
      }
      //Set the name of the filter
      layerDataCopy[action.payload.select].filter[action.payload.index].name = action.payload.value;
      layerDataCopy[action.payload.select].filter[action.payload.index].value = filters[action.payload.value].filterDefaultValue;
      layerDataCopy[action.payload.select].filter[action.payload.index].unit = filters[action.payload.value].filterUnit;

      return {...state, saved: false, layerData: layerDataCopy};
    case 'REMOVE_FILTER':
      layerDataCopy[action.payload.select].filter.splice(action.payload.index,1);
      return {...state, saved: false, layerData: layerDataCopy};

    case 'SET_LAYER_DATA_PROP':
      let setLayerDataProp = [...state.layerData];
      setLayerDataProp[action.payload.index][action.payload.prop] = action.payload.value;
      return {...state, saved: false, layerData: setLayerDataProp}
    case 'ADD_NEW_LAYER':
      let newLayer = {layer_name: 'Untitled', layer_url: '', layer_str: 1, blendmode: 'normal', filter:[]};
      return {...state, saved: false, layerData: [...state.layerData, newLayer]}
    case 'REMOVE_LAYER':
      let removedLayerData = [...state.layerData];
      removedLayerData.splice(action.payload,1);
      return {...state, saved: false, layerData: removedLayerData}
    case 'MOVE_LAYER':
      const {index, newPos} = action.payload;
      let layerData_move = [...state.layerData];
      let movedLayer = layerData_move.splice(index,1)[0];
      layerData_move.splice(newPos,0,movedLayer);
      return {...state, saved: false, layerData: layerData_move}
    default: return state;
  }
};

// user will be on the redux state at:
// state.user
export default editReducer;
