import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    privateTypeFilter: {
        name: "Неважно",
        filterProperty: undefined,
    },
    haveAvatarFilter: {
        name: "Неважно",
        filterProperty: undefined,
    },
    haveFriendsFilter: {
        name: "Неважно",
        filterProperty: undefined,
    },
};

export const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        setPrivateType: (state, action) => {
            state.privateTypeFilter = action.payload;
        },
        setHaveAvatar: (state, action) => {
            state.haveAvatarFilter = action.payload;
        },
        setHaveFriends: (state, action) => {
            state.haveFriendsFilter = action.payload;
        },
        resetFilters: (state) => {
            state.privateTypeFilter = initialState.privateTypeFilter;
            state.haveAvatarFilter = initialState.haveAvatarFilter;
            state.haveFriendsFilter = initialState.haveFriendsFilter;
        },
    },
});

export const { setPrivateType, setHaveAvatar, setHaveFriends, resetFilters } =
    filterSlice.actions;
export default filterSlice.reducer;
