import { Component, OnInit } from "@angular/core";

import { SideDrawerComponent } from "../../shared/sidedrawer/sidedrawer.component";

import { AddressOptions, Directions } from "nativescript-directions";

@Component({
  moduleId: module.id,
  selector: "Directions",
  templateUrl: "directions.component.html"
})
export class DirectionsComponent implements OnInit {
  private _directions: Directions;
  elevation = 2;

  constructor(private _sidedrawerComponent: SideDrawerComponent) {
    this._directions = new Directions();
  }

  toggleDrawer() {
    this._sidedrawerComponent.toggleDrawer();
  }

  ngOnInit() {
    this._sidedrawerComponent.selectedPage = "speechrecognition";
  }

  showDirections() {
    this._directions
      .navigate({
        from: {
          address: "Radisson Blu Waterfront Hotel, Stockholm"
        },
        to: [
          {
            address: "Regeringsgatan 65, 111 56 Stockholm, Sweden"
          }
        ]
      })
      .then(
        () => {
          console.log("Maps app launched.");
        },
        error => {
          console.log(error);
        }
      );
  }
}
