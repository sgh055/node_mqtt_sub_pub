const mongoose = require('mongoose');

mongoose.connect('mongodb://kyuho:1234@sgh055.iptime.org:40004/admin?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false', {
    dbName: 'iotparking',
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useCreateIndex: true,
}, (error) => {
    if (error) {
        console.log('mongo connect error', error);
    } else {
        console.log('mongo connect success!');
    }
});

const db = mongoose.connection;

module.exports = db;



