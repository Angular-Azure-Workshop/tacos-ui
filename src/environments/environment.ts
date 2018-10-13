// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  loginReturlUrl: 'https://127.0.0.1:4200/',
  baseLoginUrl: 'https://tacofancy-api.azurewebsites.net/.auth/login/',
  loginQuery: 'session_mode=token&post_login_redirect_url=',
  userLoginDetailsUrl: 'https://tacofancy-api.azurewebsites.net/.auth/me',
  logoutUrl: 'https://tacofancy-api.azurewebsites.net/.auth/logout?post_logout_redirect_uri=',
  logoutReturnPath: '/'
};

/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
