import { createSlice } from '@reduxjs/toolkit';
import { State } from '../utils/types';

export const marketsSlice = createSlice({
    name: `markets`,
    initialState: {
        trackedMarkets: [],
        markets: [],
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
            state.markets.push(action.payload);
        },
    },
});

// Action creators are generated for each case reducer function
export const { addTrackedMarket, removeTrackedMarket, clearTrackedMarkets, addMarket } =
    marketsSlice.actions;

export default marketsSlice.reducer;
