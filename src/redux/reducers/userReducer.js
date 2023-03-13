import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  login: false,
  correo: "",
  nombres: "",
  apellidoP: "",
  apellidoM: "",
  contraseña: "",
  id_usuario: "",
};

export const userReducer = createSlice({
  name: "login",
  initialState: initialState,
  reducers: {
    setLogin: (state, action) => {
      state.login = true;
      state.correo = action.payload.correo;
      state.nombres = action.payload.nombres;
      state.apellidoP = action.payload.apellidoP;
      state.apellidoM = action.payload.apellidoM;
      state.contraseña = action.payload.contraseña;
      state.id_usuario = action.payload.id_usuario;
    },
    outLogin: (state) => {
      state.login = false;
      state.email = "";
      state.nombres = "";
      state.apellidoP = "";
      state.apellidoM = "";
      state.contraseña = "";
      state.id_usuario = "";
    },
  },
});
export const { setLogin, outLogin } = userReducer.actions;
export default userReducer.reducer;
