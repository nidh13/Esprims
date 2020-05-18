// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  apiEndpoint: 'http://localhost:9080/',
  host: 'http://localhost:4200',
  socket: {
    baseUrl: 'http://localhost:9080',
    opts: {}
  },
  firebaseConfig : {
    apiKey: "AIzaSyAIvyZ_y1wNO0MXhDGhKoBjYc_VrCBQIhU",
      authDomain: "angulargalery.firebaseapp.com",
      databaseURL: "https://angulargalery.firebaseio.com",
      projectId: "angulargalery",
      storageBucket: "angulargalery.appspot.com",
      messagingSenderId: "846145992041",
      appId: "1:846145992041:web:0715512349afc97a7579f8",
      measurementId: "G-TBV5YJFQ9G"
  }
};
