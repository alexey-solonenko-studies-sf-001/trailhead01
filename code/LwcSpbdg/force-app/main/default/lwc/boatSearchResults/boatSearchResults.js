import { LightningElement, wire, api } from "lwc";
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
  selectedBoatId;
  columns = [];

  boatTypeId = "";

  boats;

  isLoading = false;

  @wire(MessageContext)
  messageContext;

  @wire(getBoats, { boatTypeId: "$boatTypeId" })
  wiredBoats(results) {
    try {
      this.boats = results;
      console.log(
        "boats loading completed, this.boatTypeId: ",
        this.boatTypeId,
        " this.boats:"
      );
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
  searchBoats(boatTypeId) {
    console.log(
      "boatSearchResult.searchBoats is called with boatTypeId: ",
      boatTypeId
    );
    // if (this.isLoading) {
    //     console.log(
    //         "boatSearchResuls is returning from searchBoats cause its still loading"
    //     );
    //     return;
    // }

    this.boatTypeId = boatTypeId;
    this.notifyLoading(true);
    console.log(
      "search boats completed notify loading, currently set this.boatTypeId: ",
      this.boatTypeId
    );
    this.boats.data = undefined;
    this.boats.error = undefined;
    // //console.log('boat type id now: ', this.boatTypeId);
    // console.log("boat type id we are going to assign: ", boatTypeId);
    // //this.boatTypeId = boatTypeId;
    // getBoats({boatTypeId:boatTypeId}).then((data) => {
    //     this.boats = data;
    //     this.notifyLoading(false);
    //     console.log('completed manual loading of boats');
    //     console.log(this.boats);
    // });

    //this.boats =

    // refreshApex(this.boats).then(() => {
    //     console.log('refreshApex return');
    //     console.log(arguments);
    //     this.notifyLoading(false);
    //     this.notifyLoading(false);
    // });
    //this.boats = await getBoats(boatTypeId);

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
    console.log("notify loading completed and dispatched: ", evt);
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

  renderedCallback() {
    console.log(
      "rendered callback is been called, boat type id is: ",
      this.boatTypeId
    );
    console.log(
      "rendered callback is been called, selected boat id is: ",
      this.selectedBoatId
    );
  }
}
