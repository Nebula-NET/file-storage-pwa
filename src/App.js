import React, {useState, useEffect} from 'react';
import './App.scss';
import { ConfigProvider} from 'antd'
import {useSelector, shallowEqual} from 'react-redux'
import {Redirect, Route, Switch} from 'react-router-dom'

import 'antd/dist/antd.variable.min.css';

import Intro from './pages/intro/Intro';
import Login from './pages/auth/login/Login';
import Verify from './pages/auth/verify/Verify';
import Connect from './pages/auth/connect/Connect';


function App() {

  const direction = useSelector(state => state.Setting.direction, shallowEqual)

  useEffect(()=>{
    ConfigProvider.config({
      theme:{
        primaryColor: '#167BD8',
      },
    })
  },[])


  return (
    <div className="App">
      <ConfigProvider direction={direction} >
          <Switch>

              <Route exact path={'/'} component={()=>{
                  const token = localStorage.getItem('access_token');
                  const publickey = localStorage.getItem('publickey');
                  if(!publickey){

                  }else if(token){
                    return <Redirect to={'/auth/connect'} />
                  }else{
                    return <Redirect to={'/intro'} />
                  }
                  
              }} />
              <Route exact path={'/intro'} component={Intro} />
              <Route exact path={'/auth/login'} component={Login} />  
              <Route exact path={'/auth/verify'} component={Verify} />  
              <Route exact path={'/auth/connect'} component={Connect} />  

          </Switch>
      </ConfigProvider>
    </div>
  );
}

export default App;
