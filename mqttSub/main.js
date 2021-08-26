const mqtt = require('mqtt');
const fs = require('fs');
const connect = require('./schemas');
const parkingDataModel = require('./schemas/parkingData');
//var certPath = `C:/Program Files (x86)/mosquitto/certs`; //for windows path
var certPath = `/etc/mosquitto/certs`; //for linux path

//MQTTS options
var option = {
    host: 'sgh055.iptime.org',
    port: 40005,
    protocol: 'mqtts',
    protocolId: 'MQIsdp',
    caPath: [fs.readFileSync(`${certPath}/m2mqtt_ca.crt`)],
    keyPath: [fs.readFileSync(`${certPath}/m2mqtt_srv.key`)],
    certPath: [fs.readFileSync(`${certPath}/m2mqtt_srv.crt`)],
    // passphrase: 'CLIENT KEY PASSPHRASE',
    // secureProtocol: 'TLSv1_method',
    protocolVersion: 3,
    rejectUnauthorized: false
};

connect();
const client = mqtt.connect(option);

client.subscribe('test/#');

client.on('message', function(topic, message) {
    // console.log(`Topic:${topic.toString()}, Message:${message.toString()}`);
    var t = JSON.parse(message.toString());
    // console.log(t[0].macAddr);
    // console.log(t[0].data);
    // console.log(t[0].id);
    // console.log(t[0].extra);
    console.log(t); //print mqtt message

    var data = new parkingDataModel(
        {
            topic, 
            pNumber:t.pNumber, 
            pAreaNumber:t.pAreaNumber, 
            use:t.use,
            battery:t.battery,
            sensorFailure:t.sensorFailure,
            enviroment:t.enviroment
        });
    data.save(function(error, data) {
        //save data to Mongodb
        if(error) {
            console.log(error);
        } else {
            console.log('Data Saved!')
        }
    });    
});
