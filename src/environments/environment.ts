export const environment = {
  production: (window as any)["env"]["production"],
  aesSecretKey: (window as any)["env"]["aesSecretKey"],
  releaseVersion: (window as any)["env"]["releaseVersion"],
  api: (window as any)["env"]["api"],
  apiBackOffice: (window as any)["env"]["apiBackOffice"]
};
