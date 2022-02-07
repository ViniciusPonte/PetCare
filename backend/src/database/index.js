const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);

mongoose.connect('mongodb+srv://vponte:INx4Mw12YlMZtPvT@cluster0.eumf0.mongodb.net/petcare?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
mongoose.Promise = global.Promise;

module.exports = mongoose;
