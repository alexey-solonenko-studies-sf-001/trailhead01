import { LightningElement, wire, api, track } from "lwc";
import { refreshApex } from "@salesforce/apex";
import getBoats from "@salesforce/apex/BoatDataService.getBoats";
import BOATMC from "@salesforce/messageChannel/BoatMessageChannel__c";
import { MessageContext, publish } from "lightning/messageService";

// const SUCCESS_TITLE = 'Success';
// const MESSAGE_SHIP_IT = 'Ship it!';
// const SUCCESS_VARIANT = 'success';
// const ERROR_TITLE = 'Error';
// const ERROR_VARIANT = 'error';

export default class BoatSearchResults extends LightningElement {
  selectedBoatId = "";
  columns = [];

  //@track
  boatTypeId = "";
  @track
  boats;

  isLoading = false;

  @wire(MessageContext)
  messageContext;

  @wire(getBoats, { boatTypeId: "$boatTypeId" })
  wiredBoats(results) {
    try {
      console.log("boats loading completed");
      console.log("results");
      console.log(results);
      //this.boats = JSON.parse(JSON.stringify(results));
      this.boats = results;
      console.log(JSON.parse(JSON.stringify(results)));
      console.log("this.boats");
      console.log(JSON.parse(JSON.stringify(this.boats)));

      this.notifyLoading(false);
    } catch (e) {
      console.log("boats loading error");
      console.log(e);
    }
  }

  //@api
  //async searchBoats(boatTypeId) {
  @api
  async searchBoats(boatTypeId) {
    if (this.isLoading) {
      console.log(
        "boatSearchResuls is returning from searchBoats cause its still loading"
      );
      return;
    }
    this.notifyLoading(true);
    //console.log('boat type id now: ', this.boatTypeId);
    console.log("boat type id we are going to assign: ", boatTypeId);
    this.boatTypeId = boatTypeId;
    this.boats = await refreshApex(this.boats);
    this.notifyLoading(false);
    //console.log('boat type id assigned: ', this.boatTypeId);
  }

  @api
  async refresh() {
    this.notifyLoading(true);
    await refreshApex(this.boats);
    this.notifyLoading(false);
  }

  /**
   *
   * @param {boolean} isLoading
   */
  notifyLoading(isLoading) {
    let evt = isLoading ? "loading" : "doneloading";
    this.isLoading = isLoading;
    this.dispatchEvent(new CustomEvent(evt));
  }

  /**
   *
   * @param {Event} event
   */
  updateSelectedTile(event) {
    this.selectedBoatId = event.detail.boatId;
    this.sendMessageService(event.detail.boatId);
  }

  /**
   *
   * @param {String} boatId
   */
  sendMessageService(boatId) {
    publish(this.messageContext, BOATMC, {
      recordId: boatId
    });
  }
}
