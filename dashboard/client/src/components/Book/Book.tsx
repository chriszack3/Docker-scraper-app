import useWebSocket from 'react-use-websocket';
import { useState, useEffect } from 'react';
import BidsTable from '../BidsTable/BidsTable';

const Book = ({ token }: { token: string }) => { 
    const [bids, setBids] = useState<any>(null);
    const [asks, setAsks] = useState<any>(null);
    const { sendMessage } = useWebSocket('wss://ws-subscriptions-clob.polymarket.com/ws/market', {
        onMessage: (msg) => {
            const parsed = JSON.parse(msg.data);
            if (parsed?.event_type === `book`) {
                setBids(parsed.bids);
                console.log('bids', parsed.bids);
                setAsks(parsed.asks);
                console.log('asks', parsed.asks);
            }
        },
        onError: (e) => {
            console.log(e);
        },
        onOpen: () => {
            console.log('connected');
            sendMessage(JSON.stringify({
                assets_ids: [token],
                type: `market`,
            }));
        },
        onClose: () => {
            console.log('disconnected');
        }
    })
    
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