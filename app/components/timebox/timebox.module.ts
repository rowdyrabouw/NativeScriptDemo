import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { TNSFontIconModule } from "nativescript-ngx-fonticon";
import { TranslateModule } from "@ngx-translate/core";

import { TimeboxRoutingModule } from "./timebox-routing.module";
import { TimeboxComponent } from "./timebox.component";

@NgModule({
  imports: [NativeScriptModule, TNSFontIconModule, TranslateModule, TimeboxRoutingModule],
  declarations: [TimeboxComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class TimeboxModule {}
