// Angular
import { Component, OnInit } from "@angular/core";

// Plugins
import { TNSPlayer } from "nativescript-audio";

// Shared
import { MenuComponent } from "../../shared/menu/menu.component";

@Component({
  moduleId: module.id,
  selector: "soundboard",
  templateUrl: "soundboard.component.html"
})
export class SoundBoardComponent implements OnInit {
  private _player1: TNSPlayer;
  private _player2: TNSPlayer;
  private _player3: TNSPlayer;
  private _player4: TNSPlayer;
  private _player5: TNSPlayer;
  private _player6: TNSPlayer;
  private _player7: TNSPlayer;
  private _player8: TNSPlayer;
  private _player9: TNSPlayer;
  constructor(private menuComponent: MenuComponent) {}

  toggleDrawer(): void {
    this.menuComponent.toggleMenu();
  }

  ngOnInit() {
    this._player1 = new TNSPlayer();
    this._player1.initFromFile({
      audioFile: "~/assets/audio/alien1.mp3", // ~ = app directory
      loop: false
    });
    this._player2 = new TNSPlayer();
    this._player2.initFromFile({
      audioFile: "~/assets/audio/alien2.mp3", // ~ = app directory
      loop: false
    });
    this._player3 = new TNSPlayer();
    this._player3.initFromFile({
      audioFile: "~/assets/audio/alien3.mp3", // ~ = app directory
      loop: false
    });
    this._player4 = new TNSPlayer();
    this._player4.initFromFile({
      audioFile: "~/assets/audio/ripley.mp3", // ~ = app directory
      loop: false
    });
    this._player5 = new TNSPlayer();
    this._player5.initFromFile({
      audioFile: "~/assets/audio/predator1.mp3", // ~ = app directory
      loop: false
    });
    this._player6 = new TNSPlayer();
    this._player6.initFromFile({
      audioFile: "~/assets/audio/predator2.mp3", // ~ = app directory
      loop: false
    });
    this._player7 = new TNSPlayer();
    this._player7.initFromFile({
      audioFile: "~/assets/audio/predator3.mp3", // ~ = app directory
      loop: false
    });
    this._player8 = new TNSPlayer();
    this._player8.initFromFile({
      audioFile: "~/assets/audio/predator4.mp3", // ~ = app directory
      loop: false
    });
    this._player9 = new TNSPlayer();
    this._player9.initFromFile({
      audioFile: "~/assets/audio/dutch.mp3", // ~ = app directory
      loop: false
    });
  }

  play1() {
    if (this._player1.isAudioPlaying()) {
      this._player1.seekTo(0);
    } else {
      this._player1.play();
    }
  }

  play2() {
    if (this._player2.isAudioPlaying()) {
      this._player2.seekTo(0);
    } else {
      this._player2.play();
    }
  }

  play3() {
    if (this._player3.isAudioPlaying()) {
      this._player3.seekTo(0);
    } else {
      this._player3.play();
    }
  }

  play4() {
    if (this._player4.isAudioPlaying()) {
      this._player4.seekTo(0);
    } else {
      this._player4.play();
    }
  }
  play5() {
    if (this._player5.isAudioPlaying()) {
      this._player5.seekTo(0);
    } else {
      this._player5.play();
    }
  }
  play6() {
    if (this._player6.isAudioPlaying()) {
      this._player6.seekTo(0);
    } else {
      this._player6.play();
    }
  }
  play7() {
    if (this._player7.isAudioPlaying()) {
      this._player7.seekTo(0);
    } else {
      this._player7.play();
    }
  }
  play8() {
    if (this._player8.isAudioPlaying()) {
      this._player8.seekTo(0);
    } else {
      this._player8.play();
    }
  }
  play9() {
    if (this._player9.isAudioPlaying()) {
      this._player9.seekTo(0);
    } else {
      this._player9.play();
    }
  }
}
