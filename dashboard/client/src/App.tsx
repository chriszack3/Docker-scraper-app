import { Col, Row, Stack, Button, Container } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { Market } from './utils/types';
import MarketSelect from './components/MarketSelect/MarketSelect';
import './App.scss';

function App() {
    const [response, setResponse] = useState<Market[]>();

    useEffect(() => { 
        (async () => { 
            const res = await fetch('/api/getMarkets');
            const body = await res.json();
            setResponse(body);
        })()
    }, []);
    return (
        <div className='markets_container'>
            {
                response?.map((market: Market) => (
                    <MarketSelect key={market.id} market={market} />
                ))
            }
        </div>
    );
}

export default App;
