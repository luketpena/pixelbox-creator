import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import styled from 'styled-components';

//Bring in the list of avatars to be displayed / chosen from
import avatars from '../avatars/avatars';

//-----< Styling >-----\\
const Container = styled.div`
  background-color: var(--color-bkg-light);
  border-radius: 16px;
  display: flex;
  grid-area: avatar;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 256px;
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
  image-rendering: -moz-crisp-edges;
  image-rendering: -webkit-crisp-edges;
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

export default function AvatarSelect(props) {

  const dispatch = useDispatch();

  let [select, setSelect] = useState(-1);
  let [avatarId, setAvatarId] = useState((props.avatarStart? props.avatarStart : ''));
  let [mount,setMount] = useState(false);

  useEffect(()=>{
    if (!mount) {
      setMount(true);
      
      if (props.avatarStart) {
        const index = Object.keys(avatars.getAvatars()).indexOf(props.avatarStart);
        console.log('----------< Index of avatar:',index);
        
        setSelect(index);
      }
    }
  },[mount,dispatch,select,avatarId])

  //Chooses and avatar and sends it to the reducer.
  function selectAvatar(index,key) {
    setSelect(index);
    setAvatarId(key);
    dispatch({type: 'SET_AVATAR', payload: key});
  }

  //Draws all available avatars imported from the avatars.js file
  function renderAvatars() {
    return Object.entries(avatars.getAvatars()).map( ([key,value],i)=> {
      return <AvatarBox key={i} index={i} select={select} onClick={()=>selectAvatar(i,key)}>
              <Avatar src={value}/>
             </AvatarBox>
    })
  }

  //Renders the avatar selected by selectAvatar
  function renderSelect() {
    if (avatarId!=='') {
      return <SelectedAvatar src={avatars.getAvatars()[avatarId]} />
    }
  }

  //Component render
  return (
    <Container>
      
      {renderSelect()}
      <Title>Choose Your Character</Title>
      {renderAvatars()}
    </Container>
  )
}