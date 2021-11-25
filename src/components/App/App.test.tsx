import { render, screen } from '@testing-library/react';
import App from '.';
import { FACEBOOK_USER } from '../../config';

test('renders facebook page link', () => {
    const FACEBOOK_URL = `https://www.facebook.com/${FACEBOOK_USER}`;

    render(<App />);
    const socialLink = screen.getByText(/\/FedoraTecSA/i);
    expect(socialLink).toBeInTheDocument();
    expect(socialLink).toHaveAttribute('href', FACEBOOK_URL);
});
