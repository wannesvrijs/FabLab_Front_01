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

  const resone = await axios.post(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}fabmoments`,
    textual,
    {
      headers: { Authorization: `Bearer ${cookies.jwtToken}` },
    }
  );
  const id = resone.data.id;

  files.forEach((file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("id", id);
    axios
      .post("http://localhost:8000/api/fab_imgs", formData, {
        headers: { Authorization: `Bearer ${cookies.jwtToken}` },
      })
      .catch(() => {});
  });
  // TODO
  // dispatch(addFabmoments(data));
  // .catch((error) => dispatch(errorFabmoments("error posting Fabmoment")));
};

// console.log(result.data['@id']);

const uploadFiles = async () => {
  for (let i = 0; i < validFiles.length; i++) {
    const formData = new FormData();
    formData.append("file", validFiles[i]);
    axios
      .post("http://localhost:8000/api/media_objects", formData)
      .catch(() => {});
  }
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
