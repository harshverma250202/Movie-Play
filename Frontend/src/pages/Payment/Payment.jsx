import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import './font.css';
import visa from './visa.png'
import diner from './diner.jpg'
import mastercard from './MASTERCARD.png'
import formatString from './formatstring';
// import classes from './App.module.css'
import baseApi from '../../api/baseApi'
import { useLocation } from 'react-router-dom';
import './Payment.css'
import { Link } from 'react-router-dom';
import { BACKEND_URL } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { paymentApi } from '../../api/paymentsApi';
import { useNavigate } from 'react-router-dom'
import { UpdateUserInfo } from '../../store/slices/AuthSlice'
const fonts = {
    fontFamily: 'f1',
};
let inp = '', INP = '';
let z = 10;
const baseURL = BACKEND_URL;

function Payment() {

    const location = useLocation();
    const selectedPart = location?.state?.selectedPart;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userId = useSelector(state => state.auth?.user?._id)
    const [fafa, FAFA] = useState(false);
    const [wait, WAIT] = useState(false);
    const [cn, scn] = useState(''); const [sce, ssce] = useState(false);
    const [showCardError, setShowCardError] = useState(false);
    const [sde, ssde] = useState(false);
    const [showdateError, setShowDateError] = useState(false);
    const [de, DE] = useState(false);
    const [cn1, scn1] = useState(''); const [cvv, CVV] = useState(false);
    const [showcvv, SHOWCVV] = useState(false);
    const [cn4, scn4] = useState(''); const [nam, NAM] = useState(false);
    const [agree, AGREE] = useState(false);
    const [input, sinput] = useState('');


    const handleInputChange = (event) => {
        const valu = event.target.value.replace(/[^0-9]/g, '');
        if (valu.length <= 16) {
            scn(valu);
            setShowCardError(false);
            ssce(false);
        }
    };
    const handleInput = (event) => {
        const val = event.target.value.replace(/[^0-9]/g, '');
        if (val.length <= 3) {
            scn1(val);
            CVV(false);
            SHOWCVV(false);
        }
    };
    const handleChange = (event) => {
        const value = event.target.value.replace(/[^a-zA-z ]/g, '');
        scn4(value);
        if (value.length !== 0) NAM(false);
    };


    const Agree = (event) => {
        AGREE(event.target.checked);
        if (agree) { z = 1; }
        else { z = 0; }
    };
    const handlePayment = () => {
        baseApi.post(`users/${userId}/transactions`, {
            cardNumber: cn,
            cvv: cn1,
            expiryDate: input,
            subscription: selectedPart?._id,
            name: cn4
        }).then((response) => {
            navigate('/profile', { replace: true })
            dispatch(UpdateUserInfo());
        }).catch((error) => {
            navigate('/', { replace: true })
        });

    }
    return (
        <div className='headerofpayment' style={fonts}>
            <hr margin="auto" className='lineofpayment' />
            <div className='headofpayment'>
                {/* <p className='aofpayment'>STEP 4 OF 4</p> */}
                <p className='setupofpayment' >Enter your card credentials</p>
                <b><p className='errorofpayment'></p></b>
                <span className='cardofpayment'>&#x1F4B3;</span>
                <TextField label="Card Number" variant="filled"
                    helperText={showCardError ? "*Please enter a card number" : null ||
                        sce ? "*Please enter a valid card number" : null}
                    className='detailsofpayment' id='f1ofpayment' value={cn}
                    onChange={handleInputChange} FormHelperTextProps={{ style: { color: 'red' } }}
                    // required
                    style={{ width: "445px", margin: "-30px 25px 11px 25px" }}
                />
                {/* {showCardError && <p className='errorofpayment' id="e1ofpayment"><b>*Please enter a card number</b></p>} */}
                {/* {sce && <p className='errorofpayment' id="e2ofpayment"><b>*Please enter a valid card number</b></p>} */}
                <TextField label="Expiration Date" variant="filled" maxLength={5}
                    placeholder="MM/YY" type="text" onKeyUp={(event) => formatString(event, ssde, setShowDateError, DE, sinput)}
                    helperText={sde ? "*Please enter a valid expiration date" : null ||
                        showdateError ? "*Expiration Year must be between 2024 and 2049." : null || de ? "The expiry date you entered is in the past" : null}
                    FormHelperTextProps={{ style: { color: 'red' } }} className='detailsofpayment'
                    style={{
                        width: "215px",
                        margin: "11px 10px 11px 24px"
                    }} />
                {/* <a className="qofpayment" >?</a> */}
                <TextField label="CVV" variant="filled"
                    // required
                    helperText={cvv ? "*Please enter CVV" : null || showcvv ? "*Please enter a valid CVV" : null}
                    FormHelperTextProps={{ style: { color: 'red' } }}
                    className='detailsofpayment' id='f3ofpayment' value={cn1}
                    onChange={handleInput} style={{
                        width: "215px",
                        margin: "11px 10px 11px 6px"
                    }} />
                {/* <a href="h.php" className='ringofpayment'>&#x25EF;</a> */}
                {/* {sde&&<a className='errorofpayment' id="e3" ><b>*Please enter an expiration date</b></a>} */}
                {/* <a className='errorofpayment' id='e4'><b>*Please enter CVV</b></a> */}

                <TextField label="Name on card" variant="filled" className='detailsofpayment' id='f4ofpayment'
                    InputLabelProps={{ style: { height: "95px" } }} onChange={handleChange} value={cn4}
                    style={{ width: "445px", margin: "11px 25px" }} helperText={nam ? "*Name is required" : null}
                    FormHelperTextProps={{ style: { color: 'red' } }}
                // required
                />
                {/* {nam&&<p className='error'><b>*Name is required</b></p>} */}
                <div className='subcriptionofpayment'>
                    <a id='sub1ofpayment' className='subofpayment'><b> ₹ {selectedPart?.price} </b></a>
                    <button type="submit" className='subofpayment' id='sub2ofpayment' ><b >
                        <Link to='/subscription' className='changeofofferofpayment'
                            style={{ color: "blue", textDecoration: "none" }}> Change </Link>
                    </b>
                    </button>
                    <p id='sub3ofpayment' className='subofpayment'><b>{selectedPart?.name}</b></p>
                </div>
                <div className='agreeofpayment'><input type="checkbox" className='checkofpayment' id='checkofpayment' onChange={Agree} /><label
                    for="check" className='checkofpayment'>I agree to terms and conditions</label>
                    {(z === 1) && <p id='check1ofpayment' >You must acknowledge that you have read
                        and agree to the Terms of Use to continue.</p>}</div>
                     <form onSubmit={valid}  >
                <button
                    type='submit'
                    className='membershipofpayment'
                    
                ><strong>Start Membership</strong></button></form> 
                {wait && <div class="loader" />}{wait && <a style=
                    {{
                        fontSize: "25px", fontWeight: "600"
                        , position: "relative", bottom: "10px", color: "#3498db"
                    }}
                >Your request is being processed</a>}
                {fafa && <p style={{ fontSize: "30px", color: "green", margin: "10px 30px 10px 20px" }} className="facircleofpayment">&#x2705; Successfully registered!</p>}

            </div>
        </div>
    );
    function valid(event) {
        event.preventDefault();
        inp = input.slice(-2);
        console.log(inp);
        INP = input.slice(0, 2);
        // console.log(parseInt(INP));
    
        
        
        if(cn.length === 16 && cn1.length === 3 && cn4.length !== 0 && z === 0 && input.length === 5 && inp > 24 && inp <=49) {
            // event.target.submit();
            console.log("Hello");
            WAIT(true);
            setTimeout(() => {
                WAIT(false);
                FAFA(true);
                handlePayment();
            }, 2000);
            
           
        }
        else if (cn.length === 16 && cn1.length === 3 && cn4.length !== 0 && z === 0 && input.length === 5 && inp == 24 && parseInt(INP)>3) {
            // event.target.submit();
            WAIT(true);
            setTimeout(() => {
                WAIT(false);
                FAFA(true);
                handlePayment();
            }, 2000);
            
        }
        else {
            console.log(cn.length);console.log(cn1.length);console.log(cn4.length);console.log(z);console.log(input.length);console.log(inp);
            if (z != 0) z = 1;
            if (cn.length === 0) { setShowCardError(true); }
            else if (cn.length < 16) { ssce(true); }
            if (cn1.length === 0) CVV(true);
            else if (cn1.length < 3) SHOWCVV(true);
            else { CVV(false); SHOWCVV(false); }
            if (cn4.length === 0) NAM(true);
            else NAM(false);
            if (input.length <= 4) { ssde(true); setShowDateError(false); DE(false); }
            else if (input.length == 5) {
                if (inp < 24 || inp > 49) { ssde(false); setShowDateError(true); DE(false); }
                else if (inp == 24 && parseInt(INP) < 4) { ssde(false); setShowDateError(false); DE(true); }
    
            }
        }
    }

}


export default Payment;
