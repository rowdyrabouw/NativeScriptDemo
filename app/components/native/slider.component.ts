// Angular
import { Component } from "@angular/core";

// Shared
import { MenuComponent } from "../../shared/menu/menu.component";

@Component({
  moduleId: module.id,
  selector: "slider-native",
  templateUrl: "slider.component.html"
})
export class SliderComponent {
  public constructor(private menuComponent: MenuComponent) {}

  toggleDrawer(): void {
    this.menuComponent.toggleMenu();
  }
}
