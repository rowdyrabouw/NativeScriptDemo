import { HomeWrapperComponent } from "./components/home/home-wrapper.component";
import { HomeComponent } from "./components/home/home.component";
import { SliderComponent } from "./components/native/slider.component";
import { VideoComponent } from "./components/video/video.component";
import { SoundBoardComponent } from "./components/soundboard/soundboard.component";
import { MipComponent } from "./components/mip/mip.component";
import { ScanComponent } from "./components/mip/scan.component";
import { FingerprintComponent } from "./components/fingerprint/fingerprint.component";
import { TextToSpeechComponent } from "./components/texttospeech/texttospeech.component";
import { SpeechRecognitionComponent } from "./components/speechrecognition/speechrecognition.component";

import { MenuComponent } from "./shared/menu/menu.component";

export const AppRoutes: any = [
  {
    path: "",
    component: MenuComponent,
    children: [
      {
        path: "",
        component: HomeWrapperComponent,
        children: [{ path: "", component: HomeComponent }]
      },
      { path: "home", component: HomeComponent },
      { path: "slider", component: SliderComponent },
      { path: "video", component: VideoComponent },
      { path: "soundboard", component: SoundBoardComponent },
      { path: "scan", component: ScanComponent },
      // { path: "mip", component: MipComponent },
      { path: "fingerprint", component: FingerprintComponent },
      { path: "texttospeech", component: TextToSpeechComponent },
      { path: "speechrecognition", component: SpeechRecognitionComponent }
    ]
  }
];

export const AppComponents: any = [
  MenuComponent,
  HomeWrapperComponent,
  HomeComponent,
  SliderComponent,
  VideoComponent,
  SoundBoardComponent,
  MipComponent,
  ScanComponent,
  FingerprintComponent,
  TextToSpeechComponent,
  SpeechRecognitionComponent
];
