import { Col, Row, Stack, Button } from 'react-bootstrap';
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
        <Stack gap={2} direction={"vertical"}>
            {
                response?.map((market: Market) => (
                    <MarketSelect key={market.id} market={market} />
                ))
            }
        </Stack>
    );
}

export default App;
