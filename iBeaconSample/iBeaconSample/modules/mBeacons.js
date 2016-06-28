/*
 *
 *
 */
function monitoringCallback(beaconRegion, beaconRegionState) {
    kony.print("BeaconRegion: ", kony.type(beaconRegion), " ", beaconRegion, " state is: ", beaconRegionState);
    if (beaconRegionState == "BeaconRegionStateInside") {
        beaconManager.startRangingBeaconsInRegion(beaconRegion);
    }
}
/*
 *
 *
 */
function rangingCallback(beaconRegion, beacons) {
    kony.print("Beacons found for BeaconRegion: ", kony.type(beaconRegion), " ", beaconRegion, " Beacons: ", beacons);
    var beaconLabel = "No beacons";
    var proximityLabel = "...";
    if (beacons.length > 0) {
        beacon = beacons[0];
        kony.print("Beacon proximityUUIDString:", beacon.getProximityUUIDString());
        kony.print("Beacon major:", beacon.getMajor());
        kony.print("Beacon minor:", beacon.getMinor());
        kony.print("Beacon proximity:", beacon.getProximity());
        kony.print("Beacon accuracy:", beacon.getAccuracy());
        kony.print("Beacon rssi:", beacon.getrssi());
        beaconLabel = beacon.getProximityUUIDString() + " " + beacon.getMajor() + " " + beacon.getMinor();
        proximityLabel = beacon.getProximity();
    }
    frmMain.label1044569050127.text = beaconLabel;
    frmMain.label10445690506.text = proximityLabel;
}
/*
 *
 *
 */
function errorCallback(beaconManagerError, errorName, errorInfo, beaconRegion) {
    kony.print("Error occurred: ", beaconManagerError, " Error Name: ", errorName, " erorrInfo: ", errorInfo);
    if (beaconRegion) {
        kony.print("For Region: ", kony.type(beaconRegion), " ", beaconRegion);
    }
}
/*
 *
 *
 */
function monitoringStartedForRegionCallback(beaconRegion) {
    kony.print("Monitoring started for region: ", kony.type(beaconRegion), " ", beaconRegion);
}
/*
 *
 *
 */
function authorizationStatusChangedCallback(status) {
    kony.print("Location Authorization status changed to: ", status);
}

function determineAuthorizationStatus() {
    if (beaconManager == null) {
        beaconManager = new com.kony.BeaconManager(monitoringCallback, rangingCallback, errorCallback);
        beaconManager.setMonitoringStartedForRegionCallback(monitoringStartedForRegionCallback);
        beaconManager.setAuthorizationStatusChangedCallback(authorizationStatusChangedCallback);
    }
    /*
     "BeaconManagerAuthorizationStatusNotDetermined"
     "BeaconManagerAuthorizationStatusRestricted"
     "BeaconManagerAuthorizationStatusDenied"
     "BeaconManagerAuthorizationStatusAuthorized"
     */
    kony.print("Status : ", beaconManager.authorizationStatus());
    if (beaconManager.isMonitoringAvailableForBeaconRegions()) {
        kony.print("Monitoring available");
    } else {
        kony.print("Monitoring NOT available");
    }
    if (beaconManager.isRangingAvailableForBeaconRegions()) {
        kony.print("Ranging available");
    } else {
        kony.print("Ranging NOT available");
    }
    var proximityUUID = "FBA1FFE5-7CD6-451B-8F1F-22B2AC70AA45";
    var major = 10;
    var minor = 12;
    var identifier = "KonyBeaconSample"
    var beaconRegion = new com.kony.BeaconRegion(proximityUUID, major, minor, identifier);
    beaconManager.startMonitoringBeaconRegion(beaconRegion);
}
/*
 *
 *
 */
function locate_iBeacons() {
    if (beaconManager == null) {
        beaconManager = new com.kony.BeaconManager(monitoringCallback, rangingCallback, errorCallback);
        beaconManager.setMonitoringStartedForRegionCallback(monitoringStartedForRegionCallback);
        beaconManager.setAuthorizationStatusChangedCallback(authorizationStatusChangedCallback);
    }
    /*
     "BeaconManagerAuthorizationStatusNotDetermined"
     "BeaconManagerAuthorizationStatusRestricted"
     "BeaconManagerAuthorizationStatusDenied"
     "BeaconManagerAuthorizationStatusAuthorized"
     */
    if (beaconManager.authorizationStatus() != "BeaconManagerAuthorizationStatusAuthorized") {
        kony.print("Unathorized to use location services");
        //return;
    }
    if (!beaconManager.isMonitoringAvailableForBeaconRegions()) {
        kony.print("Monitoring not available");
        return;
    }
    if (!beaconManager.isRangingAvailableForBeaconRegions()) {
        kony.print("Ranging not available");
        return;
    }
    var proximityUUID = "FBA1FFE5-7CD6-451B-8F1F-22B2AC70AA45";
    var major = 10;
    var minor = 12;
    var identifier = "KonyBeaconSample"
    var beaconRegion = new com.kony.BeaconRegion(proximityUUID, major, minor, identifier);
    beaconManager.startMonitoringBeaconRegion(beaconRegion);
}
/*
 *
 *
 */
function stateUpdatedCallback(state) {
    kony.print("Peripheral manager state updated to: " + state);
    if (state == "PeripheralManagerStatePoweredOn" && !peripheralManager.isAdvertising()) {
        var proximityUUID = "FBA1FFE5-7CD6-451B-8F1F-22B2AC70AA45";
        var major = 10;
        var minor = 12;
        var identifier = "KonyBeaconSample";
        var beaconRegion = new com.kony.BeaconRegion(proximityUUID, major, minor, identifier);
        peripheralManager.startAdvertisingWithMeasuredPower(beaconRegion, null);
    }
}
/*
 *
 *
 */
function advertisingStatusCallback(errorName, errorObject) {
    if (errorName) {
        kony.print("Error occurred: " + errorName + " Info: " + errorObject);
    } else {
        kony.print("Adverising started successfully");
    }
}
/*
 *
 *
 */
function turn_device_into_iBeacon() {
    if (!peripheralManager) {
        peripheralManager = new com.kony.PeripheralManager(stateUpdatedCallback, advertisingStatusCallback);
    } else {
        kony.print("Already turned into an iBeacon!");
    }
    
    /*
     "PeripheralManagerAuthorizationStatusDetermined"
     "PeripheralManagerAuthorizationStatusRestricted"
     "PeripheralManagerAuthorizationStatusDenied"
     "PeripheralManagerAuthorizationStatusAuthorized"
     */
    if (peripheralManager.authorizationStatus() != "PeripheralManagerAuthorizationStatusAuthorized") {
        kony.print("Unathorized to use peripheral manager");
        //return;
    }
    // peripheralManager.startAdvertisingWithMeasuredPower(beaconRegion, null);
}
peripheralManager = null;
beaconManager = null;