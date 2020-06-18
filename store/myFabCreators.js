import axios from "axios";
import { parseCookies } from "nookies";

/*****************/
/* INITIAL STATE */
/*****************/
const initialState = {
  error: "",
  loading: false,
  materials: [],
  machines: [],
};

/*********/
/* TYPES */
/*********/
const LOADFABCREATORS = "LOADFABCREATORS";
const SETFABCREATORS = "SETFABCREATORS";
const ADDFABCREATORS = "ADDFABCREATORS";
const ERRORFABCREATORS = "ERRORFABCREATORS";

/*******************/
/* ACTION CREATORS */
/*******************/

export const getFabCreators = (useId, page = 1) => (dispatch) => {
  const cookies = parseCookies();
  dispatch(loadFabCreators());
  const requestMaterials = axios.get(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}materiaals`
  );
  const requestMachines = axios.get(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}machines`
  );

  axios
    .all([requestMaterials, requestMachines])
    .then(([materials, machines]) => {
      dispatch(
        setFabCreators([
          materials.data["hydra:member"],
          machines.data["hydra:member"],
        ])
      );
    })
    .catch((error) => dispatch(errorFabCreators("error loading API")));
};

export const loadFabCreators = () => ({
  type: LOADFABCREATORS,
});
export const setFabCreators = (data) => ({
  type: SETFABCREATORS,
  payload: data,
});
export const addFabCreators = (data) => ({
  type: ADDFABCREATORS,
  payload: data,
});
export const errorFabCreators = (msg) => ({
  type: ERRORFABCREATORS,
  payload: msg,
});

/***********/
/* REDUCER */
/***********/
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case LOADFABCREATORS:
      return {
        ...state,
        error: "",
        loading: true,
      };
    case SETFABCREATORS:
      return {
        ...state,
        loading: false,
        materials: payload[0],
        machines: payload[1],
      };
    case ERRORFABCREATORS:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};
