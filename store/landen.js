import axios from "axios";

/*****************/
/* INITIAL STATE */
/*****************/
const initialState = {
  error: "",
  data: [],
};

/*********/
/* TYPES */
/*********/
const ADDLANDEN = "ADDLANDEN";
const ERRORLANDEN = "ERRORLANDEN";

/*******************/
/* ACTION CREATORS */
/*******************/

export const getLanden = (str) => (dispatch) => {
  axios
    .get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}lands?landNaam=${str}`)
    .then((result) => {
      dispatch(addLanden(result.data['hydra:member']))
    })
    .catch((error) => dispatch(errorLanden("error loading API")));
};

export const addLanden = (data) => ({
  type: ADDLANDEN,
  payload: data,
});

export const errorLanden = (msg) => ({
  type: ERRORLANDEN,
  payload: msg,
});

/***********/
/* REDUCER */
/***********/
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADDLANDEN:
      return {
        error: "",
        data: [...payload],
      };
    case ERRORLANDEN:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
};
