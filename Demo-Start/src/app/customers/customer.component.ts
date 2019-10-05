import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, FormBuilder } from '@angular/forms';

import { Customer } from './customer';

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
    this.customerForm = this.formBuilder.group({
      'firstName':'',
      'lastName': '',
      'email':'',
      'sendCatalog': true
  });
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
