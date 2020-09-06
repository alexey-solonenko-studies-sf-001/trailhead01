import { LightningElement, api, wire } from "lwc";
import getBoatsByLocation from "@salesforce/apex/BoatDataService.getBoatsByLocation";
// import { MessageContext, subscribe } from 'lightning/messageService';
// import BOATMC from '@salesforce/messageChannel/BoatNessageChannel__c';
import { ShowToastEvent } from "lightning/platformShowToastEvent";
const LABEL_YOU_ARE_HERE = "You are here!";
const ICON_STANDARD_USER = "standard:user";
const ERROR_TITLE = "Error loading Boats Near Me";
const ERROR_VARIANT = "error";

export default class BoatsNearMe extends LightningElement {
  @api
  boatTypeId;
  mapMarkers = [];
  isLoading = true;
  latitude;
  longitude;
  isRendered;

  subscription = null;

  // connectedCallback(){
  //     this.subscription = subscribe(this.messageContext, BOATMC, (message) => {
  //         this.isLoading = true;
  //         console.log(message);

  //       });
  // }

  @wire(getBoatsByLocation, {
    latitude: "$latitude",
    longitude: "$longitude",
    boatTypeId: "$boatTypeId"
  })
  wiredBoatsJSON(res) {
    if (res.data) {
      let obj = JSON.parse(res.data);
      console.log(obj);
      this.createMapMarkers(obj);
    } else if (res.error) {
      let toastEvt = new ShowToastEvent({
        title: ERROR_TITLE,
        variant: ERROR_VARIANT,
        message: res.error
      });
      this.dispatchEvent(toastEvt);
      this.isLoading = false;
    }
  }

  createMapMarkers(boatData) {
    this.mapMarkers = [];
    this.mapMarkers.push({
      icon: ICON_STANDARD_USER,
      title: LABEL_YOU_ARE_HERE,
      location: {
        Latitude: this.latitude,
        Longitude: this.longitude
      }
    });
    boatData.forEach((r) => {
      this.mapMarkers.push({
        title: r.Name,
        location: {
          Latitude: r.Geolocation__Latitude__s,
          Longitude: r.Geolocation__Longitude__s
        }
      });
    });
    console.log(this.mapMarkers);
    this.isLoading = false;
  }

  renderedCallback() {
    if (!this.isRendered) {
      this.isRendered = true;
      this.getLocationFromBrowser();
    }
  }

  getLocationFromBrowser() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
    });
  }
}
