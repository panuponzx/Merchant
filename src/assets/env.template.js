(function (window) {
  window.env = window.env || {};
  window["env"]["production"] = true;
  window["env"]["api"] = "${API_URL}";
  window["env"]["apiBackOffice"] = "${API_BACKOFFICE_URL}";
  window["env"]["aesSecretKey"] = "${AES_SECRET_KEY}";
  window["env"]["environment"] = "${ENV}";
  window["env"]["gitShorthash"] = "${GIT_SHORTHASH}";
})(this);