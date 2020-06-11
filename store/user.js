/*****************/
/* INITIAL STATE */
/*****************/
const initialState = {
  id: "",
  vn: "",
  an: "",
};

/*********/
/* TYPES */
/*********/
const SETUSER = "SETUSER";

/*******************/
/* ACTION CREATORS */
/*******************/

export const setUser = (data) => ({
  type: SETUSER,
  payload: data,
});

/***********/
/* REDUCER */
/***********/
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SETUSER:
      return {
        id: payload.id,
        vn: payload.vn,
        an: payload.an,
      };
    default:
      return state;
  }
};
