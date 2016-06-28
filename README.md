# iBeacon-Sample-Application

This app showcases how iBeacon Technology can be used with Kony Apps. In this app, we 
show

    ● How to turn iPhone as iBeacon Transmitter using Kony App.
    
    ● How to set up and receive iBeacons using Kony App.
	
**Settings at Xcode level that you need to do for iBeacon to work**.

After extracting the iBeacon KAR into  Xcode, follow the below steps:

1. For required target/capabilities, turn on Background modes and check Location updates, Uses Bluetooth LE Accessories, Acts as Bluetooth LE Accessories, Remote notifications.

2. Make sure the corresponding entries are added to "info" for the concerned target under the heading "Required background modes".

3. The iOS devices which you use for testing, please ensure that the bluetooth,Settings/General/Background App Refresh and Settings/Privacy/Location Services for the iBeacon sample app are turned on.	
    

# Supported platforms:
**Mobile**
 * iPhone.

**Supported Kony Visualizer Enterprise  Version:** 7.0
