import { Component, OnInit, NgZone, ViewChild, ElementRef } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import * as dialogs from "ui/dialogs";

import { SideDrawerComponent } from "../../shared/sidedrawer/sidedrawer.component";

import { SpeechRecognition, SpeechRecognitionTranscription } from "nativescript-speech-recognition";
import { TNSTextToSpeech, SpeakOptions } from "nativescript-texttospeech";
import * as camera from "nativescript-camera";
import * as SocialShare from "nativescript-social-share";
import { ImageSource } from "tns-core-modules/image-source";
import { Directions } from "nativescript-directions";

import { registerElement } from "nativescript-angular/element-registry";
registerElement("VideoPlayer", () => require("nativescript-videoplayer").Video);
// https://docs.nativescript.org/angular/plugins/angular-third-party.html#simple-elements

@Component({
  moduleId: module.id,
  selector: "Speech",
  templateUrl: "speechrecognition.component.html"
})
export class SpeechRecognitionComponent implements OnInit {
  private text2speech: TNSTextToSpeech;
  private speechRecognition: SpeechRecognition;
  private directions: Directions;
  recognizedText: string;
  image: string;
  isCatwoman: boolean;
  isStorm: boolean;
  isListening: boolean;
  @ViewChild("videoplayer") VideoPlayer: ElementRef;
  isVideoVisible: boolean = false;

  constructor(private sidedrawerComponent: SideDrawerComponent, private zone: NgZone, private routerExtensions: RouterExtensions) {}

  showSlider() {
    this.routerExtensions.navigate(["/slider"]);
  }

  showSpeechRecognition() {
    this.routerExtensions.navigate(["/speechrecognition"]);
  }

  showGuessThatSong() {
    this.routerExtensions.navigate(["/guess"]);
  }

  toggleDrawer() {
    this.sidedrawerComponent.toggleDrawer();
  }

  ngOnInit() {
    this.sidedrawerComponent.selectedPage = "speechrecognition";
    this.text2speech = new TNSTextToSpeech();
    this.speechRecognition = new SpeechRecognition();
    this.directions = new Directions();
    this.checkAvailability();
    camera.requestPermissions();
  }

  private checkAvailability(): void {
    this.speechRecognition
      .available()
      .then(
        (available: boolean) => alert(available ? "SpeechRecognition is available" : "SpeechRecognition is NOT available!"),
        (err: string) => console.log(err)
      );
  }

  startListening() {
    this.zone.run(() => (this.recognizedText = ""));
    this.isListening = true;
    this.setClasses();
    this.speechRecognition
      .startListening({
        // optional, uses the device locale by default
        locale: "en-US",
        // set to true to get results back continuously
        returnPartialResults: true,
        // this callback will be invoked repeatedly during recognition
        onResult: (transcription: SpeechRecognitionTranscription) => {
          this.zone.run(() => (this.recognizedText = transcription.text));
          console.log(`User said: ${transcription.text}`);
          console.log(`User finished?: ${transcription.finished}`);
        }
      })
      .then(
        (started: boolean) => {
          console.log(`started listening`);
        },
        (errorMessage: string) => {
          console.log(`Error: ${errorMessage}`);
        }
      );
  }

  stopListening() {
    this.isListening = false;
    this.speechRecognition.stopListening().then(
      () => {
        console.log(`stopped listening`);
        this.processInput();
      },
      (errorMessage: string) => {
        console.log(`Stop error: ${errorMessage}`);
      }
    );
  }

  private processInput() {
    let text = this.recognizedText;
    let speak: string;
    if (text.indexOf("introduce") > -1 || text.indexOf("yourself") > -1) {
      speak = "Meow.... I'm Selina Kyle, better known as catwoman. Nice to meet you too! Purr....";
      this.speakCatwoman(speak);
    } else if (text.indexOf("character") > -1 || text.indexOf("marvel") > -1) {
      speak =
        "Yes! My name is Ororo Munroe. My mother was a tribal princess of Kenya and my father was an American photojournalist. I better known as Storm, an X-men. I can control the weather. How cool is that?";
      this.speakStorm(speak);
    } else if (text.indexOf("show") > -1 || text.indexOf("cool") > -1) {
      speak = "Let's watch a little video of my character together! Please make sure to rotate your device to landscape.";
      this.speakStorm(speak, "movie");
    }
    // } else if (text.indexOf("share") > -1 || text.indexOf("selfie") > -1) {
    //   speak = "That's a nice idea. Let's take a picture together and put it on Twitter!";
    //   this.speakStorm(speak, "selfie");
    // } else if (text.indexOf("redecorate") > -1 || text.indexOf("house") > -1) {
    //   speak = "I've found a lovely small furniture store nearby, called eekayAh. Would you like some directions?";
    //   this.speakStorm(speak);
    // } else if (text.indexOf("yes") > -1 || text.indexOf("please") > -1) {
    //   speak = "It's nearby, see for yourself.";
    //   this.speakStorm(speak, "directions");
    // }
  }

  private speakCatwoman(aText: string) {
    this.isCatwoman = true;
    this.isStorm = false;
    this.setClasses();
    let speakOptions: SpeakOptions = {
      text: aText,
      speakRate: 0.5,
      pitch: 1.7,
      locale: "en-US",
      finishedCallback: () => {}
    };
    this.text2speech.speak(speakOptions);
  }

  private speakStorm(aText: string, aAction?: string) {
    this.isCatwoman = false;
    this.isStorm = true;
    this.setClasses();
    let speakOptions: SpeakOptions = {
      text: aText,
      speakRate: 0.5,
      pitch: 1.1,
      locale: "en-US",
      finishedCallback: () => {
        if (aAction) {
          switch (aAction) {
            case "movie":
              this.isVideoVisible = true;
              this.showMovie();
              break;
            // case "selfie":
            //   this.shareSelfie();
            //   break;
            // case "directions":
            //   this.showDirections();
            //   break;
          }
        }
      }
    };
    this.text2speech.speak(speakOptions);
  }

  private showMovie() {
    dialogs.confirm("Rotate!").then(result => {
      this.zone.run(() => (this.isVideoVisible = true));

      this.VideoPlayer.nativeElement.play();
    });
  }

  // private shareSelfie() {
  //   camera
  //     .takePicture({
  //       width: 1000,
  //       height: 1000
  //     })
  //     .then(imageAsset => {
  //       new ImageSource().fromAsset(imageAsset).then(imageSource => {
  //         SocialShare.shareImage(imageSource);
  //       });
  //     });
  // }

  // private showDirections() {
  //   this.directions
  //     .navigate({
  //       from: {
  //         address: "Radisson Blu Waterfront Hotel, Stockholm"
  //       },
  //       to: [
  //         {
  //           address: "Regeringsgatan 65, 111 56 Stockholm, Sweden"
  //         }
  //       ]
  //     })
  //     .then(
  //       () => {
  //         console.log("Maps app launched.");
  //       },
  //       error => {
  //         console.log(error);
  //       }
  //     );
  // }

  setClasses() {
    return {
      catwoman: this.isCatwoman,
      storm: this.isStorm,
      none: this.isListening
    };
  }
}
