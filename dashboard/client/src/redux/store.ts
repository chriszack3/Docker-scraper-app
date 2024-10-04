import { configureStore } from '@reduxjs/toolkit';
import marketsSlice from './marketsSlice';

export default configureStore({
    reducer: marketsSlice,
});
