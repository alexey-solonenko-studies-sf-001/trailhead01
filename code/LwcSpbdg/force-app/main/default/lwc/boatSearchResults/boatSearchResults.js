import { LightningElement, wire, api } from "lwc";
import { refreshApex } from "@salesforce/apex";
import getBoats from "@salesforce/apex/BoatDataService.getBoats";
import BOATMC from "@salesforce/messageChannel/BoatMessageChannel__c";
import { MessageContext, publish } from "lightning/messageService";
import { updateRecord } from "lightning/uiRecordApi";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
// import ID_FIELD from "@salesforce/schema/Boat__c.Id";
// import NAME_FIELD from "@salesforce/schema/Boat__c.Name";
// import LENGTH_FIELD from "@salesforce/schema/Boat__c.Length__c";
// import PRICE_FIELD from "@salesforce/schema/Boat__c.Price__c";
// import DESCRIPTION_FIELD from "@salesforce/schema/Boat__c.Description__c";

const SUCCESS_TITLE = "Success";
const MESSAGE_SHIP_IT = "Ship it!";
const SUCCESS_VARIANT = "success";
const ERROR_TITLE = "Error";
const ERROR_VARIANT = "error";

export default class BoatSearchResults extends LightningElement {
  selectedBoatId;

  // columns = [
  //   { label: "Name", fieldName: NAME_FIELD.fieldApiName, editable: true },
  //   {
  //     label: "Length",
  //     fieldName: LENGTH_FIELD.fieldApiName,
  //     type: "number",
  //     typeAttributes: { maximumFractionDigits: 2 },
  //     editable: true
  //   },
  //   {
  //     label: "Price",
  //     fieldName: PRICE_FIELD.fieldApiName,
  //     type: "currency",
  //     typeAttributes: { currencyCode: "USD", maximumFractionDigits: 2 },
  //     editable: true
  //   },
  //   {
  //     label: "Description",
  //     fieldName: DESCRIPTION_FIELD.fieldApiName,
  //     editable: true
  //   }
  // ];

  columns = [
    { label: "Name", fieldName: "Name", editable: true },
    {
      label: "Length",
      fieldName: "Length__c",
      type: "number",
      typeAttributes: { maximumFractionDigits: 2 },
      editable: true
    },
    {
      label: "Price",
      fieldName: "Price__c",
      type: "currency",
      typeAttributes: { currencyCode: "USD", maximumFractionDigits: 2 },
      editable: true
    },
    {
      label: "Description",
      fieldName: "Description__c",
      editable: true
    }
  ];

  boatTypeId = "";

  // get boatTypeId(){
  //   return this.boatTypeId;
  // }
  // set boatTypeId(val){
  //   this.setAttribute('boatTypeId',this.val);
  //   this.boatTypeId = val;
  // }

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
      this.isLoading = false;
      this.notifyLoading(this.isLoading);
    } catch (e) {
      console.log("boats loading error");
      console.log(e);
    }
  }

  @api
  searchBoats(boatTypeId) {
    this.boatTypeId = boatTypeId;
    this.isLoading = true;
    this.notifyLoading(this.isLoading);
    //   if (this.isLoading) {
    //     console.log(
    //         "boatSearchResuls is returning from searchBoats cause its still loading"
    //     );
    //     ;
    // }
  }

  @api
  async refresh() {
    this.isLoading = true;
    this.notifyLoading(this.isLoading);
    await refreshApex(this.boats);
    this.isLoading = false;
    this.notifyLoading(this.isLoading);
  }

  updateSelectedTile(event) {
    console.log("receiving event", event);
    try {
      this.selectedBoatId = event.detail.boatId;
      this.sendMessageService(event.detail.boatId);
    } catch (e) {
      console.log(e);
    }
  }

  sendMessageService(boatId) {
    publish(this.messageContext, BOATMC, {
      recordId: boatId
    });
  }

  handleSave(event) {
    const recordInputs = event.detail.draftValues.slice().map((draft) => {
      const fields = Object.assign({}, draft);
      return { fields };
    });
    const promises = recordInputs.map((recordInput) =>
      updateRecord({ fields: recordInput.fields })
    );
    Promise.all(promises)
      .then(() => {
        const succEv = new ShowToastEvent({
          title: SUCCESS_TITLE,
          variant: SUCCESS_VARIANT,
          message: MESSAGE_SHIP_IT
        });
        this.dispatchEvent(succEv);
      })
      .then(() => {
        this.refresh();
      })
      .catch((e) => {
        const errEv = new ShowToastEvent({
          title: ERROR_TITLE,
          variant: ERROR_VARIANT,
          message: e.toString()
        });
        this.dispatchEvent(errEv);
      })
      .finally(() => {});
  }

  notifyLoading(isLoading) {
    let evt = isLoading ? "loading" : "doneloading";
    //this.isLoading = isLoading;
    this.dispatchEvent(new CustomEvent(evt));
  }

  renderedCallback() {
    console.log(
      "rendered callback is been called, boat type id is: " +
        JSON.parse(JSON.stringify(this.boatTypeId))
    );
  }
}
