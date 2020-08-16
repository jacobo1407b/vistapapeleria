export const host = "https://resolute-return-272120.uk.r.appspot.com/";

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

export function number_format(amount, decimals) {
  amount += "";
  amount = parseFloat(amount.replace(/[^0-9\.]/g, ""));
  decimals = decimals || 0;
  if (isNaN(amount) || amount === 0) return parseFloat(0).toFixed(decimals);
  amount = "" + amount.toFixed(decimals);
  var amount_parts = amount.split("."),
    regexp = /(\d+)(\d{3})/;
  while (regexp.test(amount_parts[0]))
    amount_parts[0] = amount_parts[0].replace(regexp, "$1" + "," + "$2");
  return amount_parts.join(".");
}
//http://localhost:9090/papeleria-dani/public/
//https://papeleria-arcoiris.000webhostapp.com/public/
//https://resolute-return-272120.uk.r.appspot.com/
//
