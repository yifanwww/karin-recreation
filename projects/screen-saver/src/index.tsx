import { StrictMode } from 'react';
import { render } from 'react-dom';

import './index.css';

const App: React.FC = () => {
    return <div></div>;
};

function main(): void {
    render(
        <StrictMode>
            <App />
        </StrictMode>,
        document.getElementById('root'),
    );
}

main();
