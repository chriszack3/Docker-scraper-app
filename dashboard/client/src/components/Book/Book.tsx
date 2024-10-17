import { useSelector } from 'react-redux';
import { State } from '../../utils/types';
import Trade from '../Trade/Trade';
import './Book.scss';

const Book = ({ token }: { token: string }) => { 
    const liveMarkets = useSelector((state: State) => state.liveMarkets[token]);
    const bidsKey = Object.keys(liveMarkets?.bids).toSorted((a, b) => parseFloat(b) - parseFloat(a))
    const asksKey = Object.keys(liveMarkets?.asks).toSorted((a, b) => parseFloat(b) - parseFloat(a)).toReversed();
    console.log('liveMarkets', liveMarkets);
    const { lastTrade } = liveMarkets;
    return (
        <div>
            <div className='contract--container'>
                <h1>Asks</h1>
                <div className='contract_Asks--container'>
                    <div className='bidTable_header--row'>
                        <span>Price</span>
                        <span>Size</span>
                        <span>Change</span>
                    </div>
                    <div className='bidTable--container bidTable_Asks--container'>
                        
                        {
                            asksKey?.map((a) => <Trade key={token + a + 'ask'} token={token} price={a} side={'asks'} />)
                        }
                    </div>
                </div>
                <div className='lastTraded--container'>
                    <div style={{
                        borderColor: lastTrade?.side === 'BUY' ? 'green' : 'red'
                    }} className='lastTraded--row'>
                        <span>{lastTrade?.price} - Last Traded</span>
                        <span>{lastTrade?.size}</span>
                        <span>{lastTrade?.side}</span>
                    </div>
                </div>
                <div className='contract_Bids--container'>
                    <div className='bidTable--container bidTable_Bids--container'>
                        {
                            bidsKey?.map((b) => <Trade key={token + b + 'bid'} token={token} price={b} side={'bids'} />)
                        }
                    </div>
                </div>
                <h1>Bids</h1>
            </div>
        </div>
    )
}

export default Book;