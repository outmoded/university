var Index = require('./index');

Index.init(8000, function (error, server) {

  if (error) {
      console.log(error);
  } else {
      console.log('Server started at: ' + server.info.uri);
  }
});
