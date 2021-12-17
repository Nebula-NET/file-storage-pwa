import React, {useState, useEffect} from 'react';
import './App.scss';
import { ConfigProvider} from 'antd'
import {useSelector, shallowEqual} from 'react-redux'
import {Redirect, Route, Switch} from 'react-router-dom'

import 'antd/dist/antd.variable.min.css';
import Intro from './pages/intro/Intro';
import Login from './pages/auth/login/Login';
import Verify from './pages/auth/verify/Verify';


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
                  if(token){

                  }else{
                    return <Redirect to={'/intro'} />
                  }
                  
              }} />
              <Route exact path={'/intro'} component={Intro} />
              <Route exact path={'/auth/login'} component={Login} />  
              <Route exact path={'/auth/verify'} component={Verify} />  

          </Switch>
      </ConfigProvider>
    </div>
  );
}

export default App;
