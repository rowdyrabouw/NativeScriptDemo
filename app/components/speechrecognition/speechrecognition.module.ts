import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { TNSFontIconModule } from "nativescript-ngx-fonticon";
import { TranslateModule } from "@ngx-translate/core";

import { SpeechRecognitionRoutingModule } from "./speechrecognition-routing.module";
import { SpeechRecognitionComponent } from "./speechrecognition.component";
import { DirectionsComponent } from "./directions.component";

@NgModule({
  imports: [NativeScriptCommonModule, TNSFontIconModule, TranslateModule, SpeechRecognitionRoutingModule],
  declarations: [SpeechRecognitionComponent, DirectionsComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class SpeechRecognitionModule {}
