// Angular
import { Component, ElementRef, ViewChild, OnInit } from "@angular/core";

// Plugins
import { TNSTextToSpeech, SpeakOptions } from "nativescript-texttospeech";
import { registerElement } from "nativescript-angular/element-registry";
registerElement(
  "VideoPlayerTTS",
  () => require("nativescript-videoplayer").Video
);

// Shared
import { MenuComponent } from "../../shared/menu/menu.component";

@Component({
  moduleId: module.id,
  selector: "texttospeech",
  templateUrl: "texttospeech.component.html"
})
export class TextToSpeechComponent implements OnInit {
  pitch: number;
  rate: number;
  locale: string;
  text: string;
  volume: number;
  private text2speech: TNSTextToSpeech;

  @ViewChild("videoplayer") VideoPlayerTTS: ElementRef;

  constructor(private menuComponent: MenuComponent) {}

  ngOnInit() {
    this.text2speech = new TNSTextToSpeech();
  }

  toggleDrawer(): void {
    this.menuComponent.toggleMenu();
  }

  playVideo(): void {
    this.VideoPlayerTTS.nativeElement.play();
  }

  speak() {
    let speakOptions: SpeakOptions = {
      text: this.text, /// *** required ***
      speakRate: this.rate, // optional - default is 1.0
      pitch: this.pitch, // optional - default is 1.0
      locale: this.locale,
      finishedCallback: () => {}
    };
    this.text2speech.speak(speakOptions);
  }

  setUSA() {
    this.pitch = 1;
    this.rate = 0.5;
    this.locale = "en-US";
    this.text = "This is Ripley, last survivor of the Nostromo.";
    this.speak();
  }

  setUK() {
    this.pitch = 0.9;
    this.rate = 0.5;
    this.locale = "en-GB";
    this.text = "This is Ripley, last survivor of the Nostromo.";
    this.speak();
  }

  setNL() {
    this.pitch = 1;
    this.rate = 0.5;
    this.text = "Dit is Ripley, laatste overlevende van de Nostromo.";
    this.locale = "nl-NL";
    this.speak();
  }

  setPL() {
    this.pitch = 0.9;
    this.rate = 0.4;
    this.text = "To Ripley, ostatni ocalały z Nostromo.";
    this.locale = "pl-PL";
    this.speak();
  }

  setDE() {
    this.pitch = 0.7;
    this.rate = 0.5;
    this.text = "Das ist Ripley, der letzte Überlebende des Nostromo.";
    this.locale = "de-DE";
    this.speak();
  }
}
