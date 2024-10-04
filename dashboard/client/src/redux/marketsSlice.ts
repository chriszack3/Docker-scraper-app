import { createSlice } from '@reduxjs/toolkit';
import { State } from '../utils/types';

export const marketsSlice = createSlice({
    name: `markets`,
    initialState: {
        markets: [],
    },
    reducers: {
        addMarket: (state: State, action) => {
            state.markets.push(action.payload);
        },
        clearMarkets: (state: State) => {
            state.markets = [];
        },
        removeMarket: (state: State, action) => { 
            state.markets = state.markets.filter(market => market.id !== action.payload.id);
        }
    },
});

// Action creators are generated for each case reducer function
export const { addMarket, removeMarket, clearMarkets } =
    marketsSlice.actions;

export default marketsSlice.reducer;
