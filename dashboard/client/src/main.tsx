import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Provider from './redux/Provider';
import WebSocketComponent from './components/WebSocket/WebSocket';
import './index.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider>
            <WebSocketComponent>
                <App />
            </WebSocketComponent>
        </Provider>
    </React.StrictMode>,
);
