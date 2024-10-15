import { createSlice, current } from '@reduxjs/toolkit';
import { State, BookEvent } from '../utils/types';

export const marketsSlice = createSlice({
    name: `markets`,
    initialState: {
        trackedMarkets: [],
        markets: [],
        tokens: [],
        liveMarkets: {},
    },
    reducers: {
        /*
        * reducers for tracked markets
        */
        addTrackedMarket: (state: State, action) => {
            state.trackedMarkets.push(action.payload);
        },
        clearTrackedMarkets: (state: State) => {
            state.trackedMarkets = [];
        },
        removeTrackedMarket: (state: State, action) => { 
            state.trackedMarkets = state.trackedMarkets.filter(market => market.id !== action.payload.id);
        },
        /*
        * reducers for markets
        */
        addMarket: (state: State, action) => {
            const isDuplicate = state.markets.find(market => market.question_id === action.payload.question_id)
            if (!isDuplicate) {
                state.markets.push(action.payload);
            }
            const isTokenDuplicate = state.tokens.find(token => token.question_id === action.payload.condition_id);
            if (!isTokenDuplicate) { 
                state.tokens.push({
                    question_id: action.payload.condition_id,
                    tokens: action.payload.tokens,
                });
            }
        },
        /* 
        * reducers for live markets
        */
        addWebSocketMessage: (
            state: State,
            action: {
                payload: BookEvent | any;
            }
        ): void => { 
            if (action.payload.event_type === `book`) {
                //if livemarkets does not have a property accessible by key asset_id
                if (!state.liveMarkets[action.payload.asset_id]) { 
                    state.liveMarkets[action.payload.asset_id] = {
                        // initialize bids and asks properties as empty objects
                        bids: {},
                        asks: {},
                    }
                }
                for(const bidState in state.liveMarkets[action.payload.asset_id].bids) {
                    state.liveMarkets[action.payload.asset_id].bids[bidState] = {
                        price: state.liveMarkets[action.payload.asset_id].bids[bidState].price,
                        size: "0"
                    };
                }
                for (const askState in state.liveMarkets[action.payload.asset_id].asks) {
                    state.liveMarkets[action.payload.asset_id].asks[askState] = {
                        price: state.liveMarkets[action.payload.asset_id].asks[askState].price,
                        size: "0"
                    };
                }
                for (const bid of action.payload.bids) {
                    console.log('bid', bid);
                    state.liveMarkets[action.payload.asset_id].bids[bid.price] = bid;
                }
                for (const ask of action.payload.asks) {
                    console.log('ask', ask);
                    state.liveMarkets[action.payload.asset_id].asks[ask.price] = ask;
                }
            } 
            else if (action.payload.event_type === `price_change`) {
                if (action.payload.side === `BUY`) {
                    //sets price property of the bid at property 'price'
                    state.liveMarkets[action.payload.asset_id].bids[action.payload.price] = {
                        price: action.payload.price,
                        size: action.payload.size,
                    }
                }
                else if (action.payload.side === `SELL`) {
                    state.liveMarkets[action.payload.asset_id].asks[action.payload.price] = {
                        price: action.payload.price,
                        size: action.payload.size,
                    }
                }
            }
            else {
                console.log('unknown event_type', action.payload);
            }
        },
    },
});

// Action creators are generated for each case reducer function
export const { addTrackedMarket, removeTrackedMarket, clearTrackedMarkets, addMarket, addWebSocketMessage } =
    marketsSlice.actions;

export default marketsSlice.reducer;
