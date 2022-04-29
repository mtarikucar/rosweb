//* The Ros object, wrapping a web socket connection to rosbridge.
var ros = new ROSLIB.Ros({
    url: 'ws://192.168.43.148:9090' // url to your rosbridge server
});

//* A topic for messaging.
var exampleTopic = new ROSLIB.Topic({
    ros: ros,
    name: '/com/endpoint/example', // use a sensible namespace
    messageType: 'std_msgs/String'
});

/**
 * Serializes an object and publishes it to a std_msgs/String topic.
 * @param {ROSLIB.Topic} topic
 *       A topic to publish to. Must use messageType: std_msgs/String
 * @param {Object} obj
 *       Any object that can be serialized with JSON.stringify
 */
function publishEncoded(topic, obj) {
    var msg = new ROSLIB.Message({
        data: JSON.stringify(obj)
    });
    topic.publish(msg);
}

/**
 * Decodes an object from a std_msgs/String message.
 * @param {Object} msg
 *       Message from a std_msgs/String topic.
 * @return {Object}
 *       Decoded object from the message.
 */
function decodeMessage(msg) {
    return JSON.parse(msg.data);
}

/**
 * Typed messaging wrapper for a std_msgs/String ROS Topic.
 * @param {ROSLIB.Topic} topic
 *       A std_msgs/String ROS Topic for multiplexed messaging.
 * @constructor
 */
class RosTypedMessaging {
    static RosTypedMessaging(topic) {
        this.topic = topic;
        this.topic.subscribe(this.handleMessage_.bind(this));
    }

    /**
     * Handles an incoming message from the topic by firing an event.
     * @param {Object} msg
     * @private
     */
    static handleMessage(msg) {
        var decoded = decodeMessage(msg);
        var type = decoded.type;
        var data = decoded.data;
        this.emit(type, data);
    };

    /**
     * Sends a typed message to the topic.
     * @param {String} type
     * @param {Object} data
     */
    static sendMessage(type, data) {
        var msg = { type: type, data: data };
        publishEncoded(this.topic, msg);
    };
}
//* Example implementation of RosTypedMessaging.
var myMessageChannel = new RosTypedMessaging(exampleTopic);

myMessageChannel.on('fooo', function (data) {
    console.log('fooo!', data);
});

setInterval(function () {
    var mySyncObject = {
        time: Date.now(),
        myFavoriteColor: 'red'
    };
    myMessageChannel.sendMessage('fooo', mySyncObject);
}, 1000);