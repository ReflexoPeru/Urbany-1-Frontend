import React from "react";
import AuthHeader from "../../common/AuthHeader/AuthHeader";

const RegisterHeaderInmobiliaria = () => {
    return (
        <AuthHeader
            title="Registro de Inmobiliaria"
            subtitle="¡Nos alegramos verte aquí! Añade la información de tu inmobilaria para comenzar a utilizar CRM urbany."
            showWelcome={true}
        />
    )
}

export default RegisterHeaderInmobiliaria;