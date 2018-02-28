import { Component, Input } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";

import { SideDrawerComponent } from "../sidedrawer.component";

@Component({
  selector: "SideDrawerItem",
  moduleId: module.id,
  templateUrl: "./sidedrawer-item.component.html",
  styleUrls: ["./sidedrawer-item.component.css"]
})
export class SideDrawerItemComponent {
  @Input() title: string;
  @Input() route: string;
  @Input() icon: string;
  @Input() isSelected: boolean;

  constructor(private _sidedrawerComponent: SideDrawerComponent, private _routerExtensions: RouterExtensions) {}

  onNavItemTap(navItemRoute: string) {
    this._sidedrawerComponent.toggleDrawer();
    this._routerExtensions.navigate([navItemRoute], {
      transition: {
        name: "fade"
      }
    });
  }
}
