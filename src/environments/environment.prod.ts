export const environment = {
  production: true,
  loginReturlUrl: 'https://taco-fancy.azurewebsites.net',
  baseLoginUrl: 'https://tacofancy-api.azurewebsites.net/.auth/login/',
  loginQuery: 'session_mode=token&post_login_redirect_url=',
  userLoginDetailsUrl: 'https://tacofancy-api.azurewebsites.net/.auth/me',
  logoutUrl:
    'https://tacofancy-api.azurewebsites.net/.auth/logout?post_logout_redirect_uri=',
  logoutReturnPath: '/'
};
