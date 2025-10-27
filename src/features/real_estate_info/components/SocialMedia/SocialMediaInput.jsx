import React from 'react';
import { Facebook, Youtube, Twitter, Instagram } from 'lucide-react';
import Input from '../../../../components/ui/Input/Input';

const SocialMediaInput = ({
    label,
    name,
    value,
    onChange,
    placeholder,
    platform
}) => {
    const getIcon = () => {
        const iconProps = { size: 16 };
        switch (platform) {
            case 'facebook':
                return <Facebook {...iconProps} style={{ color: '#1877f2' }} />;
            case 'youtube':
                return <Youtube {...iconProps} style={{ color: '#ff0000' }} />;
            case 'twitter':
                return <Twitter {...iconProps} style={{ color: '#1da1f2' }} />;
            case 'instagram':
                return <Instagram {...iconProps} style={{ color: '#e4405f' }} />;
            default:
                return null;
        }
    };

    return (
        <Input
            label={label}
            type="url"
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            prefix={getIcon()}
        />
    );
};

export default SocialMediaInput;