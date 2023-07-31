import { configureStore } from '@reduxjs/toolkit';
import tableRenderReducer from './renderTableSlice';

const store = configureStore({
  reducer: {
    tableRender: tableRenderReducer,
  },
});

export default store;
