// Angular
import { Component, ElementRef, ViewChild } from "@angular/core";

// Plugins
import { registerElement } from "nativescript-angular/element-registry";
registerElement("VideoPlayer", () => require("nativescript-videoplayer").Video);

// Shared
import { MenuComponent } from "../../shared/menu/menu.component";

@Component({
  moduleId: module.id,
  selector: "video",
  templateUrl: "video.component.html"
})
export class VideoComponent {
  @ViewChild("videoplayer") VideoPlayer: ElementRef;

  public constructor(private menuComponent: MenuComponent) {}

  toggleDrawer(): void {
    this.menuComponent.toggleMenu();
  }

  playVideo(): void {
    this.VideoPlayer.nativeElement.play();
  }
}
