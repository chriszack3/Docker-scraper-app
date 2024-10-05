import useWebSocket from 'react-use-websocket';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addMarket } from './redux/marketsSlice';
import { Market, State } from './utils/types';
import MarketSelect from './components/MarketSelect/MarketSelect';
import './App.scss';

function App() {
    const [response, setResponse] = useState<Market[]>();

    const trackedMarkets = useSelector((state: State) => state.trackedMarkets);

    const markets = useSelector((state: State) => state.markets);
    const dispatch = useDispatch();

    //runs FIRST -- happens first time component is rendered
    useEffect(() => { 
        (async () => { 
            const res = await fetch('/api/getMarkets');
            const body = await res.json();
            setResponse(body);
        })()
    }, []);

    //runs SECOND -- happens as soon as async function in useEffect completes and updates response state
    useEffect(() => { 
        console.log('response', response);
        
        response && (async () => {
            for (let i = 0; i < response.length; i++) {
                const token = response[i].token;
                const res = await fetch(`https://clob.polymarket.com/markets/${token}`);
                const body = await res.json();
                dispatch(addMarket(body));
            }
        })()
    }, [response])

    useEffect(() => { 
        console.log('markets', markets);
    }, [markets])

    useEffect(() => { 
    }, [trackedMarkets])

    
        useWebSocket('wss://ws-subscriptions-clob.polymarket.com/ws/market', {
            onMessage: (msg) => {
                console.log(msg);
            },
            onError: (e) => {
                console.log(e);
            },
            onOpen: () => {
                console.log('connected');
            },
            onClose: () => {
                console.log('disconnected');
            }
        })
    

    return (
        <div>
            <div className='markets_container'>
                {
                    response?.map((market: Market) => (
                        <MarketSelect key={market.id} market={market} />
                    ))
                }
            </div>
            <div>
                {
                    trackedMarkets?.map((market: Market) => {
                        return (
                            <div key={market.id}>
                                <h3>{market.name}</h3>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default App;
