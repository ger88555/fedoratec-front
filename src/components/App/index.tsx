import React from 'react';
import FacebookLink from './FacebookLink';
import Logo from './Logo';
import './styles.css';

const App : React.FC = () => {
    return (
        <main className="App">

            <Logo />

            <p className="announcement">
                ¡Próximamente!
            </p>

            <p>
                <FacebookLink />
            </p>
            
        </main>
    );
};

export default App;
