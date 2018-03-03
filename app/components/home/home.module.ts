import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { TNSFontIconModule } from "nativescript-ngx-fonticon";
import { TranslateModule } from "@ngx-translate/core";

import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from "./home.component";

@NgModule({
  imports: [NativeScriptCommonModule, TNSFontIconModule, TranslateModule, HomeRoutingModule],
  declarations: [HomeComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class HomeModule {}
