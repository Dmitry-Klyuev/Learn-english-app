import { configureStore } from '@reduxjs/toolkit'
import dictionary from "../features/dictionary.slice.ts";

export const store = configureStore({
  reducer: {
    dictionary: dictionary,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
