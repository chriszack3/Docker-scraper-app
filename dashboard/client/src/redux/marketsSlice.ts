import { createSlice, current } from '@reduxjs/toolkit';
import { State } from '../utils/types';

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
        addWebSocketMessage: (state: State, action) => { 
            if(action.payload.event_type === `book`) {
                state.liveMarkets[action.payload.asset_id] = action.payload;
            } 
            else if (action.payload.event_type === `price_change`) {
                if (action.payload.side === `BUY`) {
                    const bids = state.liveMarkets[action.payload.asset_id].bids;
                    const priceExists = bids.find((bid: any) => bid.price === action.payload.price)
                    if (priceExists) {
                        const filteredBids = bids.filter((bid: any) => bid.price !== action.payload.price);
                        filteredBids.push({ ...priceExists, size: action.payload.size });
                        state.liveMarkets[action.payload.asset_id].bids = filteredBids;
                    }
                }
                else if (action.payload.side === `SELL`) {
                    const asks = state.liveMarkets[action.payload.asset_id].asks;
                    const priceExists = asks.find((bid: any) => bid.price === action.payload.price)
                    if (priceExists) {
                        const filteredAsks = asks.filter((bid: any) => bid.price !== action.payload.price);
                        filteredAsks.push({ ...priceExists, size: action.payload.size });
                        state.liveMarkets[action.payload.asset_id].asks = filteredAsks;
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
