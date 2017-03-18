import { Injectable } from '@angular/core';

import { ToastOptions, ToastyService } from "ng2-toasty";
import { TranslateService } from "ng2-translate";
import { RecipeBookConstants } from "../recipe-book-constants";

@Injectable()
export class MessageService {

  constructor(private toastyService: ToastyService, private translateService: TranslateService) { }
  
  getMessage(messageKey: string, messageType: string, messageTitleKey? :string) {
    
    let toastOptions: ToastOptions = {
      title: messageTitleKey ? this.getTranslatedString(messageTitleKey) : '',
      showClose: true,
      timeout: 5000,
      theme: 'bootstrap',
    };
    
    switch (messageType) {
      case RecipeBookConstants.MESSAGE_TYPE.SUCCESS:
        toastOptions.msg = this.getTranslatedString(messageKey);
        this.toastyService.success(toastOptions);
        break;
      case RecipeBookConstants.MESSAGE_TYPE.ERROR:
        toastOptions.msg = this.getTranslatedString('error.' + messageKey);
        this.toastyService.error(toastOptions);
        break;
    }
  }
  
  getTranslatedString(messageKey: string) {
    let message: string = '';
    this.translateService.get(messageKey).subscribe(
      data => {
        message = data;
      });
    
    return message;
  }

}
