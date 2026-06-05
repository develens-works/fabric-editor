import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ToolsState
{
    toolsOption: string;
}

const initialState: ToolsState =
{
    toolsOption: 'WORLD'
};

export const toolsSlice = createSlice
({
    name: 'tools',
    initialState,
    reducers:
    {
        setToolsOption: (state, action: PayloadAction<string>) =>
        {
            state.toolsOption = action.payload;
        }
    }
});

export const { setToolsOption } = toolsSlice.actions;

export default toolsSlice.reducer;
