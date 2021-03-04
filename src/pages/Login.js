import React, { useState, useEffect } from 'react';
import {
    CButton,
    CCard,
    CCardBody,
    CCardGroup,
    CCol,
    CContainer,
    CForm,
    CInput,
    CInputGroup,
    CInputGroupPrepend,
    CInputGroupText,
    CRow,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import '../../src/styles/admin.scss';
import { icons } from '../../src/assets/icons';
import { login, auth } from '../http/api';
import { Redirect } from 'react-router-dom';

React.icons = icons;

const loading = (
    <div className="pt-3 text-center">
        <div className="sk-spinner sk-spinner-pulse"></div>
    </div>
);

const Login = () => {
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState();
    useEffect(() => {
        auth().then(({ data }) => setIsLoggedIn(!!data.auth));
    }, []);

    async function handleClick() {
        const { data } = await login({ password });
        if (data.success) {
            window.location.href = '/dashboard';
        }
    }

    if (isLoggedIn === true) {
        return <Redirect to="/dashboard" />;
    }

    if (isLoggedIn === false) {
        return (
            <div className="c-app c-default-layout flex-row align-items-center">
                <CContainer>
                    <CRow className="justify-content-center">
                        <CCol md="8">
                            <CCardGroup>
                                <CCard className="p-4">
                                    <CCardBody>
                                        <CForm>
                                            <h1>Login</h1>
                                            <p className="text-muted">Sign In to your account</p>
                                            <CInputGroup className="mb-3">
                                                <CInputGroupPrepend>
                                                    <CInputGroupText>
                                                        <CIcon name="cil-user" />
                                                    </CInputGroupText>
                                                </CInputGroupPrepend>
                                                <CInput
                                                    type="text"
                                                    value="steve@simplyphp.com"
                                                    placeholder="Username"
                                                    autoComplete="username"
                                                    disabled
                                                />
                                            </CInputGroup>
                                            <CInputGroup className="mb-4">
                                                <CInputGroupPrepend>
                                                    <CInputGroupText>
                                                        <CIcon name="cil-lock-locked" />
                                                    </CInputGroupText>
                                                </CInputGroupPrepend>
                                                <CInput
                                                    type="password"
                                                    placeholder="Password"
                                                    autoComplete="current-password"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                />
                                            </CInputGroup>
                                            <CRow>
                                                <CCol xs="6">
                                                    <CButton color="primary" className="px-4" onClick={handleClick}>
                                                        Login
                                                    </CButton>
                                                </CCol>
                                                <CCol xs="6" className="text-right">
                                                    <CButton color="link" className="px-0">
                                                        Forgot password?
                                                    </CButton>
                                                </CCol>
                                            </CRow>
                                        </CForm>
                                    </CCardBody>
                                </CCard>
                            </CCardGroup>
                        </CCol>
                    </CRow>
                </CContainer>
            </div>
        );
    }

    return (
        <main className="c-main">
            <CContainer fluid>{loading}</CContainer>
        </main>
    );
};

export default Login;
