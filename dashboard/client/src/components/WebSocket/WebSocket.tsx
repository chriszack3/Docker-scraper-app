import { ReactElement } from "react";
import useWebSocket from 'react-use-websocket';
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { State, Token } from "../../utils/types";

const WebSocketComponent = ({ children }: { children: ReactElement }) => {
    const tokens = useSelector((state: State) => state.tokens);

    const { sendMessage } = useWebSocket('wss://ws-subscriptions-clob.polymarket.com/ws/market', {
        onMessage: (msg) => { 
            console.log('msg data', JSON.parse(msg.data));
        },
        onOpen: () => { 
            console.log('connected');
        },
        onClose: () => { 
            console.log('disconnected');
        },
        onError: (e) => { 
            console.log('Error in WebSocket: ', e);
        }
    })
    useEffect(() => { 
        const flatTokens = tokens.map((token: Token) => token.tokens.map((t) => t.token_id)).flat();
        console.log('flatTokens', flatTokens);
        sendMessage(JSON.stringify({
            assets_ids: flatTokens,
            type: `market`,
        }));
    }, [tokens])
    return (
        <div>
            { children }
        </div>
    )
}

export default WebSocketComponent;

// const { sendMessage } = useWebSocket('wss://ws-subscriptions-clob.polymarket.com/ws/market', {
//     onMessage: (msg) => {
//         const parsed = JSON.parse(msg.data);
//         if (parsed?.event_type === `book`) {
//             setBids(parsed.bids);
//             console.log('bids', parsed.bids);
//             setAsks(parsed.asks);
//             console.log('asks', parsed.asks);
//         } else if (parsed?.event_type === `price_change`) {
//             console.log('price_change', parsed);
//             if (parsed.side === `BUY`) {
//                 setBids((prev: any) => {
//                     if (prev.find((bid: any) => bid.price === parsed.price)) {
//                         return prev.map((bid: any) => {
//                             if (bid.price === parsed.price) {
//                                 return {
//                                     ...bid,
//                                     size: parsed.size,
//                                 }
//                             }
//                             return bid;
//                         });
//                     } else {
//                         return [
//                             ...prev,
//                             {
//                                 price: parsed.price,
//                                 size: parsed.size,
//                             }
//                         ]
//                     }
//                 });
//             } else {
//                 setAsks((prev: any) => {
//                     if (prev.find((ask: any) => ask.price === parsed.price)) {
//                         return prev.map((ask: any) => {
//                             if (ask.price === parsed.price) {
//                                 return {
//                                     ...ask,
//                                     size: parsed.size,
//                                 }
//                             }
//                             return ask;
//                         });
//                     } else {
//                         return [
//                             ...prev,
//                             {
//                                 price: parsed.price,
//                                 size: parsed.size,
//                             }
//                         ]
//                     }
//                 });
//             }
//         }

//     },
//     onError: (e) => {
//         console.log(e);
//     },
//     onOpen: () => {
//         console.log('connected');
//         sendMessage(JSON.stringify({
//             assets_ids: [token],
//             type: `market`,
//         }));
//     },
//     onClose: () => {
//         console.log('disconnected');
//     }
// })