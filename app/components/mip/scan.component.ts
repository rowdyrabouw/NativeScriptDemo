import { ObservableArray } from "data/observable-array";
import { BluetoothScanner } from "nativescript-mip-ble/bluetooth.scanner";
import { MipDevice } from "nativescript-mip-ble/mip-device";
import { AllMips } from "./all-mips";

import { Component } from "@angular/core";

// Shared
import { MenuComponent } from "../../shared/menu/menu.component";

@Component({
  moduleId: module.id,
  selector: "mip-scan",
  templateUrl: "scan.component.html"
})
export class ScanComponent {
  public scanner: BluetoothScanner;
  public devicesAround: ObservableArray<MipDevice>;

  constructor(private menuComponent: MenuComponent) {
    this.scanner = new BluetoothScanner();
    this.scanner.initialisePermissionsIfRequired();

    this.devicesAround = new ObservableArray<MipDevice>();
  }

  public getPermissions() {
    this.scanner.initialisePermissionsIfRequired();
  }

  public connect(args) {
    console.log("args: " + args.index);
    var mipDevice: MipDevice = this.devicesAround.getItem(args.index);
    // mipDevice.connect(this.onDisconnected)
    mipDevice.connect(() => {}).then(UUID => {
      AllMips.addMipDevice(mipDevice);
      alert("Device Connected");
    });
  }

  public scan() {
    // var listView: RadListView = eventData.object;

    this.devicesAround.splice(0);

    this.scanner.scan((mip: MipDevice) => this.devicesAround.push(mip)).then(
      () => {
        // listView.notifyPullToRefreshFinished();
      },
      err => {
        // listView.notifyPullToRefreshFinished();
        alert("error while scanning: " + err);
      }
    );
  }

  private onDisconnected(mip: MipDevice) {
    AllMips.removeMip(mip);
  }

  private _getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  doSound() {
    let soundIndex = this._getRandomInt(1, 106); // value from 1 - 106
    AllMips.playOneSound(soundIndex, 0, 0);
    // AllMips.setChestLED(255, 0, 0);
  }

  private _speed: number = 24;
  get speed() {
    return this._speed;
  }
  set speed(val: number) {
    this._speed = Math.round(val);
  }

  private _turnSpeed: number = 16;
  get turnSpeed() {
    return this._turnSpeed;
  }
  set turnSpeed(val: number) {
    this._turnSpeed = Math.round(val);
  }

  moveForward() {
    AllMips.moveForward(this.speed);
  }

  moveBack() {
    AllMips.moveBack(this.speed);
  }

  turnLeft() {
    AllMips.turnLeft(this.speed, this.turnSpeed);
  }

  turnRight() {
    AllMips.turnRight(this.speed, this.turnSpeed);
  }

  doColor() {
    let red = this._getRandomInt(0, 255);
    let green = this._getRandomInt(0, 255);
    let blue = this._getRandomInt(0, 255);
    AllMips.setChestLED(red, green, blue);
  }

  doWink() {
    AllMips.setHeadLED(2, 2, 0, 0);
  }

  toggleDrawer(): void {
    this.menuComponent.toggleMenu();
  }
}
