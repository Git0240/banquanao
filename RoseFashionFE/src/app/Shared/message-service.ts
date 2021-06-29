import { MessageModel } from './model';
import { MessageModalComponent } from '../Others/message-modal/message-modal.component';
import { ViewProductListForCustomerComponent } from '../ProductManagement/view-product-list-for-customer/view-product-list-for-customer.component';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
@Injectable()
export class MessageService{
    constructor(private router: Router){}
    SendMessage(messagemodel: MessageModel){
        MessageModalComponent.globalmessage = messagemodel;
        MessageModalComponent.hiddenbutton.click();
    }

    SendKeyword(keyword: string){
        this.router.navigate(['/view-product-list-for-customer']);
        ViewProductListForCustomerComponent.searchkeyword=keyword;
        ViewProductListForCustomerComponent.searchbtn.click();
    }
}