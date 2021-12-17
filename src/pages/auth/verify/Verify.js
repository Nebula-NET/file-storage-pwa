import React, {useState, useEffect} from 'react';
import './Verify.scss';
import {Row, Col , Typography, Input, Button, message} from 'antd';
import {useSelector, shallowEqual} from 'react-redux';
import {languages} from '../../../languages/languages'
import {useHistory, useLocation} from 'react-router-dom'
import { HandleErrors } from '../../../utils/HandleErrors';
import { AuthService } from '../../../services/authService';

const {Text} = Typography;

function Verify(props){
    const history = useHistory()
    const location = useLocation()
    const lang = useSelector(state => state.Setting.language, shallowEqual);

    const [loading, setLoading] = useState(false);
    const [code, setCode] = useState('')

    const [expTimeS , setExpTimeS] = useState(0);
    const [expTimeM , setExpTimeM] = useState(2);
    const [activeInterval , setActiveInterval] = useState(true);


    useEffect(()=>{
        let interval = null;
        if(expTimeS===0){
            if(expTimeM!=0){
                setExpTimeM(expTimeM-1);
                setExpTimeS(59)
            }else {
                setActiveInterval(false);
                history.replace('/auth/login')
            }
        }
        if(activeInterval){
            interval = setInterval(()=>{
                setExpTimeS(expTimeS=>expTimeS-1)
            } ,1000)
        }
        return ()=>{clearInterval(interval)}
    });

    useEffect(()=>{
        if(!location.state){
            history.replace('/auth/login')
        }
    }, [])


    const submit = async () =>{
        if(loading) return;

        if(!code){
            message.error(languages.enter_verify_code[lang]);
            return;
        }
        const authService = new AuthService()
        setLoading(true)
        try {
            const data = {
                email: location.state.email,
                otp_code: code
            }
            const result = await authService.login(data).then(result => result.data.data)
            localStorage.setItem('access_token', result.access_token);
            localStorage.setItem('idn', result.email);
            setLoading(false)
        } catch (error) {
            setLoading(false)
            HandleErrors(error)
        }

    }

    return(
        <div className='Verify'>
            <div className='header-box'>
                <Row>
                    <Col className='back-icon-box' onClick={()=>{history.goBack()}}>
                        <i className="las la-arrow-right icon"></i>
                    </Col>
                </Row>
                <Row justify='start'  align='middle' className='title-box'>
                    <Col xs={{span: 3 }}>
                        <img className='image' src={'/assets/images/logo-2.svg'} />
                    </Col>
                    <Col xs={{offset: 1}}>
                        <Text className='title'>{languages.verify_code[lang]}</Text>
                    </Col>
                </Row> 
                <Row justify='center'>
                    <Col xs={{span: 22}} className='desc-box'>
                        <Text className='desc'>{languages.verify_code_desc[lang]}</Text>
                    </Col>
                </Row>
            </div>
            <div className='content-box'>
                
                <div className='input-container'>
                    <Row align='middle'>
                        <Col className='icon-box'>
                            <i class="las la-envelope-open icon"></i>
                        </Col>
                        <Col xs={{offset: 0}} className='title-box'>
                            <Text className='title'>{languages.verify_code[lang]}</Text>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={{span: 24}}  className='input-box'>
                            <Input value={code} onChange={(e)=>{setCode(e.target.value)}} placeholder={languages.enter_verify_code[lang]} className='input' />
                        </Col>
                    </Row>
                </div>
                <Row justify='center' >
                    <Col xs={{span: 20}} className='counter-box'>
                        <i className="las la-stopwatch icon"></i>
                        <Text className={'time'}>{expTimeM < 10 ? '0'+expTimeM : expTimeM}:{expTimeS < 10 ? '0'+expTimeS : expTimeS}</Text>
                    </Col>
                </Row>
                <Row justify='center' >
                    <Col xs={{span: 20}} className='btn-box'>
                        <Button loading={loading} onClick={submit} className='btn' type='primary' block>{languages.submit[lang]}</Button>
                    </Col>
                </Row>

            </div>
        </div>
    )
}



export default Verify;