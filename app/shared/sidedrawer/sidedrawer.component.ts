import { Component, AfterViewInit, OnInit, ViewChild, ChangeDetectorRef, Input } from "@angular/core";

import { RadSideDrawerComponent, SideDrawerType } from "nativescript-pro-ui/sidedrawer/angular";
import { RadSideDrawer } from "nativescript-pro-ui/sidedrawer";

@Component({
  moduleId: module.id,
  selector: "SideDrawer",
  templateUrl: "sidedrawer.component.html",
  styleUrls: ["./sidedrawer.component.css"]
})
export class SideDrawerComponent implements AfterViewInit {
  @ViewChild(RadSideDrawerComponent) public drawerComponent: RadSideDrawerComponent;
  private _drawer: RadSideDrawer;

  @Input() selectedPage: string;

  constructor(private _changeDetectionRef: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this._drawer = this.drawerComponent.sideDrawer;
    this._changeDetectionRef.detectChanges();
    // style the iOS menu
    if (this._drawer.ios) {
      // if your menu is drawn 'below' the hostview, do this:
      this._drawer.ios.defaultSideDrawer.style.shadowMode = 1; // TKSideDrawerShadowMode.Hostview;
      // .. but if the menu is drawn 'above' the hostview, do this:
      this._drawer.ios.defaultSideDrawer.style.shadowMode = 2; // TKSideDrawerShadowMode.SideDrawer;
      // if you have shadowMode = 2, then you can add a little dim to the lower layer to add some depth. Keep it subtle though:
      this._drawer.ios.defaultSideDrawer.style.dimOpacity = 0.12;
      // then tweak the shadow to your liking:
      this._drawer.ios.defaultSideDrawer.style.shadowOpacity = 0.75; // 0-1, higher is darker
      this._drawer.ios.defaultSideDrawer.style.shadowRadius = 5; // higher is more spread
      // bonus feature: control the menu animation speed (in seconds)
      this._drawer.ios.defaultSideDrawer.transitionDuration = 0.25;
    }
  }

  toggleDrawer() {
    this._drawer.toggleDrawerState();
  }

  isPageSelected(pageTitle: string): boolean {
    return pageTitle === this.selectedPage;
  }
}
