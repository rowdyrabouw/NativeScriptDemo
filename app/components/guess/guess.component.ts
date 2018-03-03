import { Component, OnInit } from "@angular/core";

import { SideDrawerComponent } from "../../shared/sidedrawer/sidedrawer.component";

import { TNSTextToSpeech, SpeakOptions } from "nativescript-texttospeech";
import { TNSPlayer } from "nativescript-audio";

let songsJSON = require("../../assets/data/guess.json");

@Component({
  moduleId: module.id,
  selector: "Guess",
  templateUrl: "guess.component.html"
})
export class GuessComponent implements OnInit {
  private _text2speech: TNSTextToSpeech;
  private _player: TNSPlayer;
  private _randomSong;
  private _playedSongs: Array<number> = [0];
  Artist: string;
  Title: string;
  Year: number;
  Lyric: string;
  Image: string;

  showVideo: boolean = false;

  constructor(private _sidedrawerComponent: SideDrawerComponent) {}

  ToggleDrawer() {
    this._sidedrawerComponent.toggleDrawer();
  }

  ngOnInit() {
    this._sidedrawerComponent.selectedPage = "guess";
    this._text2speech = new TNSTextToSpeech();
    this._player = new TNSPlayer();
    this.Image = "~/assets/images/appdevcon`.png";
  }

  PickNativeLyric() {
    this.Image = "~/assets/images/appdevcon.png";
    this._randomSong = songsJSON[0];
    this._player.initFromFile({
      audioFile: "~/assets/audio/" + this._randomSong.file,
      loop: false
    });
    this.SpeakLyric();
    // temp
  }

  PickRandomLyric() {
    this.Image = "~/assets/images/appdevcon.png";
    let lIndex: number;
    if (this._playedSongs.length === songsJSON.length) {
      alert("READY!");
    } else {
      do {
        lIndex = Math.floor(Math.random() * songsJSON.length);
      } while (this._playedSongs.indexOf(lIndex) > -1);
      this._randomSong = songsJSON[lIndex];
      this._playedSongs.push(lIndex);
      this._player.initFromFile({
        audioFile: "~/assets/audio/" + this._randomSong.file,
        loop: false
      });
      this.SpeakLyric();
    }
  }

  SpeakLyric() {
    let speakOptions: SpeakOptions = {
      text: this._randomSong.lyric,
      speakRate: 0.5,
      pitch: 1,
      locale: this._randomSong.locale,
      finishedCallback: () => {}
    };
    this._text2speech.speak(speakOptions);
  }

  PlaySong() {
    this.Artist = this._randomSong.artist;
    this.Title = this._randomSong.title;
    this.Year = this._randomSong.year;
    this.Lyric = this._randomSong.lyric;
    this.Image = "~/assets/images/" + this._randomSong.image;

    if (this._player.isAudioPlaying()) {
      this._player.pause();
    } else {
      this._player.play();
    }
  }
}
