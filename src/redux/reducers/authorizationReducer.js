import { ADD_AUTHORIZATIONS, SIGN_OUT } from "../Constants";

const initialState = {
  login: false,
  //   correo: "",
  //   id: "",
};

const authorizationReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_AUTHORIZATIONS:
      return {
        ...state,
        login: true,
        // correo: action.payload.correo,
        // id: action.payload.id,
      };
    case SIGN_OUT:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default authorizationReducer;
