import axios from "axios";

//action type
const GET_ALL_WINES = "GET_ALL_WINES";

//action creator
const getWines = wines => ({ type: GET_ALL_WINES, payload: wines });

//thunk creator
export const getAllWines = () => async dispatch => {
  try {
    const wineData = await axios.get("/api");
    const allWines = getWines(wineData);
    dispatch(allWines);
  } catch (error) {
    console.log("error in thunk creator ", error);
  }
};

//reducer
const defaultState = {};
export default function(state = defaultState, action) {
  switch (action.type) {
    case GET_ALL_WINES:
      return { ...state, wines: action.payload };
    default:
      return state;
  }
}
