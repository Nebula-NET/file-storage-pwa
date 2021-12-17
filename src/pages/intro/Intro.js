import React, {useState, useEffect} from 'react';
import './Intro.scss';
import {Row , Col, Typography, Button} from 'antd';
import {languages} from './../../languages/languages';
import {shallowEqual, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom'
const {Text} = Typography;


function Intro(props){
    const history = useHistory()

    const lang = useSelector(state => state.Setting.language, shallowEqual);
    const [step, setStep] = useState(1);


    const handleNext = () =>{
        if(step === 1){
            setStep(2)
        }else if(step === 2){
            setStep(3)
        }else{
            history.replace('/auth/register')
        }
    }

    return(
        <div className='Intro'>
            <Row className='image-box' justify='center'>
                <Col xs={{span: 20}}>
                    <img src={`/assets/images/intro-${step}.svg`} className='image' />
                </Col>
            </Row>
            <div className='content-box'>
                <Row justify='center' >
                    <Col className='title-box' xs={{span: 20}}>
                        {step === 1 && <Text className='title'>{languages.intro_title_1[lang]}</Text>}
                        {step === 2 && <Text className='title'>{languages.intro_title_2[lang]}</Text>}
                        {step === 3 && <Text className='title'>{languages.intro_title_3[lang]}</Text>}
                    </Col>
                </Row>
                <Row justify='center' className='title-box'>
                    <Col className='desc-box' xs={{span: 20}}>
                        {step === 1 && <Text className='desc'>{languages.intro_desc_1[lang]}</Text>}
                        {step === 2 && <Text className='desc'>{languages.intro_desc_2[lang]}</Text>}
                        {step === 3 && <Text className='desc'>{languages.intro_desc_3[lang]}</Text>}
                    </Col>
                </Row>
                <Row justify='center' className='dot-box'>
                    <div className={`dot ${step === 1 ? 'active' : ''}`}></div>
                    <div className={`dot ${step === 2 ? 'active' : ''}`}></div>
                    <div className={`dot ${step === 3 ? 'active' : ''}`}></div>
                </Row>

                <Row justify='center'  className='btn-box'>
                    <Col  xs={{span: 20}}>
                        <Button onClick={handleNext} className='btn' type='primary' block>{step === 3 ? languages.get_started[lang] : languages.continue[lang]}</Button>
                    </Col>
                </Row>
            </div>
        </div>
    )
}


export default Intro