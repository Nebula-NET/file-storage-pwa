import React, {useState, useEffect} from 'react';
import './Home.scss';
import {Row, Col, Typography, Input, Progress} from 'antd';
import {useSelector, shallowEqual} from 'react-redux'
import { languages } from '../../languages/languages';


const {Text} = Typography;

function Home(props){

    const publickey = useSelector(state => state.User.publickey, shallowEqual);
    const lang = useSelector(state => state.Setting.language, shallowEqual);


    return(
        <div className='Home'>
            <Row justify='space-between' className='header-box' align='middle'>
                <Col className='account-box'>
                    <i className="las la-wallet icon"></i>
                    <Text className='publickey'>{publickey.substr(0, 7)}......{publickey.substr(-7)}</Text>    
                </Col>
                <Col className='icon-box'>
                    <i className="las la-user icon"></i>
                </Col>
            </Row>

            <Row justify='center' className='search-box' align='middle'>
                <Col xs={{span: 20}} className='input-box'>
                    <Input className='input' placeholder={languages.seach_file[lang]} />
                </Col>
                <Col className='icon-box'>
                    <i className="las la-search icon"></i>
                </Col>
            </Row>

            <Row justify='center'>
                <Col xs={{span: 20}} className='image-box'>
                    <img src={'/assets/images/sd-card.svg'} className='image' />
                    <div className='chart-box'>
                        <Progress className='chart' type="circle" percent={70} strokeColor={'#16D76F'}  />
                    </div>
                    <div className='info-box'>
                        <Text className='title'>{languages.internal_storage[lang]}</Text>
                        <Text className='value'><span dir='ltr' style={{margin: '0 3px'}}>38GB </span> {languages.available[lang]}</Text>
                    </div>
                </Col>
            </Row>

        </div>
    )
}


export default Home;