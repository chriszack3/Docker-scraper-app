import Bid from '../Bid/Bid';
import Ask from '../Ask/Ask';
import { v4 as uuid } from 'uuid';
import './BidsTable.scss';

type Trade = {
    price: string;
    size: string;
}

const BidsTable = ({ bids, asks }: { bids: Trade[], asks: Trade[] }) => { 
    const sortedBids = bids.toReversed();
    const sortedAsks = asks.toReversed();
    return (
        <div>
            <h1>Bids</h1>
            <div className='bidTable--container'>
                <div className='bidTable_header--row'>
                    <span>Price</span>
                    <span>Size</span>
                </div>
                {
                    sortedBids?.map((b, i) => {
                        return <Bid key={uuid()} price={b.price} size={b.size} />
                    })
                }
            </div>
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
    )
};

export default BidsTable;