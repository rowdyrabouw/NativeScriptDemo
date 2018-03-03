import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { TNSFontIconModule } from "nativescript-ngx-fonticon";
import { TranslateModule } from "@ngx-translate/core";

import { GuessRoutingModule } from "./guess-routing.module";
import { GuessComponent } from "./guess.component";

@NgModule({
  imports: [NativeScriptCommonModule, TNSFontIconModule, TranslateModule, GuessRoutingModule],
  declarations: [GuessComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class GuessModule {}
