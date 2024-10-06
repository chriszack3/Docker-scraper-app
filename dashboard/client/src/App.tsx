import useWebSocket from 'react-use-websocket';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addMarket } from './redux/marketsSlice';
import { Market, State } from './utils/types';
import MarketSelect from './components/MarketSelect/MarketSelect';
import MarketDetails from './components/MarketDetails/MarketDetails';
import './App.scss';

function App() {
    const [response, setResponse] = useState<Market[]>();
    
    const trackedMarkets = useSelector((state: State) => state.trackedMarkets);
    const tokens = useSelector((state: State) => state.tokens);

    const markets = useSelector((state: State) => state.markets);
    const dispatch = useDispatch();

    //runs FIRST -- happens first time component is rendered
    //fetches the markets that can be tracked from table in mysql database controlled by me
    useEffect(() => { 
        (async () => { 
            const res = await fetch('/api/getMarkets');
            const body = await res.json();
            setResponse(body);
        })()
    }, []);

    //runs SECOND -- happens as soon as async function in useEffect completes and updates response state
    //fetches the details of the markets that can be tracked from the polymarket api
    useEffect(() => { 
        response && (async () => {
            for (let i = 0; i < response.length; i++) {
                const token = response[i].token;
                const res = await fetch(`https://clob.polymarket.com/markets/${token}`);
                const body = await res.json();
                dispatch(addMarket(body));
            }
        })()
    }, [response])

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
                            <MarketDetails key={market.token} question_id={market.token}>
                                <h1>Market Details Children....</h1>
                            </MarketDetails>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default App;
