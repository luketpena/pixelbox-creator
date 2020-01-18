import React, {Component} from 'react';

import av_peter from '../../images/avatars/av_peter.png';
import av_captain from '../../images/avatars/av_captain.png';
import av_pirate from '../../images/avatars/av_pirate.png';
import av_mechanic from '../../images/avatars/av_mechanic.png';
import av_blacksmith from '../../images/avatars/av_blacksmith.png';
import av_trader from '../../images/avatars/av_trader.png';
import av_tailor from '../../images/avatars/av_tailor.png';
import av_busker from '../../images/avatars/av_busker.png';
import av_bartender from '../../images/avatars/av_bartender.png';
import av_sailor from '../../images/avatars/av_sailor.png';

export default class Avatars extends Component {
  static getAvatars() {
    return {
      peter: av_peter,
      captain: av_captain,
      pirate: av_pirate,
      mechanic: av_mechanic,
      blacksmith: av_blacksmith,
      trader: av_trader,
      tailor: av_tailor,
      busker: av_busker,
      bartender: av_bartender,
      sailor: av_sailor,
    }
  }
}
  