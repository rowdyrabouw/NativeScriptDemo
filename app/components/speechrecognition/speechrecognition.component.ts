import { Component, OnInit, NgZone } from "@angular/core";

import { SideDrawerComponent } from "../../shared/sidedrawer/sidedrawer.component";

import { SpeechRecognition, SpeechRecognitionTranscription } from "nativescript-speech-recognition";
import { TNSTextToSpeech, SpeakOptions } from "nativescript-texttospeech";
import * as camera from "nativescript-camera";
import * as SocialShare from "nativescript-social-share";
import { ImageSource } from "tns-core-modules/image-source";
import { Directions } from "nativescript-directions";

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
  isHela: boolean;
  isGaladriel: boolean;

  constructor(private sidedrawerComponent: SideDrawerComponent, private zone: NgZone) {}

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
      speak = "I am Hela, Odin's firstborn, commander of the leegions of Asgard, the rightful heir to the throne and the Goddess of Death!";
      this.speakHela(speak);
    } else if (text.indexOf("ego") > -1 || text.indexOf("alterego") > -1 || text.indexOf("name") > -1) {
      speak = "Alright sissy, you can also call me lady guh-Lad-ree-ell, the Lady of Light.";
      this.speakGaladriel(speak);
    } else if (text.indexOf("share") > -1 || text.indexOf("selfie") > -1) {
      speak = "That's a nice idea. Let's take a picture together and put it on Twitter!";
      this.speakGaladriel(speak, "selfie");
    } else if (text.indexOf("redecorate") > -1 || text.indexOf("house") > -1) {
      speak = "I've found a lovely small furniture store nearby, called eekayAh. Would you like some directions?";
      this.speakGaladriel(speak);
    } else if (text.indexOf("yes") > -1 || text.indexOf("please") > -1) {
      speak = "It's nearby, see for yourself.";
      this.speakGaladriel(speak, "directions");
    }
  }

  private speakHela(aText: string) {
    this.isHela = true;
    this.isGaladriel = false;
    this.setClasses();
    let speakOptions: SpeakOptions = {
      text: aText,
      speakRate: 0.4,
      pitch: 0.4,
      locale: "en-US",
      finishedCallback: () => {}
    };
    this.text2speech.speak(speakOptions);
  }

  private speakGaladriel(aText: string, aAction?: string) {
    this.isHela = false;
    this.isGaladriel = true;
    this.setClasses();
    let speakOptions: SpeakOptions = {
      text: aText,
      speakRate: 0.5,
      pitch: 1,
      locale: "en-US",
      finishedCallback: () => {
        if (aAction) {
          switch (aAction) {
            case "selfie":
              this.shareSelfie();
              break;
            case "directions":
              this.showDirections();
              break;
          }
        }
      }
    };
    this.text2speech.speak(speakOptions);
  }

  private shareSelfie() {
    camera
      .takePicture({
        width: 1000,
        height: 1000
      })
      .then(imageAsset => {
        new ImageSource().fromAsset(imageAsset).then(imageSource => {
          SocialShare.shareImage(imageSource);
        });
      });
  }

  private showDirections() {
    this.directions
      .navigate({
        from: {
          address: "Radisson Blu Waterfront Hotel, Stockholm"
        },
        to: [
          {
            address: "Regeringsgatan 65, 111 56 Stockholm, Sweden"
          }
        ]
      })
      .then(
        () => {
          console.log("Maps app launched.");
        },
        error => {
          console.log(error);
        }
      );
  }

  setClasses() {
    return {
      hela: this.isHela,
      galadriel: this.isGaladriel
    };
  }
}
