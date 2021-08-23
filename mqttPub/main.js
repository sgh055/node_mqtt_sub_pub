const mqtt = require('mqtt');
const fs = require('fs');
const randomstring = require('randomstring');
// const connect = require('./schemas');
// const parkingDataModel = require('./schemas/parkingData');
//var certPath = `C:/Program Files (x86)/mosquitto/certs`; //windows
var certPath = `/etc/mosquitto/certs`; //linux

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

// const client = mqtt.connect('mqtt://192.168.0.4:8883');
const client = mqtt.connect(option);
// const client = mqtt.connect('mqtt://test.mosquitto.org');
var i = 0;
setInterval(() => {
    console.log('publish...');

    var parking = 
        {pNumber:randomstring.generate({
            length: 1,
            charset: 'abcd',
            capitalization: 'uppercase'
        }),
        pAreaNumber:getRandomIntInclusive(1,15), 
        use:randomstring.generate({
            length: 1,
            charset: 'yn',
            capitalization: 'uppercase'
        }),
        battery:randomstring.generate({
            length: 2,
            charset: 'numeric'
        }),
        sensorFailure:randomstring.generate({
            length: 1,
            charset: '0124'
        }),
        enviroment:{
            temper:getRandomIntInclusive(20,40), 
            humidi:getRandomIntInclusive(30,80)
            }
        };

    // console.log(parking);
    var jsonParking = JSON.stringify(parking);
    console.log(jsonParking);
    // client.publish('test', `test MQTT ${++i}`);
    client.publish('test', jsonParking, console.log);
}, 1000);

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //최댓값도 포함, 최솟값도 포함
  }