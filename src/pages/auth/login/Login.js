import React, {useState, useEffect} from 'react';
import './Login.scss';
import {Row, Col , Typography, Input, Button, message} from 'antd';
import {useSelector, shallowEqual} from 'react-redux';
import {languages} from './../../../languages/languages'
import {useHistory} from 'react-router-dom'
import { AuthService } from '../../../services/authService';
import { HandleErrors } from '../../../utils/HandleErrors';

const {Text} = Typography;

function Login(props){
    const history = useHistory()
    const lang = useSelector(state => state.Setting.language, shallowEqual);

    const [loading, setLoading] = useState(false);

    const [email, setEmail] = useState('')

    const login = async ()=>{
        if(loading) return;
        if(!email){
            message.error(languages.enter_email[lang])
            return
        }
        setLoading(true)
        const authService = new AuthService();
        try {
            const data = {
                email: email
            }
            await authService.sentOpt(data)
            setLoading(false)
            history.push('/auth/verify', {email: email})
        } catch (error) {
            setLoading(false);
            HandleErrors(error)
        }
    }


    return(
        <div className='Login'>
            <div className='header-box'>
                <Row justify='start'  align='middle'>
                    <Col xs={{span: 3 }}>
                        <img className='image' src={'/assets/images/logo-2.svg'} />
                    </Col>
                    <Col xs={{offset: 1}}>
                        <Text className='title'>{languages.login[lang]}</Text>
                    </Col>
                </Row> 
                <Row justify='center'>
                    <Col xs={{span: 22}} className='desc-box'>
                        <Text className='desc'>{languages.login_desc[lang]}</Text>
                    </Col>
                </Row>
            </div>
            <div className='content-box'>
                
                <div className='input-container'>
                    <Row align='middle'>
                        <Col className='icon-box'>
                            <i className="las la-envelope icon"></i>
                        </Col>
                        <Col xs={{offset: 0}} className='title-box'>
                            <Text className='title'>{languages.email[lang]}</Text>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={{span: 24}}  className='input-box'>
                            <Input value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder={languages.enter_email[lang]} className='input' />
                        </Col>
                    </Row>
                </div>

                <Row justify='center' >
                    <Col xs={{span: 20}} className='btn-box'>
                        <Button loading={loading} onClick={login} className='btn' type='primary' block>{languages.login[lang]}</Button>
                    </Col>
                </Row>

            </div>
        </div>
    )
}



export default Login;