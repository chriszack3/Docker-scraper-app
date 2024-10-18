import { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addMarket } from './redux/marketsSlice';
import { Market, State } from './utils/types';
import MarketSelect from './components/MarketSelect/MarketSelect';
import MarketDetails from './components/MarketDetails/MarketDetails';
import OrderBook from './components/OrderBook/OrderBook';
import Headlines from './components/Headlines/Headlines';
import './App.scss';

function App() {
    const [response, setResponse] = useState<Market[]>();
    const [yesNo, setYesNo] = useState<string>('Yes');

    const trackedMarkets = useSelector((state: State) => state.trackedMarkets);
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
                            <MarketDetails key={market.token} condition_id={market.token}>
                                <div className="orderBook_container">
                                    {
                                        yesNo === 'Yes' ? 
                                            <Fragment>
                                                <div className="yesNo_container">
                                                    <button className="yesNo_button--active" onClick={() => setYesNo('Yes')}>Yes</button>
                                                    <button onClick={() => setYesNo('No')}>No</button>
                                                </div>
                                                <OrderBook outcome='Yes' condition_id={market.token} />
                                            </Fragment> : 
                                            <Fragment>
                                                <div className="yesNo_container">
                                                    <button onClick={() => setYesNo('Yes')}>Yes</button>
                                                    <button className="yesNo_button--active" onClick={() => setYesNo('No')}>No</button>
                                                </div>
                                                <OrderBook outcome='No' condition_id={market.token} />
                                            </Fragment>
                                    }
                                </div>
                                <Headlines market={market} />
                            </MarketDetails>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default App;
