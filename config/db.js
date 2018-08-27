var mongoose = require('mongoose');
mongoose.connect(`mongodb://ykonetest:test123@ds125302.mlab.com:25302/ykonetest`, { useNewUrlParser: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('Db connected!');
});