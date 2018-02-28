import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { ModalDialogService } from "nativescript-angular/directives/dialogs";
import { ModalComponent } from "./modal.component";

import { ListPicker } from "ui/list-picker";
import { TextField } from "ui/text-field";

import { SideDrawerComponent } from "../../shared/sidedrawer/sidedrawer.component";

import { MarvelService } from "./../../services/marvel.service";

let characters = require("../../assets/data/characters.json");

@Component({
  moduleId: module.id,
  selector: "Api",
  templateUrl: "api.component.html"
})
export class ApiComponent implements OnInit {
  name: string;
  description: string;
  image: string;

  characterList: Array<string>;
  pickedCharacter: string;
  showListPicker: boolean = false;

  constructor(
    private _sidedrawerComponent: SideDrawerComponent,
    private _marvelService: MarvelService,
    private _modal: ModalDialogService,
    private _vcRef: ViewContainerRef
  ) {
    this.characterList = characters;
  }

  toggleDrawer() {
    this._sidedrawerComponent.toggleDrawer();
  }

  ngOnInit() {
    this._sidedrawerComponent.selectedPage = "api";
  }

  SelectedIndexChanged(args) {
    let picker = <ListPicker>args.object;
    this.pickedCharacter = this.characterList[picker.selectedIndex];
  }

  SearchCharacter(args) {
    let textField = <TextField>args.object;
    let text = textField.text;
    if (text.length >= 3) {
      this.pickedCharacter = text;
    }
  }

  ShowListPicker() {
    this.showListPicker = true;
  }

  ShowCharacter() {
    this.showListPicker = false;
    this._marvelService.SearchByNameStartsWith("characters", this.pickedCharacter).then(res => {
      // data is of type Object and properties can't be accessed directly
      // cast the response Object to a type with an interface or use the [""] trick
      console.log(JSON.stringify(res));

      let resultCount = res["data"].count;
      if (resultCount > 0) {
        let data = res["data"].results[0];
        this.name = data.name;
        this.description = data.description;
        let thumbnail = data.thumbnail;
        this.image = thumbnail.path.replace("http", "https") + "." + thumbnail.extension;
      } else {
        alert("Character not found!");
      }
    });
  }

  ClearCharacter() {
    this.name = "";
    this.description = "";
    this.image = "";
  }

  showModal() {
    let options = {
      context: {},
      fullscreen: true,
      viewContainerRef: this._vcRef
    };
    this._modal.showModal(ModalComponent, options).then(res => {
      this.pickedCharacter = res;
      this.ShowCharacter();
    });
  }
}
