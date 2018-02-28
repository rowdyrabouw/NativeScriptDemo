// Platform
import * as Platform from "platform";

// Angular
import { Injectable } from "@angular/core";

// Plugins
import { TranslateService } from "@ngx-translate/core";

@Injectable()
export class LanguageService {
  private _languages: Array<string> = ["en"];
  private _settings: any = {
    taal: "en"
  };

  translateService: TranslateService;

  constructor(private _translate: TranslateService) {
    let deviceLanguage: string = Platform.device.language;
    let languageIndex = this._languages.indexOf(deviceLanguage);
    if (languageIndex >= 0) {
      this._settings.taal = deviceLanguage;
    }
  }

  initLanguage() {
    this.translateService = this._translate;
    this._translate.addLangs(this._languages);
    this._translate.use(this._settings.taal);
  }

  setLanguage(aTaal: string) {
    this._settings.taal = aTaal;
    this._translate.use(aTaal);
  }

  getLanguage(): string {
    return this._settings.taal;
  }
}
