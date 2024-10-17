export const validEmail = new RegExp(
  "^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,})$"
);

export const validPassword = new RegExp("^(?=.*?[A-Za-z])(?=.*?[0-9]).{8,}$");
