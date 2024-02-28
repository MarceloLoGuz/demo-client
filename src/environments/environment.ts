// Note: /{id}  It means 'id' is required in the url.
const pathRoute = 'http://localhost:8090/api/';

export const environment = {
  production: false,
  apiRoutes: {
    auth: {
      login: pathRoute + 'auth/login'
    },
    user: {
      createUser: pathRoute + 'users/createUser',
      all: pathRoute + 'users/all',
      getUserById: pathRoute + 'users/getUserById/',  // /{id} 
      updateUser: pathRoute + 'users/updateUser/',   // /{id}    
      deleteUser: pathRoute + 'users/deleteUser/',   // /{id}    
    },
    documents: {
      all: pathRoute + 'documents/all',
      upload: pathRoute + 'documents/upload',
    }
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
