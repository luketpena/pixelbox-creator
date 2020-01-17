import React, {useState} from 'react';
import styled from 'styled-components';

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
const avatars = {
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

const Container = styled.div`
  background-color: var(--color-bkg-light);
  border-radius: 16px 16px 50% 50%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 256px;
  margin: 32px auto;
  padding: 32px 16px;
  box-shadow: 0 32px 16px -2px var(--color-shadow-main);
  position: relative;
`;

const Avatar = styled.img`
  width: 200%;
  height: 200%;
  object-fit: cover;
  position: relative;
  bottom: 100%;
  right: 50%;
  image-rendering: pixelated;
`;

const AvatarBox = styled.div`
  overflow: hidden;
  position: relative;
  width: 48px;
  height: 48px;
  background-color: ${(props)=>(props.index === props.select? 'var(--color-confirm);' : 'var(--color-bkg-main);')};
  border-radius: 4px;
  margin: 4px;
  border: ${(props)=>(props.index === props.select? '2px solid var(--color-confirm);' : '2px solid var(--color-bkg-main);')}
  transition: all .25s;
  transition-timing-function: cubic-bezier(0, 0.96, .48, 2);
  &:hover {
    border: ${(props)=>(props.index === props.select? '2px solid var(--color-confirm);' : '2px solid var(--color-confirm-dark);')}
    transform: scale(1.5);
    z-index: 10;
    cursor: pointer;
  }
`;
const Title = styled.h2`
  font-family: var(--font-header);
  color: var(--color-text-light);
`;

const SelectedAvatar = styled.img`
  width: 128px;
  height: 128px;
  position: absolute;
  top: -80px;
  image-rendering: pixelated;
  -webkit-filter: drop-shadow(5px 5px 5px #222 );
  filter: drop-shadow(0 0 5px var(--color-confirm));
`;

export default function AvatarSelect() {

  let [select, setSelect] = useState(-1);
  let [avatarId, setAvatarId] = useState('');

  function selectAvatar(index,key) {
    console.log('SELECT AVATAR');
    setSelect(index);
    setAvatarId(key);
  }


  function renderAvatars() {
    return Object.entries(avatars).map( ([key,value],i)=> {
      return <AvatarBox key={i} index={i} select={select} onClick={()=>selectAvatar(i,key)}>
              <Avatar src={value}/>
             </AvatarBox>
    })
  }

  function renderSelect() {
    if (avatarId!=='') {
      return <SelectedAvatar src={avatars[avatarId]} />
    }
  }

  return (
    <Container>
      {renderSelect()}
      <Title>Choose Your Character</Title>
      {renderAvatars()}
    </Container>
  )
}