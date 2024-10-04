import { Col, Row, Stack, Button, Container } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Market, State } from './utils/types';
import MarketSelect from './components/MarketSelect/MarketSelect';
import './App.scss';

function App() {
    const [response, setResponse] = useState<Market[]>();

    const trackedMarkets = useSelector((state: State) => state.markets);

    useEffect(() => { 
        (async () => { 
            const res = await fetch('/api/getMarkets');
            const body = await res.json();
            setResponse(body);
        })()
    }, []);

    useEffect(() => { 
        console.log(trackedMarkets);
    }, [trackedMarkets]);

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
