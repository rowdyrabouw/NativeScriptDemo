import { Component } from "@angular/core";
import { ModalDialogParams } from "nativescript-angular/directives/dialogs";

let characters = require("../../assets/data/characters.json");

@Component({
  moduleId: module.id,
  selector: "modal",
  templateUrl: "modal.component.html"
})
export class ModalComponent {
  characterList: Array<string>;

  constructor(private _params: ModalDialogParams) {
    this.characterList = characters;
  }

  close(res: string) {
    this._params.closeCallback(res);
  }
}
