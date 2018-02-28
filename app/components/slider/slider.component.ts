import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { StackLayout } from "ui/layouts/stack-layout";
import { Slider } from "ui/slider";
import { Page } from "ui/page";

import { SideDrawerComponent } from "../../shared/sidedrawer/sidedrawer.component";

import { TNSPlayer } from "nativescript-audio";

@Component({
  moduleId: module.id,
  selector: "nda-slider",
  templateUrl: "slider.component.html"
})
export class SliderComponent implements OnInit {
  @ViewChild("background") _background: ElementRef;
  viewStack: StackLayout;
  private player: TNSPlayer;

  constructor(private sidedrawerComponent: SideDrawerComponent, private page: Page) {}

  ngOnInit() {
    this.sidedrawerComponent.selectedPage = "slider";
    this.page.actionBarHidden = false;
    this.viewStack = this._background.nativeElement;
    this.player = new TNSPlayer();
    this.player.initFromFile({
      audioFile: "~/assets/audio/captain.mp3",
      loop: false
    });
  }

  toggleDrawer() {
    this.sidedrawerComponent.toggleDrawer();
  }

  onSliderValueChange(args) {
    let slider = <Slider>args.object;
    this.viewStack.opacity = slider.value / 100;
    if (Math.round(slider.value) == 100) {
      this.player.play();
    } else {
      if (Math.round(slider.value) == 0) {
        // this.player.seekTo(0);
        this.player.pause();
      }
    }
  }
}
