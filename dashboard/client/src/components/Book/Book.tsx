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
            } else if (parsed?.event_type === `price_change`) { 
                console.log('price_change', parsed);
                if (parsed.side === `BUY`) {
                    setBids((prev: any) => {
                        if (prev.find((bid: any) => bid.price === parsed.price)) {
                            return prev.map((bid: any) => {
                                if (bid.price === parsed.price) {
                                    return {
                                        ...bid,
                                        size: parsed.size,
                                    }
                                }
                                return bid;
                            });
                        } else { 
                            return [
                                ...prev,
                                {
                                    price: parsed.price,
                                    size: parsed.size,
                                }
                            ]
                        }
                    });
                } else {
                    setAsks((prev: any) => {
                        if (prev.find((ask: any) => ask.price === parsed.price)) {
                            return prev.map((ask: any) => {
                                if (ask.price === parsed.price) {
                                    return {
                                        ...ask,
                                        size: parsed.size,
                                    }
                                }
                                return ask;
                            });
                        } else { 
                            return [
                                ...prev,
                                {
                                    price: parsed.price,
                                    size: parsed.size,
                                }
                            ]
                        }
                    });
                }
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