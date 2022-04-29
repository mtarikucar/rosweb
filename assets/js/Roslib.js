

//section components
const odomUI = document.getElementById("odom")
const imuUI = document.getElementById("imu")

let data = Storage.getItemsFromStorage()
let strData = JSON.stringify(data)
console.log(strData)
let i
for(i=0;i<strData.length;i++){
 strData = strData.replace(`"`,"")
}
console.log(strData)
//!! artık bütün değerleri okuyup üzerinde işlem yapabilirsin
//section subscribe

// topic objesini oluşturyoruz
// publish edildiğinde callback olacak mesaj türünü giriyoruz

let coordinate = new ROSLIB.Topic({
  ros: ros,
  name: '/coordinate',
  messageType: 'faal/coordinate'
});

// Then we add a callback to be called every time a message is published on this topic.
coordinate.subscribe(function (message) {
  odomUI.textContent =  `
  ${message.x}-x ${message.y}-y
`
});
let imu = new ROSLIB.Topic({
  ros: ros,
  name: '/imu',
  messageType: 'sensor_msgs/Imu'
});

// Then we add a callback to be called every time a message is published on this topic.
imu.subscribe(function (message) {
  imuUI.textContent = `${message.orientation.x}`
  
  // If desired, we can unsubscribe from the topic as well.
  //example: listener.unsubscribe()
});

  //section servis çağırma
  // -----------------

  // First, we create a Service client with details of the service's name and service type.
  var sendRoute = new ROSLIB.Service({
    ros : ros,
    name : 'getRotation',
    serviceType : 'faal/onlyString'
  });

  var sendCommand = new ROSLIB.Service({
    ros : ros,
    name : 'getCommand',
    serviceType : 'faal/onlyString'
  });
  



/* //section publish

  // Publishing a Topic
  // ------------------

  // First, we create a Topic object with details of the topic's name and message type.
  var cmdVel = new ROSLIB.Topic({
    ros : ros,
    name : '/cmd_vel',
    messageType : 'geometry_msgs/Twist'
  });

  // Then we create the payload to be published. The object we pass in to ros.Message matches the
  // fields defined in the geometry_msgs/Twist.msg definition.
  var twist = new ROSLIB.Message({
    linear : {
      x : 0.1,
      y : 0.2,
      z : 0.3
    },
    angular : {
      x : -0.1,
      y : -0.2,
      z : -0.3
    }
  });

  // And finally, publish.
  cmdVel.publish(twist);

 */

  /* //section JSON

  function publishEncoded(topic, obj) {
    var msg = new ROSLIB.Message({
      data: JSON.stringify(obj)
    });
    topic.publish(msg);
  }

  function decodeMessage(msg) {
    return JSON.parse(msg.data);
  }

  //section servis çağırma 
  // -----------------

  // öncelikle client servisimizi tanımlıyoruz
  var senddata = new ROSLIB.Service({
    ros: ros,
    name: '/get_data',
    serviceType: 'faal/mission_queue'
  });

  // ardından servis isteğini oluşturup 
  // yazdığımız faal/mission_queue servisine uygun şekilde bir data giriyoruz
  var request = new ROSLIB.ServiceRequest({
  data: data //data yukarıda tanımlanmış görev dizisinin stringe çevirlmiş halidir
  });

  // servisi çağıryoruz ve ros tarafında gönderilen data anlamlandırılarak json dosyasına yazılıyor
  senddata.callService(request, function (result) {
    console.log(result); 
  });

  // Advertising a Service
  // ---------------------

  // The Service object does double duty for both calling and advertising services
  var setBoolServer = new ROSLIB.Service({
    ros: ros,
    name: '/set_bool',
    serviceType: 'std_srvs/SetBool'
  });
  
  // Use the advertise() method to indicate that we want to provide this service
  setBoolServer.advertise(function (request, response) {
    console.log('Received service request on ' + setBoolServer.name + ': ' + request.data);
    response['success'] = true;
    response['message'] = 'Set successfully';
    return true;
  });
 */
