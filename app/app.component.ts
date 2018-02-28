import { Component } from "@angular/core";

import { LanguageService } from "./services/language.service";

@Component({
  selector: "ns-app",
  templateUrl: "app.component.html"
})
export class AppComponent {
  constructor(private _languageService: LanguageService) {}

  ngOnInit() {
    this._languageService.initLanguage();
  }
}
