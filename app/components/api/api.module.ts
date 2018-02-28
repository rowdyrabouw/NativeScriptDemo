import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { TNSFontIconModule } from "nativescript-ngx-fonticon";
import { TranslateModule } from "@ngx-translate/core";

import { ApiRoutingModule } from "./api-routing.module";
import { ApiComponent } from "./api.component";
import { ModalComponent } from "./modal.component";

@NgModule({
  imports: [NativeScriptModule, TNSFontIconModule, TranslateModule, ApiRoutingModule],
  declarations: [ApiComponent, ModalComponent],
  entryComponents: [ModalComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class ApiModule {}
