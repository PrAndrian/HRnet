import {createSlice} from '@reduxjs/toolkit'

export const employeesSlice = createSlice({
    name: 'employees',
    initialState: {list : []},
    reducers: {
        createEmployee : (state,action) =>{
            state.list = action.payload
        }
    }
}) 

export const { createEmployee } = employeesSlice.actions;

export default employeesSlice.reducer;