export const host = "http://localhost:9090/papeleria-dani/public/";

export function validateEmail(email) {
  // eslint-disable-next-line no-useless-escape
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export function validacel(telefono) {
  var re = /^([0-9])*$/;
  return re.test(telefono);
}
export function IsNumeric(input) {
  var RE = /^-{0,1}\d*\.{0,1}\d+$/;
  return RE.test(input);
}
//http://localhost:9090/papeleria-dani/public/
//https://papeleria-arcoiris.000webhostapp.com/public/
