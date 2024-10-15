import { useSelector } from 'react-redux';
import { State } from '../../utils/types';
import Trade from '../Trade/Trade';
import './Book.scss';

const Book = ({ token }: { token: string }) => { 
    const liveMarkets = useSelector((state: State) => state.liveMarkets[token]);
    const bidsKey = Object.keys(liveMarkets?.bids).toReversed();
    const asksKey = Object.keys(liveMarkets?.asks).toReversed();
    console.log('bids', bidsKey);
    console.log('asks', asksKey);
    return (
        <div>
            <div className='contract--container'>
                <div>
                    <h1>Bids</h1>
                    <div className='bidTable--container'>
                        <div className='bidTable_header--row'>
                            <span>Price</span>
                            <span>Size</span>
                            <span>Change</span>
                        </div>
                        {
                            bidsKey?.map((b) => <Trade key={token + b + 'bid'} token={token} price={b} side={'bids'} />)
                            //sortedBids?.map((b, i) => <Bid key={uuid()} price={b.price} size={b.size} />)
                        }
                    </div>
                </div>
                <div>
                    <h1>Asks</h1>
                    <div className='bidTable--container'>
                        <div className='bidTable_header--row'>
                            <span>Price</span>
                            <span>Size</span>
                            <span>Change</span>
                        </div>
                        {
                            asksKey?.map((a) => <Trade key={token + a + 'ask'} token={token} price={a} side={'asks'} />)
                            //sortedAsks?.map((a, i) => <Ask key={uuid()} price={a.price} size={a.size} />)
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Book;