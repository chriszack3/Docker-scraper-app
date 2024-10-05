import { createSlice } from '@reduxjs/toolkit';
import { State } from '../utils/types';

export const marketsSlice = createSlice({
    name: `markets`,
    initialState: {
        trackedMarkets: [],
        markets: [],
        tokens: [],
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
            console.log('state', action.payload.tokens);
            const isTokenDuplicate = state.tokens.find(token => token.question_id === action.payload.question_id);
            if (!isTokenDuplicate) { 
                state.tokens.push({
                    question_id: action.payload.question_id,
                    tokens: action.payload.tokens,
                });
            }
        },
    },
});

// Action creators are generated for each case reducer function
export const { addTrackedMarket, removeTrackedMarket, clearTrackedMarkets, addMarket } =
    marketsSlice.actions;

export default marketsSlice.reducer;
