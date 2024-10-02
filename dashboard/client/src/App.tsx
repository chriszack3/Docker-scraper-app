import { Col, Row, Container, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { Market } from './utils/types';
import MarketSelect from './components/MarketSelect/MarketSelect';

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
        <Container>
            {
                response?.map((market: Market) => (
                    <MarketSelect key={market.id} market={market} />
                ))
            }
        </Container>
    );
}

export default App;
