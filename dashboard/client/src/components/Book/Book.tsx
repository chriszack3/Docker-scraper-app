import useWebSocket from 'react-use-websocket';
import { useState, useEffect } from 'react';
import BidsTable from '../BidsTable/BidsTable';

const Book = ({ token }: { token: string }) => { 
    const [bids, setBids] = useState<any>(null);
    const [asks, setAsks] = useState<any>(null);
    
    useEffect(() => {
        console.log('bids', bids, token);
    }, [bids])

    useEffect(() => { 
        console.log('asks', asks, token);
    }, [asks])

    return (
        <div>
            {
                bids && asks && <BidsTable asks={asks} bids={bids} />
            }
        </div>
    )
}

export default Book;