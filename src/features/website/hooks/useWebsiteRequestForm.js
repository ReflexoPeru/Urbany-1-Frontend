import { useState } from 'react';
import { websiteService } from '../services';

const INITIAL_VALUES = {
    name: '',
    email: '',
    phone: '',
    message: ''
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const useWebsiteRequestForm = () => {
    const [values, setValues] = useState(INITIAL_VALUES);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState('idle');

    const handleFieldChange = (field) => (event) => {
        const { value } = event.target;
        setValues((prev) => ({
            ...prev,
            [field]: value
        }));
    };

    const resetForm = () => {
        setValues(INITIAL_VALUES);
        setErrors({});
        setStatus('idle');
    };

    const validate = () => {
        const newErrors = {};

        if (!values.name.trim()) {
            newErrors.name = 'Ingresa tu nombre completo.';
        }

        if (!values.email.trim()) {
            newErrors.email = 'Ingresa un correo electrónico.';
        } else if (!emailRegex.test(values.email)) {
            newErrors.email = 'Ingresa un correo válido.';
        }

        if (!values.phone.trim()) {
            newErrors.phone = 'Ingresa un número de contacto.';
        }

        if (!values.message.trim()) {
            newErrors.message = 'Cuéntanos qué necesitas.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validate()) {
            return false;
        }

        setIsSubmitting(true);
        setStatus('loading');

        try {
            await websiteService.requestWebsite(values);
            setStatus('success');
            return true;
        } catch (error) {
            setStatus('error');
            return false;
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        values,
        errors,
        isSubmitting,
        status,
        handleFieldChange,
        handleSubmit,
        resetForm
    };
};

export default useWebsiteRequestForm;














