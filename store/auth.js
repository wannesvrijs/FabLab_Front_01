/*****************/
/* INITIAL STATE */
/*****************/
const initialState = {
  isAuth: false,
  loading: false,
};

/*********/
/* TYPES */
/*********/
const SETAUTH = "SETAUTH";
const DELETEAUTH = "DELETEAUTH";

/*******************/
/* ACTION CREATORS */
/*******************/

export const setAuth = () => ({
  type: SETAUTH,
});

export const deleteAuth = () => ({
  type: DELETEAUTH,
});

/***********/
/* REDUCER */
/***********/
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SETAUTH:
      return {
        ...state,
        isAuth: true,
      };
    case DELETEAUTH:
      return {
        ...state,
        isAuth: false,
      };
    default:
      return state;
  }
};
