import React from 'react';
import {useSelector} from 'react-redux';

export default function LoginErrorBar() {

  let errors = useSelector(state=>state.errors);

  return (
    <div>
      {errors.registrationMessage && (
        <h2 className="alert" role="alert">
          {errors.registrationMessage}
        </h2>
      )}
    </div>
  )
}