import React, {useState, useEffect} from 'react';
import './App.scss';
import { ConfigProvider} from 'antd'
import {useSelector, shallowEqual} from 'react-redux'
import {Route, Switch} from 'react-router-dom'

import 'antd/dist/antd.variable.min.css';


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
        
      </ConfigProvider>
    </div>
  );
}

export default App;
