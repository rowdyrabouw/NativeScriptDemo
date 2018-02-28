import { Component, OnInit } from "@angular/core";
import { Page } from "ui/page";

import { SideDrawerComponent } from "../../shared/sidedrawer/sidedrawer.component";

@Component({
  moduleId: module.id,
  selector: "nsd-home",
  templateUrl: "home.component.html"
})
export class HomeComponent implements OnInit {
  constructor(private sidedrawerComponent: SideDrawerComponent, private page: Page) {}

  toggleDrawer() {
    this.sidedrawerComponent.toggleDrawer();
  }

  ngOnInit() {
    this.sidedrawerComponent.selectedPage = "home";
    this.page.actionBarHidden = true;
  }
}
