import React from 'react';
import {useSelector} from 'react-redux';
import styled from 'styled-components';

const Container = styled.div`
  border: 1px solid var(--color-reject);
  background-color: var(--color-reject-faded);
  color: var(--color-reject);
  font-family: var(--font-input);
  position: absolute;
  width: 100%;
  left: -1px;
  top: 16px;
  h2 {
    margin: 0;
    font-size: 16px;
  }
`;

export default function LoginErrorBar() {

  let errors = useSelector(state=>state.errors);

  return (
    <Container>
      {errors.loginMessage && (
        <h2 className="alert" role="alert">
          {errors.loginMessage}
        </h2>
      )}
      {errors.registrationMessage && (
        <h2 className="alert" role="alert">
          {errors.registrationMessage}
        </h2>
      )}
    </Container>
  )
}