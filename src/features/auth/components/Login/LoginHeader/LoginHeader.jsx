import React from 'react';
import AuthHeader from '../../common/AuthHeader/AuthHeader';

const LoginHeader = () => {
    return (
        <AuthHeader
            title="Inicio de Sesión"
            subtitle="Inicia sesión para entrar al sistema"
            showWelcome={true}
        />
    );
};

export default LoginHeader;