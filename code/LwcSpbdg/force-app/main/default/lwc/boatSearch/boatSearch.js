import { LightningElement } from "lwc";
import { NavigationMixin } from "lightning/navigation";

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

  searchBoats(event) {
    console.log("boat search is receiving event from boat search form");
    this.boatTypeId = event.detail.boatTypeId;
    let boatSearchR = this.template.querySelector("c-boat-search-results");
    boatSearchR.searchBoats(this.boatTypeId);
  }

  createNewBoat() {
    this[NavigationMixin.Navigate]({
      type: "standard__objectPage",
      attributes: {
        objectApiName: "Boat__c",
        actionName: "new"
      }
    });
  }
}
