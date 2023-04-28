import { configureStore } from "@reduxjs/toolkit";

import vendorsReducer from "./vendors/vendorsSlice";

export default configureStore({
  reducer: { vendors: vendorsReducer },
});
