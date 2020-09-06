import { LightningElement } from "lwc";
import { NavigationMixin } from "lightning/navigation";
import BOAT_OBJECT from "@salesforce/schema/Boat__c";

export default class BoatSearch extends NavigationMixin(LightningElement) {
  boatTypeId;
  isLoading = false;

  // Handles loading event
  handleLoading() {
    this.isLoading = true;
  }

  // Handles done loading event
  handleDoneLoading() {
    this.isLoading = false;
  }

  // Handles search boat event
  // This custom event comes from the form
  /**
   * @param {Event} event
   */
  searchBoats(event) {
    console.log("boat search is receiving event from boat search form");
    this.boatTypeId = event.detail.boatTypeId;
    let boatSearchR = this.template.querySelector("c-boat-search-results");
    boatSearchR.searchBoats(this.boatTypeId);
  }

  async createNewBoat() {
    this[NavigationMixin.Navigate]({
      type: "standard__objectPage",
      attributes: {
        objectApiName: BOAT_OBJECT.objectApiName,
        actionName: "new"
      }
    });
  }
}
