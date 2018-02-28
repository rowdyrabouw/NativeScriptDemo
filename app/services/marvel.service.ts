import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import * as _ from "lodash";

let md5 = require("md5");
let config = require("./../config.json");

@Injectable()
export class MarvelService {
  constructor(private _http: HttpClient) {}

  private _generateBaseUrlWithAuthentication(aResource: string) {
    const lTimestamp = Math.floor(Date.now() / 1000).toString();
    const lHash = md5(lTimestamp + config.private + config.public);
    return config.url + "/" + aResource + "?ts=" + lTimestamp + "&apikey=" + config.public + "&hash=" + lHash;
  }

  SearchByNameStartsWith(aResource: string, aName: string) {
    let url = encodeURI(this._generateBaseUrlWithAuthentication(aResource) + "&nameStartsWith=" + aName);
    return new Promise(resolve => {
      this._http.get(url).subscribe(
        data => {
          resolve(data);
        },
        err => {
          console.log("Error occured.");
          console.log(JSON.stringify(err));
        }
      );
    });
  }
}
