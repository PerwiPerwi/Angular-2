import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { RecipeBookConstants } from "../../../recipe-book-constants";
import { MessageService } from "../../../services/message.service";
import { AuthenticationService } from "../../../services/authentication.service";

@Component({
  selector: 'rb-sign-up',
  templateUrl: 'sign-up.component.html',
  styleUrls: ['../../shared-styles/signInAndSignUp.component.less']
})
export class SignUpComponent implements OnInit {

  signUpForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private messageService: MessageService, private authenticationService: AuthenticationService, private router: Router) { }
  
  ngOnInit() {
    this.initForm();
  }
  
  initForm () {
    this.signUpForm = this.formBuilder.group({
      'email': ['', [Validators.required, Validators.pattern(RecipeBookConstants.REGEX.EMAIL)]],
      'password': ['', Validators.required],
      'confirmPassword': ['', Validators.required],
    });
  };
  
  onSubmit(signUpForm: FormGroup) {
    if (signUpForm.value.password !== signUpForm.value.confirmPassword) {
      return this.messageService.getMessage('error.passwordsDidNotMatch', RecipeBookConstants.MESSAGE_TYPE.ERROR);
    }
    let hasError = false;
    let errorMessage = '';
    this.authenticationService.signUpUser(signUpForm.value.email, signUpForm.value.password).catch(function(error) {
      hasError = true;
      errorMessage = error.message;
    });
    
    setTimeout(() => {
      
      if (hasError) {
        this.messageService.getMessage(errorMessage, RecipeBookConstants.MESSAGE_TYPE.ERROR);
      } else {
        this.messageService.getMessage('success.signUp', RecipeBookConstants.MESSAGE_TYPE.SUCCESS);
        this.router.navigate(['signin']);
      }
    }, 500);
    
  }

}
