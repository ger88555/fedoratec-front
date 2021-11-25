import React from 'react';
import { FACEBOOK_USER } from '../../config';
import './styles.css';

const FacebookLink : React.FC = () => {
    return (
        <a
            href={`https://www.facebook.com/${FACEBOOK_USER}`}
            rel="noopener noreferrer"
            className="facebook-link"
            target="_blank"
        >
            <i className="facebook-logo"></i>
            /{FACEBOOK_USER}
        </a>
    );
};

export default FacebookLink;
