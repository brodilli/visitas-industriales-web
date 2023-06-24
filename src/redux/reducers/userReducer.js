import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  login: false,
  correo: "",
  nombres: "",
  apellidoP: "",
  apellidoM: "",
  contraseña: "",
  id_usuario: "",
  tipoUser: "",
  numTelefono: "",
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
      state.tipoUser = action.payload.tipoUser;
      state.numTelefono = action.payload.numTelefono;
    },
    outLogin: (state) => {
      state.login = false;
      state.email = "";
      state.nombres = "";
      state.apellidoP = "";
      state.apellidoM = "";
      state.contraseña = "";
      state.id_usuario = "";
      state.tipoUser = "";
      state.numTelefono = "";
    },
  },
});
export const { setLogin, outLogin } = userReducer.actions;
export default userReducer.reducer;
