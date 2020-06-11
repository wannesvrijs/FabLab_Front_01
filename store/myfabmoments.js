import axios from "axios";
import { parseCookies, destroyCookie } from "nookies";

/*****************/
/* INITIAL STATE */
/*****************/
const initialState = {
  error: "",
  loading: false,
  data: [],
};

/*********/
/* TYPES */
/*********/
const LOADFABMOMENTS = "LOADFABMOMENTS";
const SETFABMOMENTS = "SETFABMOMENTS";
const ADDFABMOMENTS = "ADDFABMOMENTS";
const ERRORFABMOMENTS = "ERRORFABMOMENTS";

/*******************/
/* ACTION CREATORS */
/*******************/

export const getFabmoments = (useId, page = 1) => (dispatch) => {
  const cookies = parseCookies();
  dispatch(loadFabmoments());
  axios
    .get(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}fabmoments?fabUse.id=${useId}&page=${page}`,
      { headers: { Authorization: `Bearer ${cookies.jwtToken}` } }
    )
    .then((result) => {
      dispatch(setFabmoments(result.data["hydra:member"]));
    })
    .catch((error) => dispatch(errorFabmoments("error loading API")));
};

export const createFabmoments = (data) => (dispatch) => {
  const cookies = parseCookies();
  dispatch(loadFabmoments());
  axios
    .post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}fabmoments`, data, {
      headers: { Authorization: `Bearer ${cookies.jwtToken}` },
    })
    .then((result) => {
      dispatch(addFabmoments(data));
    })
    .catch((error) => dispatch(errorFabmoments("error posting Fabmoment")));
};

export const loadFabmoments = () => ({
  type: LOADFABMOMENTS,
});
export const setFabmoments = (data) => ({
  type: SETFABMOMENTS,
  payload: data,
});
export const addFabmoments = (data) => ({
  type: ADDFABMOMENTS,
  payload: data,
});
export const errorFabmoments = (msg) => ({
  type: ERRORFABMOMENTS,
  payload: msg,
});

/***********/
/* REDUCER */
/***********/
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case LOADFABMOMENTS:
      return {
        ...state,
        error: "",
        loading: true,
      };
    case SETFABMOMENTS:
      return {
        ...state,
        loading: false,
        data: payload,
      };
    case ADDFABMOMENTS:
      return {
        ...state,
        loading: false,
        data: [payload, ...state.data],
      };
    case ERRORFABMOMENTS:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};
