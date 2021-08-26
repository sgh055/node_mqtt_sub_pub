const mongoose = require('mongoose');

//connect Mongodb
const connect = () => {
    if (process.env.NODE_ENV !== 'production') {
        mongoose.set('debug', true);
    }
 mongoose.connect('mongodb://kyuho:1234@sgh055.iptime.org:40004/admin', {
        dbName: 'iotparking',
        useNewUrlParser: true,
        useCreateIndex: true,
    }, (error) => {
        if (error) {
            console.log('몽고디비 연결 에러', error);
        } else {
            console.log('몽고디비 연결 성공');
        }
    });
};

mongoose.connection.on('error', (error) => {
    console.log('몽고디비 연결 에러', error);
});
mongoose.connection.on('disconnected', () => {
    console.log('몽고디비 연결이 끊겼습니다. 연결을 재시도합니다.');
});

module.exports = connect;
