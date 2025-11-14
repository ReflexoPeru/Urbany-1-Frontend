import { useState, useMemo } from 'react';
import { helpService } from '../services';

const INITIAL_VALUES = {
    message: '',
    copyEmail: '',
    attachment: null
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const useSupportRequestForm = () => {
    const [values, setValues] = useState(INITIAL_VALUES);
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState('idle');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const hasAttachment = useMemo(() => Boolean(values.attachment), [values.attachment]);

    const resetForm = () => {
        setValues(INITIAL_VALUES);
        setErrors({});
        setStatus('idle');
    };

    const validate = () => {
        const newErrors = {};

        if (!values.message.trim()) {
            newErrors.message = 'El mensaje es obligatorio.';
        }

        if (values.copyEmail && !emailRegex.test(values.copyEmail)) {
            newErrors.copyEmail = 'Ingresa un correo electrónico válido.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleFieldChange = (field) => (event) => {
        const { value } = event.target;
        setValues((prev) => ({
            ...prev,
            [field]: value
        }));
    };

    const handleFileChange = (file) => {
        setValues((prev) => ({
            ...prev,
            attachment: file
        }));
    };

    const removeAttachment = () => {
        setValues((prev) => ({
            ...prev,
            attachment: null
        }));
    };

    const handleSubmit = async () => {
        if (!validate()) {
            return false;
        }

        setIsSubmitting(true);
        setStatus('loading');

        try {
            await helpService.submitConsultation(values);
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
        status,
        isSubmitting,
        hasAttachment,
        handleFieldChange,
        handleFileChange,
        removeAttachment,
        handleSubmit,
        resetForm
    };
};

export default useSupportRequestForm;


