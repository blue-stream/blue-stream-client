export const environment = {
  production: true,
  videoServiceUrl: '/',
  uploadServiceUrl: '/',
  commentServiceUrl: '/',
  reactionServiceUrl: '/',
  streamerServiceUrl: '/',
  channelServiceUrl: '/',
  userServiceUrl: '/',
  authenticationServiceUrl: '/',
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
  classificationMaxLength: 256,
  amountOfTagsToShowInWatchPage: 5,
  supportedFileFormats: ['mkv', 'flv', 'ogg', 'avi', 'mov', 'wmv', 'mp4', 'm4v', 'mpg', 'mpeg'],
  maxFileSize: 2147483648, // 2gb
};
