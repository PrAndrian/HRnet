import { configureStore } from '@reduxjs/toolkit'
import employeesReducer from './features/employeesSlice'

export const store = configureStore({
    reducer: {
        employees : employeesReducer
    }
})