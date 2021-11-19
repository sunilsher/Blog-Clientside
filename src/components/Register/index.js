import React, {useState, useEffect} from 'react'
import {TextField, Button, Alert} from '@mui/material';
import {useDispatch, useSelector} from 'react-redux'
import './style.css';
import { registerUserAction, clearStatus } from '../../store/slices/authSlice';
import {useNavigate} from 'react-router-dom'
import Status from '../../constants/status';
import { Spinner, Form } from 'react-bootstrap';
import {toast} from 'react-hot-toast';
export default function Register() {
    let navigate = useNavigate();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [photo, setPhoto] = useState('');
    const [errors, setErrors] = useState([]);

    const dispatch = useDispatch();
    const {status, error, isLoggedIn} = useSelector(state=>state.auth)

    const reset = () => {
        setErrors([]);
        setLastName('');
        setFirstName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const error = []
        if(email === ''){
            error.push('Email is required');
        }
        if(password !== confirmPassword){
            error.push('Password didn\'t match');
        }

        if(error.length > 0){
            setErrors(error);
            return;
        }else {
            const payload = new FormData();
            payload.append('email', email);
            payload.append('firstname', firstName);
            payload.append('lastname', lastName);
            payload.append('password', password);
            payload.append('photo', photo)
            dispatch(registerUserAction(payload));
        }
    }

    useEffect(()=>{
        if(status === Status.ERROR){
            toast.error(error || 'Something went wrong.');
        } else if(status===Status.SUCCESS){
            toast.success('User registered successfully.');
            reset();
            dispatch(clearStatus());
            navigate('/login');
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
                <Form onSubmit={handleSubmit} encType='multipart/form-data'>
                    <h3>Register</h3>
                    <TextField value={firstName} className="form-input" label="First Name" onChange={(e)=>setFirstName(e.target.value)} fullWidth variant="outlined" />
                    <TextField value={lastName} className="form-input" label="Last Name" onChange={(e)=>setLastName(e.target.value)} fullWidth variant="outlined" />
                    <TextField value={email} type="email" className="form-input" label="Email" onChange={(e)=>setEmail(e.target.value)} fullWidth variant="outlined" />
                    <TextField value={password} type="password" className="form-input" fullWidth label="Password" onChange={(e)=>setPassword(e.target.value)} variant="outlined" />
                    <TextField value={confirmPassword} type="password" className="form-input" fullWidth label="Confirm Password" onChange={(e)=>setConfirmPassword(e.target.value)} variant="outlined" />  
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Upload Profile Picture</Form.Label>
                        <Form.Control onChange={(e)=>setPhoto(e.target.files[0])} type="file" name='photo'/>
                    </Form.Group>
                    <Button type="submit" variant="contained" color="primary">{
                        status===Status.PENDING ? <Spinner size='sm' animation='border' /> : 'Register'
                    }</Button>
                </Form>
            </div>
        </div>
    )
}
