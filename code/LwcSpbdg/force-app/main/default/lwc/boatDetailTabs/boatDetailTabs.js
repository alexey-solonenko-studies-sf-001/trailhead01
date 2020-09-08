import labelDetails from "@salesforce/label/c.Details";
import labelReviews from "@salesforce/label/c.Reviews";
import labelAddReview from "@salesforce/label/c.Add_Review";
import labelFullDetails from "@salesforce/label/c.Full_Details";
import labelPleaseSelectABoat from "@salesforce/label/c.Please_select_a_boat";

import { LightningElement, wire } from "lwc";
import {
  APPLICATION_SCOPE,
  subscribe,
  MessageContext
} from "lightning/messageService";
import BOATMC from "@salesforce/messageChannel/BoatMessageChannel__c";
import { getRecord, getFieldValue } from "lightning/uiRecordApi";
import BOAT_ID_FIELD from "@salesforce/schema/Boat__c.Id";
import BOAT_NAME_FIELD from "@salesforce/schema/Boat__c.Name";
//import BOAT_TYPE_FIELD from '@salesforce/schema/Boat__c.BoatType__r.Name';
import { NavigationMixin } from "lightning/navigation";

const BOAT_FIELDS = [
  BOAT_ID_FIELD,
  BOAT_NAME_FIELD
  // BOAT_TYPE_FIELD
];

export default class BoatDetailTabs extends NavigationMixin(LightningElement) {
  @wire(MessageContext)
  messageContext;

  boatId;
  @wire(getRecord, { recordId: "$boatId", fields: BOAT_FIELDS })
  wiredRecord;

  label = {
    labelDetails,
    labelReviews,
    labelAddReview,
    labelFullDetails,
    labelPleaseSelectABoat
  };

  // Decide when to show or hide the icon
  // returns 'utility:anchor' or null
  get detailsTabIconName() {
    return this.wiredRecord.data ? "utility:anchor" : null;
  }

  // Utilize getFieldValue to extract the boat name from the record wire
  get boatName() {
    return getFieldValue(this.wiredRecord.data, BOAT_NAME_FIELD);
  }
  // get boatType(){
  //     return getFieldValue(this.wiredRecord.data,BOAT_TYPE_FIELD);
  // }

  // Private
  subscription = null;

  // Subscribe to the message channel
  subscribeMC() {
    this.subscription = subscribe(
      this.messageContext,
      BOATMC,
      (msg) => {
        this.boatId = msg.recordId;
      },
      {
        scope: APPLICATION_SCOPE
      }
    );

    //this.boatId = msg.recordId;

    // local boatId must receive the recordId from the message
  }

  // Calls subscribeMC()
  connectedCallback() {
    if (this.subscription === null) {
      this.subscribeMC();
    }
  }

  // Navigates to record page
  navigateToRecordViewPage() {
    this[NavigationMixin.Navigate]({
      type: "standard__recordPage",
      attributes: {
        objectApiName: "Boat__c",
        actionName: "view",
        recordId: this.boatId
      }
    });
  }

  // Navigates back to the review list, and refreshes reviews component
  handleReviewCreated() {
    console.log("HANDLE REVIEW CREATED");
    this.template
      .querySelector("lightning-tabset")
      .setAttribute("active-tab-value", "reviews");
    console.log(
      this.template
        .querySelector("lightning-tabset")
        .getAttribute("active-tab-value")
    );
    console.log(this.template.querySelector("lightning-tabset").value);
    this.template.querySelector("lightning-tabset").value = "reviews";
    this.template
      .querySelector("lightning-tabset")
      .dispatchEvent(new CustomEvent("change"));

    let reviewsTab = this.template.querySelectorAll("lightning-tab")[1];
    //reviewsTab.click();
    console.log(reviewsTab.className);
    let review = this.template.querySelector("c-boat-reviews");
    console.log(review);
    review.refresh();

    // let tabs = Array.from(this.template.querySelectorAl('lightning-tab'));
    // tabs.find((t) => {

    // });
  }

  errorCallback(error, stack) {
    console.log("boat deails tab comp error");
    console.log(error);
    console.log(stack);
  }
}
