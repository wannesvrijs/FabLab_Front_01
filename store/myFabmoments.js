import axios from "axios";
import { parseCookies } from "nookies";

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

export const createFabmoments = ({ textual, files }) => async (dispatch) => {
  const cookies = parseCookies();

  dispatch(loadFabmoments());

  //first we post the textual data
  axios
    .post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}fabmoments`, textual, {
      headers: { Authorization: `Bearer ${cookies.jwtToken}` },
    })

    //if textual data succeeds we start posting images with id that came back from post
    .then((response) => {
      files.every((file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("id", response.data.id);
        axios
          .post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}fab_imgs`, formData, {
            headers: { Authorization: `Bearer ${cookies.jwtToken}` },
          })
          //if images fail to post we add the violations and delete the textual data again (rollback)
          .catch((error) => {
            axios.delete(
              `${process.env.NEXT_PUBLIC_API_ENDPOINT}fabmoments/${response.data.id}`,
              {
                headers: { Authorization: `Bearer ${cookies.jwtToken}` },
              }
            );

            //we restructure the violationdata and dispatch
            let newViolationObject = {};
            error.response.data.violations.map(
              (violation) =>
                (newViolationObject = {
                  ...newViolationObject,
                  [violation.propertyPath]: violation.message,
                })
            );
            dispatch(errorFabmoments(newViolationObject));
            return false;
          });
      });
      return response.data.id;
    })
    .then((response) => {
      dispatch(addCreatedFabmoments(response));
    })
    //if textual data fails we restructue the errordata and dispatch
    .catch((error) => {
      let newViolationObject = {};
      error.response.data.violations.map(
        (violation) =>
          (newViolationObject = {
            ...newViolationObject,
            [violation.propertyPath]: violation.message,
          })
      );
      dispatch(errorFabmoments(newViolationObject));
    });
};

//add after succesfull creation
export const addCreatedFabmoments = (id) => async (dispatch) => {
  const cookies = parseCookies();
  axios
    .get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}fabmoments/${id}`, {
      headers: { Authorization: `Bearer ${cookies.jwtToken}` },
    })
    .then((result) => {
      dispatch(addFabmoments(result.data));
    })
    .catch();
};

export const loadFabmoments = () => ({
  type: LOADFABMOMENTS,
});

export const addFabmoments = (data) => ({
  type: ADDFABMOMENTS,
  payload: data,
});

export const setFabmoments = (data) => ({
  type: SETFABMOMENTS,
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
        error: "",
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
