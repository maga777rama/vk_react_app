import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchGroups = createAsyncThunk(
    "group/fetchGroupStatus",
    async () => {
        const { data } = await axios.get(
            "https://65ed767408706c584d99ce0b.mockapi.io/groups",
        );
        return data;
    },
);

const initialState = {
    items: [],
    status: "loading", //loading | success | error
};

export const groupSlice = createSlice({
    name: "group",
    initialState,
    reducers: {
        setItems: (state, action) => {
            state.items = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchGroups.fulfilled, (state, action) => {
            state.items = action.payload;
            state.status = "success";
            console.log("Успешно!");
        });
        builder.addCase(fetchGroups.rejected, (state) => {
            state.items = [];
            state.status = "error";
            alert("Произошла ошибка при отправке запроса");
            console.log("Произошла ошибка");
        });
        builder.addCase(fetchGroups.pending, (state) => {
            state.items = [];
            state.status = "loading";
            console.log("Отправка запроса...");
        });
    },
});

export const { setItems } = groupSlice.actions;
export default groupSlice.reducer;
