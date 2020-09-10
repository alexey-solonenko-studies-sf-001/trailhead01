import { LightningElement, api, wire } from "lwc";
import getSimilarBoats from "@salesforce/apex/BoatDataService.getSimilarBoats";
import { NavigationMixin } from "lightning/navigation";
import BOAT_OBJECT from "@salesforce/schema/Boat__c";

export default class SimilarBoats extends NavigationMixin(LightningElement) {
  // Private
  currentBoat;
  relatedBoats;
  boatId;
  error;

  @api
  get recordId() {
    return this.boatId;
  }
  set recordId(value) {
    this.setAttribute("boatId", value);
    this.boatId = value;
  }

  @api
  similarBy;

  // Wire custom Apex call, using the import named getSimilarBoats
  // Populates the relatedBoats list
  @wire(getSimilarBoats, { boatId: "$boatId", similarBy: "$similarBy" })
  similarBoats({ error, data }) {
    this.error = undefined;
    this.relatedBoats = undefined;
    console.log("loading similar boats");
    console.log(error);
    console.log(data);
    if (data) {
      console.log("calling wirng metod and having data");
    }
    if (data) {
      this.relatedBoats = data;
      console.log(this.relatedBoats);
    }
    if (error) {
      this.error = error;
    }
  }

  get getTitle() {
    return "Similar boats by " + this.similarBy;
  }
  get noBoats() {
    return !(this.relatedBoats && this.relatedBoats.length > 0);
  }

  openBoatDetailPage(event) {
    console.log("on boat deail page");
    console.log(event);
    this[NavigationMixin.Navigate]({
      type: "standard__recordPage",
      attributes: {
        //objectApiName: BOAT_OBJECT.objectApiName,
        recordId: event.detail.boatId,
        actionName: "view"
      }
    });
  }

  connectedCallback() {
    console.log("connected: " + this.boatId);
  }

  errorCallback(e) {
    console.log("similar boats error callback");
    console.log(JSON.parse(JSON.stringify(e)));
  }
}
