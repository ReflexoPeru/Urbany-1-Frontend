import React from "react";
import AuthHeader from "../../common/AuthHeader/AuthHeader";

const RegisterHeader = () => {
    return (
        <AuthHeader
            title="Registro de usuario"
            subtitle="¡Nos alegramos verte aquí! Añade la información de tu inmobilaria para comenzar a utilizar CRM urbany."
            showWelcome={true}
        />
    )
}

export default RegisterHeader;