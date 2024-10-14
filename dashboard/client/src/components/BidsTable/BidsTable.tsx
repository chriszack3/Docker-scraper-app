import Bid from '../Bid/Bid';
import Ask from '../Ask/Ask';
import { v4 as uuid } from 'uuid';
import './BidsTable.scss';

type Trade = {
    price: string;
    size: string;
}

const BidsTable = ({ bids, asks }: { bids: Trade[], asks: Trade[] }) => { 
    const sortedBids = bids.toSorted((a: any, b: any) => b.price - a.price);
    const sortedAsks = asks.toSorted((a: any, b: any) => a.price - b.price);
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