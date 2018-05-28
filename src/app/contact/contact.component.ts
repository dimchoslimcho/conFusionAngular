import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback, ContactType } from '../shared/feedback';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  feedbackForm: FormGroup;
  feedback: Feedback;
  contactType = ContactType;
  formErrors = {
    'firstname': '',
    'lastname': '',
    'telnum': '',
    'email': ''
  };

  validationMessages = {
    'firstname': {
      'required': 'First Name is required.',
      'minlength': 'First Name must be a least 2 characters long',
      'maxlength': 'First Name cannot be more than 25 characters long'
    },
    'lastname': {
      'required': 'Last Name is required.',
      'minlength': 'Last Name must be a least 2 characters long',
      'maxlength': 'Last Name cannot be more than 25 characters long'
    },
    'telnum': {
      'required': 'Tel. Number is required.',
      'pattern': 'Tel. Number must contain only numbers'
    },
    'email': {
      'required': 'Email is required.',
      'email': 'Email not in valid format'
    }

  };

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.feedbackForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      telnum: ['', [Validators.required, Validators.pattern ]],
      email: ['', [Validators.required, Validators.email ]],
      agree: false,
      contacttype: 'None',
      message: ''
    });

    this.feedbackForm.valueChanges.subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); //(re)set form validation messages, this is for when the form is created for the first time
  }

  onValueChanged(data?: any) {//it will posibly take a parameter, if we call this with no parameter all the form errors filed will be cleared
    if(!this.feedbackForm) {return;} //if the feedback form has not been created and if this method is called then it should simply return without anything
    const form = this.feedbackForm;

    for(const field in this.formErrors) {
      this.formErrors[field] = '';
      const control = form.get(field);
      if(control && control.dirty && !control.valid) {//if control is not null and is dirty and is not valid
        const messages = this.validationMessages[field];
        for(const key in control.errors) {  //checking to see if there are any errors there, control.error is available beacause to control is assigned object from the form class
          this.formErrors[field] += messages[key] + ' ' //same naming form erros in the form and in the validation messages (ex required-required...)
        }
      }
    }
  }

  onSubmit() {
    this.feedback = this.feedbackForm.value;
    console.log(this.feedback);
    this.feedbackForm.reset({
      firstname: '',
      lastname: '',
      telnum: '',
      email: '',
      agree: false,
      contacttype: 'None',
      message: ''
    });
  }


}
