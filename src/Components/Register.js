import React, { useState } from 'react';
import { register } from '../store';
import { useDispatch } from 'react-redux';
import { useNavigate} from 'react-router-dom';

const Register = ()=> {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  const onChange = ev => {
    setCredentials({...credentials, [ ev.target.name ]: ev.target.value });
  };

  const _register = async(ev) => {
    ev.preventDefault();
    try {
      await dispatch(register(credentials));
      navigate('/');

    }
    catch(ex) {
      console.log(ex);
    }
  }
  return (
    <div>
      {/* if url = '/' return login if not return Register */}
      <h2>Register</h2>
      <form onSubmit={ _register }>
        <input
          placeholder='username'
          value = { credentials.username }
          name = 'username'
          onChange = { onChange }
          />
        <input
          placeholder='password'
          name = 'password'
          value={ credentials.password }
          onChange = { onChange }
        />
        <button>Register</button>
      </form>
    </div>

  );
};

export default Register;
