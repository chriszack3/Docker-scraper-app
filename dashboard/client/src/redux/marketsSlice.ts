import { createSlice } from '@reduxjs/toolkit';
import { State } from '../utils/types';

export const marketsSlice = createSlice({
    name: `markets`,
    initialState: {
        trackedMarkets: [],
        markets: [],
    },
    reducers: {
        addTrackedMarket: (state: State, action) => {
            state.trackedMarkets.push(action.payload);
        },
        clearTrackedMarkets: (state: State) => {
            state.trackedMarkets = [];
        },
        removeTrackedMarket: (state: State, action) => { 
            state.trackedMarkets = state.trackedMarkets.filter(market => market.id !== action.payload.id);
        }
    },
});

// Action creators are generated for each case reducer function
export const { addTrackedMarket, removeTrackedMarket, clearTrackedMarkets } =
    marketsSlice.actions;

export default marketsSlice.reducer;
