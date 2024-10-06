import useWebSocket from 'react-use-websocket';
import { useState, useEffect } from 'react';
import BidsTable from '../BidsTable/BidsTable';

const Book = ({ token }: { token: string }) => { 
    const [book, setBook] = useState<any>(null);
    const { sendMessage } = useWebSocket('wss://ws-subscriptions-clob.polymarket.com/ws/market', {
        onMessage: (msg) => {
            const parsed = JSON.parse(msg.data);
            if (parsed?.event_type === `book`) {
                setBook(parsed);
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
        console.log('book', book);
    }, [book])

    return (
        <div>
            <h1>Book</h1>
            {
                book?.bids && <BidsTable bids={book.bids} />
            }
        </div>
    )
}

export default Book;