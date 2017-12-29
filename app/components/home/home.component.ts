// Angular
import { Component, OnInit } from "@angular/core";

// Plugins
import { TNSPlayer } from "nativescript-audio";
import { TranslateService } from "@ngx-translate/core";

// Shared
import { MenuComponent } from "../../shared/menu/menu.component";

@Component({
  moduleId: module.id,
  selector: "home",
  templateUrl: "home.component.html"
})
export class HomeComponent implements OnInit {
  private _player: TNSPlayer;
  public constructor(
    private menuComponent: MenuComponent,
    private translate: TranslateService
  ) {}

  toggleDrawer(): void {
    this.menuComponent.toggleMenu();
  }

  ngOnInit() {
    this._player = new TNSPlayer();
    this._player.initFromFile({
      audioFile: "~/assets/audio/testing.mp3", // ~ = app directory
      loop: false
    });
  }

  toggleAudio() {
    if (this._player.isAudioPlaying()) {
      this._player.seekTo(0);
      this._player.pause();
    } else {
      this._player.play();
    }
  }

  public changeLanguage(lang: string) {
    this.translate.use(lang);
  }
}
