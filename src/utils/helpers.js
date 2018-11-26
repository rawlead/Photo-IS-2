const setCookie = (name, value) => {
  document.cookie = name + '=' + value + '; Path=/;';
}

const getCookie = name => {
  let value = "; " + document.cookie;
  let parts = value.split("; " + name + "=");
  if (parts.length === 2) return parts.pop().split(";").shift();
}

const deleteCookie = (name) => {
  document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

const accessToken = () => {
  return "access_token=" + getCookie("access_token")
}


export {
  setCookie,
  getCookie,
  deleteCookie,
  accessToken
}
