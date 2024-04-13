const { SerialPort } = require('serialport');

//Online contex, define your online marks
//Usually the online mark is a string that defined by IoT devices
//Check you operation manual for detail.
//This case is a Panasonic PLC, fp-x seris, check online
const onlineMark = "%01$RT20253281004000000F"+"\r"

//Listing system avaliable ports.
async function listports() {
  const ports = await SerialPort.list();
  console.log(ports.map(port => port.path + ":" + port.friendlyName).join("\n"));
}

//Modify the function to fitting your uses
async function checkOnLine(portNum, rate){
  const port = new SerialPort({ path: portNum, baudRate:rate, autoOpen: false });
  
  port.on('error', err => {
    console.log('There is an error: ' + err.message + "\n");
  });
  
  port.on('data', data => {
    console.log('Data received: ' + data + "\n");
    if(data == onlineMark){
      console.log("The device is online.")
    }
  });
  
  port.open(function (err) {
    if (err) {
      console.log('Port open fail: ' + err.message + "\n");
      return;
    }
    console.log(portNum + ' open sucesses, now sending a greeting message' + "\r");
    
    //Greeting message defination
    try {
      port.write("%01#RT**"+ "\r");
      console.log("The message has sent." + "\n")
    }catch (err) {
      console.log('Message send fail: ' + err.message+'\n');
    }
  });
}

//List ports
listports();
//use example
checkOnLine("COM2",9600);