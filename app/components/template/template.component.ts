// Angular
import { Component } from "@angular/core";

// Shared
import { MenuComponent } from "../../shared/menu/menu.component";

@Component({
  moduleId: module.id,
  selector: "template",
  templateUrl: "template.component.html"
})
export class TemplateComponent {
  public constructor(private menuComponent: MenuComponent) {}

  toggleDrawer(): void {
    this.menuComponent.toggleMenu();
  }
}
