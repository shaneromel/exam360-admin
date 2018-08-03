import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class PinService {

  constructor() { }

  getPins(){
    return firebase.database().ref("pins").once("value");
  }

  updatePins(pins){
    return firebase.database().ref("pins").set(pins);
  }

}
