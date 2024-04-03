import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { decodeToken } from 'react-jwt'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Layout from '../Layout'

const AccountActivate = () => {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        name: '',
        token: '',
        loading: false,
    });

    let { token } = useParams();

    useEffect(() => {
        let { name } = decodeToken(token);
        // console.log(token);
        // console.log(name);
        if (token) {
            setValues({ ...values, name, token });
        }
    }, [token])

    const clickSubmit = async (e) => {
        e.preventDefault();
        setValues({ ...values, loading: true })
        const dataToSend = { token: values.token }
        await axios({
            method: 'POST',
            url: `${import.meta.env.VITE_BACKEND_ENDPOINT}/account-activation`,
            data: dataToSend
        }).then(response => {
            console.log('ACCOUNT ACTIVATION SUCCESS', response);
            setValues({ ...values, name: '' });
            toast.success(`${response.data.message}`);
        }).catch(err => {
            console.log('ACCOUNT ACTIVATION ERROR', err.response.data);
            toast.error(err.response.data.error);
        });
    }

    const activationLink = () => (
        <div className='text-center flex justify-center'>
            <h1 className='my-12'>
                Hey {values.name}, Ready to activate your account
                <hr className='my-8 w-full' />
                <button className='btn btn-outline btn-success'
                    onClick={clickSubmit}
                >Activate Account
                </button>
            </h1>
        </div>
    )

    return (
        <Layout>
            <ToastContainer />
            <div className='text-2xl'>
                {activationLink()}
            </div>
        </Layout>
    )
}

export default AccountActivate