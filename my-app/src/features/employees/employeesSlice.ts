import { Employee } from "@prisma/client";
import { employeesApi } from "../../app/services/employees";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";


interface InitialState {
    employees: Employee[] | null
}
const initialState: InitialState = {
    employees: null
}
const slice = createSlice({
    name: 'employee',
    initialState,
    reducers: {
        logout: () => initialState,
    },
    extraReducers: (builder) => {
        builder.addMatcher(employeesApi.endpoints.getAllEmployees.matchFulfilled, (state, action) => {
            state.employees = action.payload;
        })
    }
})
export default slice.reducer;
export const selectEmployees = (state: RootState) => state.employees;