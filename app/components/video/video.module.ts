import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { TNSFontIconModule } from "nativescript-ngx-fonticon";
import { TranslateModule } from "@ngx-translate/core";

import { VideoRoutingModule } from "./video-routing.module";
import { VideoComponent } from "./video.component";

@NgModule({
  imports: [NativeScriptCommonModule, TNSFontIconModule, TranslateModule, VideoRoutingModule],
  declarations: [VideoComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class VideoModule {}
