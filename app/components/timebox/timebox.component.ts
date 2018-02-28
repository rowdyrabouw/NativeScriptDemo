import { Component, OnInit, ViewChild } from "@angular/core";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-pro-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-pro-ui/sidedrawer/angular";

import { Observable } from "data/observable";
import { ObservableArray } from "data/observable-array";

import * as dialogs from "ui/dialogs";
import * as bluetooth from "nativescript-bluetooth";

import { Timebox } from "./timebox.model";
// let Timebox = require("./timebox.js");

@Component({
  selector: "Led",
  moduleId: module.id,
  templateUrl: "./timebox.component.html"
})
export class TimeboxComponent implements OnInit {
  private _uuid: string = "11:75:58:8A:7B:5A";
  private _service: string = "49535343-fe7d-4ae5-8fa9-9fafd205e455";
  private _characteristic: string = "49535343-1e4d-4bd9-ba61-23c647249616";

  private timebox = new Timebox();

  clearLed() {
    this._write(this.timebox.setModeLight(255, 0, 0));
  }

  drawPixel() {
    this._write(this.timebox.setModeImage());
    let x = "5";
    let y = "7";
    let p = 0 + parseInt(y) * 11 + parseInt(x);
    // this._write(this.timebox.drawPixel(255, 0, 0, p));
  }

  private _write(value) {
    bluetooth
      .write({
        peripheralUUID: this._uuid,
        serviceUUID: this._service,
        characteristicUUID: this._characteristic,
        value: value
        // value: this.timebox.enterDrawingMode()
      })
      .then(
        function(result) {
          console.log("value written");
        },
        function(err) {
          console.log("write error: " + err);
        }
      );
  }

  /************************************************************
   * Use the @ViewChild decorator to get a reference to the drawer component.
   * It is used in the "onDrawerButtonTap" function below to manipulate the drawer.
   *************************************************************/
  @ViewChild("drawer") drawerComponent: RadSideDrawerComponent;

  private _sideDrawerTransition: DrawerTransitionBase;
  private _observable;
  private _observablePeripheralArray: ObservableArray<any>;

  /************************************************************
   * Use the sideDrawerTransition property to change the open/close animation of the drawer.
   *************************************************************/
  ngOnInit(): void {
    this._sideDrawerTransition = new SlideInOnTopTransition();
    this._observable = new Observable();
    this._observablePeripheralArray = new ObservableArray();
  }

  get sideDrawerTransition(): DrawerTransitionBase {
    return this._sideDrawerTransition;
  }

  /************************************************************
   * According to guidelines, if you have a drawer on your page, you should always
   * have a button that opens it. Use the showDrawer() function to open the app drawer section.
   *************************************************************/
  onDrawerButtonTap(): void {
    this.drawerComponent.sideDrawer.showDrawer();
  }

  CheckIsBluetoothEnabled() {
    bluetooth.isBluetoothEnabled().then(function(enabled) {
      dialogs.alert({
        title: "Enabled?",
        message: enabled ? "Yes" : "No",
        okButtonText: "OK, thanks"
      });
    });
  }

  doConnectLed() {
    bluetooth.connect({
      UUID: this._uuid,
      onConnected: peripheral => {
        console.log("Periperhal connected with UUID: " + peripheral.UUID);

        // the peripheral object now has a list of available services:
        peripheral.services.forEach(function(service) {
          console.log("service found: " + JSON.stringify(service));
        });

        this.clearLed();
      },
      onDisconnected: function(peripheral) {
        console.log("Periperhal disconnected with UUID: " + peripheral.UUID);
      }
    });
  }

  doDisConnectLed() {
    bluetooth
      .disconnect({
        UUID: this._uuid
      })
      .then(
        function() {
          console.log("disconnected successfully");
        },
        function(err) {
          // in this case you're probably best off treating this as a disconnected peripheral though
          console.log("disconnection error: " + err);
        }
      );
  }

  doStartScanning() {
    bluetooth
      .startScanning({
        serviceUUIDs: [],
        seconds: 4,
        onDiscovered: peripheral => {
          console.log("Periperhal found with UUID: " + peripheral.UUID);
          console.log("Periperhal found with name: " + peripheral.name);
        }
      })
      .then(
        function() {
          console.log("scanning complete");
        },
        function(err) {
          console.log("error while scanning: " + err);
        }
      );
  }
}
