import { LightningElement, @wire } from 'lwc';
/* This also works */
//import  BoatMessageChannel__c from '@salesforce/messageChannel/BOATMC__c';
/* This is requested by the superbadge */
import BOATMC from '@salesforce/messageChannel/BOATMC__c';
import { MessageContext, APPLICATION_SCOPE } from 'lightning/messageService';
import { wire } from 'lwc';

export default class SampleTrial extends LightningElement {

    @wire(MessageContext)
    messageContext;
    
    beep(){
        
    }
}