import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AsideState
{
    asideOption: string;
}

const initialState: AsideState =
{
    asideOption: 'WORLD'
};

export const asideSlice = createSlice
({
    name: 'aside',
    initialState,
    reducers:
    {
        setAsideOption: (state, action: PayloadAction<string>) =>
        {
            state.asideOption = action.payload;
        }
    }
});

export const { setAsideOption } = asideSlice.actions;

export default asideSlice.reducer;
