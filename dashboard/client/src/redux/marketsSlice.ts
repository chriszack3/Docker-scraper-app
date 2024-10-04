import { createSlice } from '@reduxjs/toolkit';

export const marketsSlice = createSlice({
    name: `markets`,
    initialState: {
        markets: [],
    },
    reducers: {
        addMarket: (state: any, action) => {
            state.markets.push(action.payload);
        },
        clearMarkets: (state: any) => {
            state.markets = [];
        },
    },
});

// Action creators are generated for each case reducer function
export const { addMarket, clearMarkets } =
    marketsSlice.actions;

export default marketsSlice.reducer;
