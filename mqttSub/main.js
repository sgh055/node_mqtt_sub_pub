const mqtt = require('mqtt');
const fs = require('fs');
const connect = require('./schemas');
const parkingDataModel = require('./schemas/parkingData');
//var certPath = `C:/Program Files (x86)/mosquitto/certs`; //windows
var certPath = `~/certs`; //linux

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
// const client = mqtt.connect('mqtt://192.168.0.4:8883');
const client = mqtt.connect(option);
// const client = mqtt.connect('mqtt://test.mosquitto.org');

client.subscribe('test/#');

client.on('message', function(topic, message) {
    // console.log(`Topic:${topic.toString()}, Message:${message.toString()}`);
    var t = JSON.parse(message.toString());
    // console.log(t[0].macAddr);
    // console.log(t[0].data);
    // console.log(t[0].id);
    // console.log(t[0].extra);
    console.log(t);

    // var mqttt = new mqttDataModel({macAddr:'ttt', data:'datatest', id:'123124',
    //                 extra:{port:'11', txpara:'33'}});
    // var mqttt = new mqttDataModel({topic, macAddr:t[0].macAddr, data:t[0].data, id:t[0].id,extra:t[0].extra});
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
        if(error) {
            console.log(error);
        } else {
            console.log('Data Saved!')
        }
    });    
});
