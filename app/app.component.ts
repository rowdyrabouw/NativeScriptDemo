import * as Platform from "platform";
import { Component } from "@angular/core";
import { TNSFontIconService } from "nativescript-ngx-fonticon";
import { TranslateService } from "@ngx-translate/core";

@Component({
  moduleId: module.id,
  selector: "ns-app",
  templateUrl: "app.component.html"
})
export class AppComponent {
  constructor(
    private fonticon: TNSFontIconService,
    private translate: TranslateService
  ) {
    this.translate.setDefaultLang("nl");
    this.translate.use(Platform.device.language);
  }
}
