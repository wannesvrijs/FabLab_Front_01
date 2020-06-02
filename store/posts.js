// import axios from "axios";

/*****************/
/* INITIAL STATE */
/*****************/

const initialState = {
  posts: [],
  post: {},
  loading: false,
  error: null,
};

/*********/
/* TYPES */
/*********/

const GET_POSTS = "GET_POSTS";

/*******************/
/* ACTION CREATORS */
/*******************/

export const fetchposts = () => async (dispatch) => {
  // const res = await axios.get('api/post')
  dispatch({
    type: GET_POSTS,
    payload: ["1st post", "2nd post"],
  });
};

/***********/
/* REDUCER */
/***********/

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};
