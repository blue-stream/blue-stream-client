// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  videoServiceUrl: 'http://localhost:7001/',
  uploadServiceUrl: 'http://localhost:5002/',
  commentServiceUrl: 'http://localhost:7002/',
  reactionServiceUrl: 'http://localhost:7003/',
  streamerServiceUrl: 'http://localhost:5005/',
  channelServiceUrl: 'http://localhost:7001/',
  userServiceUrl: 'http://localhost:7001/',
  authenticationServiceUrl: 'http://localhost:5010/',
  authenticationToken: 'bs-token',
  titleMinLength: 3,
  titleMaxLength: 256,
  commentMaxLength: 1000,
  commentMinLength: 1,
  channelNameMinLength: 2,
  channelNameMaxLength: 32,
  channelDescriptionMinLength: 2,
  channelDescriptionMaxLength: 128,
  descriptionMaxLength: 5000,
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
