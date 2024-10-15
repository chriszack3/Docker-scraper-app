import Bid from '../Trade/Trade';
import Ask from '../Ask/Ask';
import { useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
import './BidsTable.scss';
import { LiveMarket, State } from '../../utils/types';

type Trade = {
    price: string;
    size: string;
}

const BidsTable = ({ bidsKeys, asksKeys }: { bidsKeys: Record<string, LiveMarket>, asksKeys: Record<string, LiveMarket> }) => {
    const bids = useSelector((state: State) => state.liveMarkets.bids);
    // const sortedBids = bids.toSorted((a: any, b: any) => b.price - a.price);
    // const sortedAsks = asks.toSorted((a: any, b: any) => a.price - b.price);
    return (
        <div className='contract--container'>
            <div>
                <h1>Bids</h1>
                <div className='bidTable--container'>
                    <div className='bidTable_header--row'>
                        <span>Price</span>
                        <span>Size</span>
                    </div>
                    {
                        sortedBids?.map((b, i) => <Bid key={uuid()} price={b.price} size={b.size} />)
                    }
                </div>
            </div>
            <div>
                <h1>Asks</h1>
                <div className='bidTable--container'>
                    <div className='bidTable_header--row'>
                        <span>Price</span>
                        <span>Size</span>
                    </div>
                    {
                        sortedAsks?.map((a, i) => <Ask key={uuid()} price={a.price} size={a.size} />)
                    }
                </div>
            </div>
        </div>
    )
};

export default BidsTable;