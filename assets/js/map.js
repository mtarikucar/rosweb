
function init() {
    // Create the main viewer.
    var viewer = new ROS2D.Viewer({
        divID: 'map',
        width: 250,
        height: 250
    });

    // Setup the map client.
    var gridClient = new ROS2D.OccupancyGridClient({
        ros: ros,
        rootObject: viewer.scene,
        // Use this property in case of continuous updates			
        continuous: true
    });
    // Scale the canvas to fit to the map
    gridClient.on('change', function () {
        viewer.scaleToDimensions(gridClient.currentGrid.width, gridClient.currentGrid.height);
        viewer.shift(gridClient.currentGrid.pose.position.x, gridClient.currentGrid.pose.position.y);
    });
}