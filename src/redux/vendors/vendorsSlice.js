import { createSlice } from "@reduxjs/toolkit";

export const vendorsSlice = createSlice({
  name: "vendors",
  initialState: { pageNumber: 0, data: [] },
  reducers: {
    changePageNumber: (state) => {
      state.pageNumber += 1;
    },
    updateList: (state, action) => {
      state.data.push(...action.payload);
    },
  },
});

export const { changePageNumber, updateList } = vendorsSlice.actions;

export default vendorsSlice.reducer;
