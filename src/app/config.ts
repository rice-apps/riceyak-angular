import { environment } from '../environments/environment';

export let CONFIG;

if (environment.production) {
  CONFIG = {
    api_url: 'https://speak.riceapps.org/api',
    cas_auth_url: 'https://idp.rice.edu/idp/profile/cas/login',
    cas_logout_url: 'https://idp.rice.edu/idp/profile/cas/logout',
    service_url: 'https://speak.riceapps.org/auth'
  };
} else {
  CONFIG = {
    api_url: 'http://localhost:3000/api',
    cas_auth_url: 'https://idp.rice.edu/idp/profile/cas/login',
    cas_logout_url: 'https://idp.rice.edu/idp/profile/cas/logout',
    service_url: 'http://localhost:4200/auth'
  };
}
