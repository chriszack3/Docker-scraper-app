import { useSelector } from 'react-redux';
import { State } from '../../utils/types';
import BidsTable from '../BidsTable/BidsTable';

const Book = ({ token }: { token: string }) => { 
    const liveMarkets = useSelector((state: State) => state.liveMarkets[token]);
    const bids = liveMarkets?.bids;
    const asks = liveMarkets?.asks;
    return (
        <div>
            {
                bids && asks && <BidsTable asks={asks} bids={bids} />
            }
        </div>
    )
}

export default Book;