import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";

import { RecipeBookConstants } from "../../../recipe-book-constants";
import {AuthenticationService} from "../../../services/authentication.service";
import {MessageService} from "../../../services/message.service";

@Component({
  selector: 'rb-sign-in',
  templateUrl: 'sign-in.component.html',
  styleUrls: ['../../shared-styles/signInAndSignUp.component.less']
})
export class SignInComponent implements OnInit {
  
  signInForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private authenticationService: AuthenticationService, private messageService: MessageService, private router: Router) { }

  ngOnInit() {
    this.initForm();
  }
  
  initForm () {
    this.signInForm = this.formBuilder.group({
      'email': ['', [Validators.required, Validators.pattern(RecipeBookConstants.REGEX.EMAIL)]],
      'password': ['', Validators.required],
    });
  };
  
  onSubmit(signInForm: FormGroup) {
    let hasError = false;
    let errorMessage = '';
    this.authenticationService.signInUser(signInForm.value.email, signInForm.value.password).then(function(user) {
    }).catch(function(error) {
      hasError = true;
      errorMessage = error.message;
    });
  
    setTimeout(() => {
      if (hasError) {
        this.messageService.getMessage(errorMessage, RecipeBookConstants.MESSAGE_TYPE.ERROR);
      } else if (this.authenticationService.isAuthenticated()) {
        this.router.navigate(['dashboard']);
        this.messageService.getMessage('success.signIn', RecipeBookConstants.MESSAGE_TYPE.SUCCESS);
      }
    }, 200);
    
  }

}

