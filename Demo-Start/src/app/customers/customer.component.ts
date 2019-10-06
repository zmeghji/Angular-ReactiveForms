import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';

import { Customer } from './customer';

function emailMatch(c: AbstractControl) : {[key:string]:boolean}|null {
  var email = c.get('email').value;
  var confirmEmail = c.get('confirmEmail').value;
  if (email == confirmEmail){
    return null;
  }
  return {'emailMatch':true};

}
function ratingRange(c: AbstractControl) : {[key:string]:boolean}|null {
  if (c.value !== null && (isNaN(c.value) || c.value < 1 || c.value>5)){
    return {'range':true};
  }
  return null;
}

function createRatingRangeValidator(minRating:number, maxRating: number): ValidatorFn{
  return (c: AbstractControl) : {[key:string]:boolean}|null => {
    if (c.value !== null && (isNaN(c.value) || c.value < minRating || c.value>maxRating)){
      return {'range':true};
    }
    return null;
  }
}

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customer = new Customer();
  customerForm : FormGroup;
  constructor(private formBuilder : FormBuilder) { }
  ngOnInit() {
    // this.customerForm = new FormGroup({
    //   firstName: new FormControl(),
    //   lastName: new FormControl(),
    //   email: new FormControl(),
    //   sendCatalog: new FormControl(true)
    // });
    var nestedFormGroup = this.formBuilder.group({
      'email':['',[ Validators.required, Validators.email]],
      'confirmEmail':['',[ Validators.required, Validators.email]]
    }, {validator: emailMatch})
    this.customerForm = this.formBuilder.group({
      'firstName':['',[ Validators.required, Validators.minLength(3)]],
      'lastName': ['',[ Validators.required, Validators.maxLength(50)]],
      'emailGroup':nestedFormGroup,
      'notificationType':'email',
      'phoneNumber': '',
      'sendCatalog': true,
      // 'rating':[1,ratingRange]
      'rating': [1, createRatingRangeValidator(0,10)]
  });
  }
  setNotification(notificationType: string){
    var phoneControl = this.customerForm.get('phoneNumber');
    if (notificationType =='text'){
      phoneControl.setValidators([Validators.required, Validators.minLength(10)]);
    }
    else{
      phoneControl.clearValidators();
    }
    phoneControl.updateValueAndValidity();
  }
  populateTestData(){
    this.customerForm.setValue({
      'firstName':'Naruto',
      'lastName': 'Uzumaki',
      'email': 'naruto.uzumaki@ninja.com',
      'sendCatalog':false
    });
  }
  populateTestData2(){
    this.customerForm.patchValue({
      'firstName':'Naruto',
      'lastName': 'Uzumaki',
      'sendCatalog':false
    });
  }

  save(customerForm: NgForm) {
    console.log(customerForm.form);
    console.log('Saved: ' + JSON.stringify(customerForm.value));
  }
}
