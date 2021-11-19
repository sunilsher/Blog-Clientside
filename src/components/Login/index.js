import React, {useState, useEffect} from 'react'
import {TextField, Button, Alert} from '@mui/material';
import {useDispatch, useSelector} from 'react-redux'
import './style.css';
import { clearStatus, loginUserAction } from '../../store/slices/authSlice';
import { Spinner } from 'react-bootstrap';
import toast from 'react-hot-toast';
import Status from '../../constants/status';
import {useNavigate} from 'react-router-dom'

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {status, error, isLoggedIn} = useSelector(state=>state.auth)

    const reset = () => {
        setErrors([]);
        setEmail('');
        setPassword('');
    }

    const handleSubmit = () => {
        const error = []
        if(email === ''){
            error.push('Email is required.');
        }
        if(password === ''){
            error.push('Password cannot be empty.');
        }

        if(error.length > 0){
            setErrors(error);
            return;
        }else {
            const payload = {
                email,
                password
            };
            dispatch(loginUserAction(payload));
        }
    }

    useEffect(()=>{
        if(status === Status.ERROR){
            toast.error(error || 'Something went wrong.');
        } else if(status===Status.SUCCESS){
            toast.success('Logged in successfully.');
            reset();
            dispatch(clearStatus());
            navigate('/');
        }
    }, [status])

    useEffect(()=>{
        if(isLoggedIn){
            navigate('/');
        }
    }, [isLoggedIn])

    return (
        <div id="register">
            <div className='register-container'>
                {errors.length > 0 && errors.map(err=><Alert severity="error">{err}</Alert>)}
                <h3>Login</h3>
                <TextField value={email} type="email" className="form-input" label="Email" onChange={(e)=>setEmail(e.target.value)} fullWidth variant="outlined" />
                <TextField value={password} type="password" className="form-input" fullWidth label="Password" onChange={(e)=>setPassword(e.target.value)} variant="outlined" />
                <Button type="submit" onClick= {handleSubmit} variant="contained" color="primary">{
                    status===Status.PENDING ? <Spinner size='sm' animation='border' /> : 'Login'
                }</Button>
            </div>
        </div>
    )
}
