import { configureStore } from "@reduxjs/toolkit";

import animationReducer from './animationSlice'

const store = configureStore({
    reducer: animationReducer
})

export default store;