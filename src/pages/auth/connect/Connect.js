import React, {useEffect, useState} from 'react';
import './Connect.scss';
import {Row, Col, Typography, Button} from 'antd';
import {useSelector, shallowEqual, useDispatch} from 'react-redux';
import {languages} from '../../../languages/languages'
import {useHistory, useLocation} from 'react-router-dom'
import QRCodeModal from "@walletconnect/qrcode-modal";
import { HandleErrors } from '../../../utils/HandleErrors';
import { AuthService } from '../../../services/authService';
import { Wallet } from '../../../utils/connectWallet';
import { FileStorageService } from '../../../services/fileStorageService';
import { SET_USER_INFO } from '../../../redux/actions/types';
import WalletConnectClient, {CLIENT_EVENTS} from "@walletconnect/client";

const {Text} = Typography;


function Connect(props){
    const history = useHistory()
    const location = useLocation()
    const dispatch = useDispatch()
    const lang = useSelector(state => state.Setting.language, shallowEqual);

    const [loading, setLoading] = useState(false)
    // const [connector,setConnector] = useState();

    const connect = async () => {
        // if(loading) return

        // const idn = localStorage.getItem('idn')
        // const wallet = new Wallet;
        // const authService = new AuthService();
        // const fileStorageService = new FileStorageService()

        // //setLoading(true)
        // try {
        //     const publickey = await wallet.getAccount().then(result => result.account);
        //     const challenge = await authService.getChallenge({publickey: publickey}).then(result => result.data.data.challenge);

        //     let signResult = await wallet.signData(challenge);
        //     if(signResult.action == 'cancele'){
        //         setLoading(false);
        //         return;  
        //     }
        //     const signature = signResult.signature;
        //     let data = {
        //         type: 'challenge',
        //         publickey: publickey,
        //         signature: signature
        //     }
        //     let loginResult = await authService.login(data).then(result => result.data.data);;

        //     console.log(loginResult);

            /* localStorage.setItem('publickey', result.publickey)
            result = await fileStorageService.getUserData(result.publickey).then(result => result.data.data);

            dispatch({
                type: SET_USER_INFO,
                payload: result
            })
            setLoading(false);
            history.replace('/home')  */
        // } catch (error) {
        //     console.log(error);
        //     setLoading(false);
        //     HandleErrors(error)
        // }

        // Create a connector

        const client = await WalletConnectClient.init({
            projectId: "20051ec2a92c4b0bda2b78cb095a666b",
          });


          client.on(
            CLIENT_EVENTS.pairing.proposal,
            async (proposal) => {
              const { uri } = proposal.signal.params;
              
              console.log("EVENT", "QR Code Modal open");
              QRCodeModal.open(uri, () => {
                console.log("EVENT", "QR Code Modal closed");
              });
            },
          );
      
          client.on(CLIENT_EVENTS.pairing.created, async (proposal) => {
            if (typeof client === "undefined") return;
            
          });
      
          client.on(CLIENT_EVENTS.session.deleted, (session) => {
            
            console.log("EVENT", "session_deleted");
            // this.resetApp();
          });

         

          const session = await client.connect({
            permissions: {
              blockchain: {
                chains: ["eip155:1"],
              },
              jsonrpc: {
                methods: ["eth_sendTransaction", "personal_sign", "eth_signTypedData"],
              },
            },
          });
          console.log(client)

    }

    return(
        <div className='Connect'>
            <div className='header-box'>
                {/* <Row>
                    <Col className='back-icon-box' onClick={()=>{history.replace('/auth/login')}}>
                        <i className="las la-arrow-right icon"></i>
                    </Col>
                </Row> */}
                <Row justify='start'  align='middle' className='title-box'>
                    <Col xs={{span: 3 }}>
                        <img className='image' src={'/assets/images/logo-2.svg'} />
                    </Col>
                    <Col xs={{offset: 1}}>
                        <Text className='title'>{languages.connect_to_wallet[lang]}</Text>
                    </Col>
                </Row> 
                <Row justify='center'>
                    <Col xs={{span: 22}} className='desc-box'>
                        <Text className='desc'>{languages.connect_to_wallet_desc[lang]}</Text>
                    </Col>
                </Row>
            </div>
            <div className='content-box'>
                
                <Row justify='center'>
                    <Col xs={{span: 20}} className='image-box'> 
                        <img src={'/assets/images/connect.svg'} className='image' />
                    </Col>
                </Row>
                <Row justify='center' >
                    <Col xs={{span: 20}} className='btn-box'>
                        <Button loading={loading} onClick={connect} className='btn' type='primary' block>{languages.connect[lang]}</Button>
                    </Col>
                </Row>

            </div>
        </div>
    )
}


export default Connect;