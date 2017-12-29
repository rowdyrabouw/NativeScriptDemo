// Angular
import { Component, OnInit, NgZone } from "@angular/core";

// Plugins
import { SpeechRecognition } from "nativescript-speech-recognition";
import { SpeechRecognitionTranscription } from "nativescript-speech-recognition";
import { TNSTextToSpeech, SpeakOptions } from "nativescript-texttospeech";
import * as camera from "nativescript-camera";
import * as SocialShare from "nativescript-social-share";
import { ImageSource } from "tns-core-modules/image-source";
import { TNSPlayer } from "nativescript-audio";

// Shared
import { MenuComponent } from "../../shared/menu/menu.component";

@Component({
  moduleId: module.id,
  selector: "speechrecognition",
  templateUrl: "speechrecognition.component.html"
})
export class SpeechRecognitionComponent implements OnInit {
  recognizedText: string;
  private speechRecognition = new SpeechRecognition();
  private _player: TNSPlayer;
  private text2speech: TNSTextToSpeech;

  constructor(private menuComponent: MenuComponent, private zone: NgZone) {}

  ngOnInit() {
    this.text2speech = new TNSTextToSpeech();
    this.checkAvailability();
    camera.requestPermissions();
    this._player = new TNSPlayer();
    this._player.initFromFile({
      audioFile: "~/assets/audio/7510.mp3", // ~ = app directory
      loop: false
    });
  }

  checkAvailability(): void {
    this.speechRecognition
      .available()
      .then(
        (available: boolean) => console.log(available ? "YES!" : "NO"),
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
        this.speak();
      },
      (errorMessage: string) => {
        console.log(`Stop error: ${errorMessage}`);
      }
    );
  }

  speak() {
    let speakOptions: SpeakOptions = {
      text: this.recognizedText, /// *** required ***
      speakRate: 1, // optional - default is 1.0
      pitch: 1, // optional - default is 1.0
      locale: "en-GB",
      finishedCallback: () => {
        this.handleFollowUpAction(this.recognizedText.toLowerCase());
      }
    };

    this.text2speech.speak(speakOptions);
  }

  checkPermissions() {
    this.speechRecognition.requestPermission().then((granted: boolean) => {
      alert("Granted? " + granted);
    });
  }

  private handleFollowUpAction(text: string): void {
    if (text.indexOf("share") > -1 && text.indexOf("selfie") > -1) {
      this.shareSelfie();
    } else if (
      text.indexOf("year") > -1 ||
      text.indexOf("7510") > -1 ||
      text.indexOf("day") > -1 ||
      text.indexOf("judgement") > -1
    ) {
      this.playAudio();
    }
  }

  playAudio(): void {
    let speakOptions: SpeakOptions = {
      text: `That sounds like Zager and Evans with In The Year 2525, doesn't it?`,
      speakRate: 1,
      pitch: 0.5,
      locale: "en-US",
      finishedCallback: () => {
        this._player.play();
      }
    };
    this.text2speech.speak(speakOptions);
  }

  shareSelfie() {
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

  toggleDrawer(): void {
    this.menuComponent.toggleMenu();
  }
}
