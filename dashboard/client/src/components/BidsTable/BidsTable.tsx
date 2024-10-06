import Bid from '../Bid/Bid';

const BidsTable = ({ bids }: { bids: { price: string, size: string }[] }) => { 
    console.log('bid', bids);
    return (
        <div>
            {
                bids.map((b, i) => <Bid key={i} price={b.price} size={b.size} />)
            }
        </div>
    )
};

export default BidsTable;