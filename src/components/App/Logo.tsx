import React from 'react';
import logo from '../../assets/images/logo.png';

const Logo : React.FC = () => {
    return (
        <img src={logo} className="brand-logo" alt="logo" />
    );
};

export default Logo;