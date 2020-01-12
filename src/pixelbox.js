import $ from 'jquery';
import './pixelbox.css';

import {Component} from 'react';

const verbose = true;

let pageSize = [$(window).width(),$(window).height()];
let mousePos = [0,0]; //actual coordinates
let mouseMov = [0,0]; //movement from -1 to 1
let frameList = [];

let smoothing = .5;
let smoothingActive = false;
let framerate = 10;
let pixelSnap = true;

$(document).ready(()=>{
  pixelboxRun();
})

function pixelboxRun () {
  //Adjust what the page size is
  $(window).resize(()=>{
    pageSize = [$(window).width(),$(window).height()];
  });
  //Find the mousePos and calculate mouseMov
  $(document).mousemove((event)=>{
    mousePos = [event.pageX,event.pageY];
    if (smoothing===1) {
      mouseMov = [
        ((mousePos[0]/pageSize[0])*2)-1,
        ((mousePos[1]/pageSize[1])*2)-1
      ];
    } else if (!smoothingActive) {
      smoothingActive = true;
      pbSmoothMove();
    }
    //Update frames
    pbUpdate();
  });
}

/*
function pbSetSmoothing (val) {smoothing = val;}
function pbSetPixelSnap (val) {pixelSnap = val;}
function pbSetFramerate (val) {framerate = val;}
function pbSetCss (frame,layer,prop,set) {
  //Target a layer of a frame and set a CSS property based on arguments
  $(frame).data('attr').layers[layer].css(prop,set);
}

function pbFindFrame (frame) {
  return frameList.find( (el,i)=> el.frame=frame ).target;
}*/


function pbUpdate () {
  //console.log('Update:',pbFindFrame('#frame-1'));

  for (let i=0; i<frameList.length; i++) {

    const frame = frameList[i];

    //Find the positions of the frame
    for (let j=0; j<frame.layerCount; j++) {
      let layerX = 0,
          layerY = 0;
      
      switch(pixelSnap) {
        case false:
          layerX = -(frame.extend[0]*(frame.layerData[j].layer_str*frame.ratio[0])*mouseMov[0]);
          layerY = -(frame.extend[1]*(frame.layerData[j].layer_str*frame.ratio[1])*mouseMov[1]);
          break;
        case true:
          layerX = -Math.round( (frame.extend[0]*(frame.layerData[j].layer_str*frame.ratio[0])*mouseMov[0])/frame.ratio[0] )*frame.ratio[0];
          layerY = -Math.round( (frame.extend[1]*(frame.layerData[j].layer_str*frame.ratio[1])*mouseMov[1])/frame.ratio[1] )*frame.ratio[1];
          break;
        default: break;
      }

      frame.layerList[j].css('transform',`translate(${layerX}px,${layerY}px`);
    } //End of layer loop
  } //End of frame loop
}
function pbSmoothMove () {
  
  //Find the position we want to move towards
  let targetPos = [
    ((mousePos[0]/pageSize[0])*2)-1,
    ((mousePos[1]/pageSize[1])*2)-1
  ];

  //Default to not wanting to move
  let active = false;
  //Check both x and y current position,
  //if they are far from the target, then increment towards it and activate
  for (let i=0; i<=1; i++) {
    if (Math.abs(mouseMov[i]-targetPos[i])>.001) {
      mouseMov[i] += (targetPos[i]-mouseMov[i])*smoothing;
      active = true;
    }
  }
  //If it never activated, snap mouse position to the target position
  if (!active) {
    mouseMov[0] = targetPos[0];
    mouseMov[1] = targetPos[1];
    smoothingActive = false;
  } else {
    //Call itself at a framerate if far enough away
    setTimeout(pbSmoothMove,framerate);
  }
  //Update the frame positions
  pbUpdate();
  
}

class pixelbox extends Component {
  static test() {
    console.log('pixelbox test');
  }

  static setGlobals (setSmoothing, setFramerate, setPixelSnap) {
    smoothing = setSmoothing;
    framerate = setFramerate;
    pixelSnap = setPixelSnap;
  }

  static createFrame (target,bkg,layerData,size,extend,display) {
    if (verbose) console.log('Creating Pixelbox frame...');
    
    //Find the number of layers based on the arguments provided
    const layerCount = layerData.length;
    //Find the ratio of the img to the frame size
    const ratio = [display[0]/size[0],display[1]/size[1]];
  
    //Add the background to the frame
    $(target).addClass('pb-frame');
    $(target).css('background',`url(${bkg})`);
    $(target).css('background-size',`${display[0]}px ${display[1]}px`);
    $(target).css('width',display[0]);
    $(target).css('height',display[1]);
  
    let layerSize = [(size[0]+(extend[0]*2))*ratio[0],(size[1]+(extend[1]*2))*ratio[1]];
  
    //Create the layer jQuery objects
    const layerList = [];
    for (let i=0; i<layerCount; i++) {
      //Create and style the layers
      const targetLayer = layerData[i]
      const newLayer = $(`<div class='pb-layer'></div>`);
        newLayer.css('background',`url(${targetLayer.layer_url})`);
        newLayer.css('background-size',`${layerSize[0]}px ${layerSize[1]}px`);
        newLayer.css('background-position','center');
        newLayer.css('width',layerSize[0]);
        newLayer.css('height',layerSize[1]);
        newLayer.css('left',-(extend[0]*ratio[0]));
        newLayer.css('top',-(extend[1]*ratio[1]))
      //Add the layers to the array and the frame
      layerList.push(newLayer);
      $(target).append(newLayer);
    }
  
    //Create the attributes object
    const attr = {target,bkg,layerData,size,display,extend,layerList,layerCount,ratio};
    console.log('Attributes:',attr)
    //Save the attributes to the frame's data
    $(target).data('attr',attr);
    //Save the frame attributes to the list of frames
    frameList.push(attr);

    pbUpdate();
    return target;
  }

  

  static recalculateFrame (index,newData) {
    //-----< Setting the New Numbers >-----\\
    frameList[index].bkg = newData.bkg_url;
    frameList[index].layerData = newData.layerData;
    frameList[index].display = [newData.display[0],newData.display[1]];
    frameList[index].size = [newData.size[0],newData.size[1]];
    frameList[index].extend = [newData.extend[0],newData.extend[1]];
    frameList[index].ratio = [display[0]/size[0],display[1]/size[1]];


    //...target the element and get the updated display values...
    const {target, display, size, extend} = frameList[index];


    
    //...and apply that CSS to the frame element.
    $(target).css('background-size',`${display[0]}px ${display[1]}px`);
    $(target).css('width',display[0]);
    $(target).css('height',display[1]);
  } 
}

export default pixelbox;
