import axios from "axios";

/*---------------------------------------------------------------------------------------------*/
// STEP1: action type
const GET_ALL_WINES = "GET_ALL_WINES";
const GET_SINGLE_WINE = "GET_SINGLE_WINE";
const ADD_WINE = "ADD_WINE";

/*---------------------------------------------------------------------------------------------*/

//STEP2: action creator
const getWines = wines => ({ type: GET_ALL_WINES, payload: wines });
const getSingleWine = singleWine => ({ type: GET_SINGLE_WINE, payload: singleWine });
const addWine = wineObj => ({ type: ADD_WINE, payload: wineObj });

/*---------------------------------------------------------------------------------------------*/

//STEP3: thunk creator
export const getAllWines = () => async dispatch => {
  try {
    const wineData = await axios.get("/api");
    const allWines = getWines(wineData);
    dispatch(allWines);
  } catch (error) {
    console.log("error in thunk creator ", error);
  }
};
export const getSelectedWine = wineId => async dispatch => {
  try {
    const wine = await axios.get(`/api/${wineId}`);
    const selectedWine = getSingleWine(wine);
    dispatch(selectedWine);
  } catch (error) {
    console.log("ERROR in thunk creator single wine", error);
  }
};

export const postWine = wineObj => async dispatch => {
  try {
    const newWine = await axios.post("/api/addWine", wineObj);
    const actionWine = addWine(newWine);
    dispatch(actionWine);
  } catch (error) {
    console.log("ERROR in thunk creator add wine", error);
  }
};

/*---------------------------------------------------------------------------------------------*/

//FINAL STEP: reducer
const defaultState = {};
export default function(state = defaultState, action) {
  switch (action.type) {
    case GET_ALL_WINES:
      return { ...state, allWines: action.payload };
    case GET_SINGLE_WINE:
      return { ...state, allWines: state.allWines, selectedWine: action.payload };
    case ADD_WINE:
      return { ...state, allWines: [...state.allWines, action.payload] };
    default:
      return state;
  }
}
