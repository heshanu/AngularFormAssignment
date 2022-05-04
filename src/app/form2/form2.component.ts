import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-form2',
  templateUrl: './form2.component.html',
  styleUrls: ['./form2.component.css']
})
export class Form2Component implements OnInit {

  get f() {
    return this.studentform.controls;
    // return this.studentForm1.controls;
  }

  constructor(private formBuilder: FormBuilder) {
  }

  studentform !: FormGroup;

  submitted = false;
  isLoading = false;
  checked2 = false;

  /* material form*/
  checked = false;
  indeterminate = false;
  labelPosition: 'before' | 'after' = 'after';
  disabled = false;
  /**/

  checked1 = true;

  // observer part
  orderStatus: any;
  orderStatusObs!: Observable<any>;
  subcription!: Subscription;

  ngOnInit(): void {
    this.initForm();
    this.initOrderStatus();
  }


  initForm(): void {
    this.studentform = this.formBuilder.group(
      {
        address: [
          '',
          [Validators.required, Validators.pattern('[A-Za-z]{4,15}$')]
        ],
        city: [
          '',
          [Validators.required, Validators.pattern('[A-Za-z]{4,15}$')]
        ],
        zipcode: [
          '',
          [Validators.required, Validators.pattern('^[0-9]{5}(?:-[0-9]{4})?$')],
        ]

        /*
        dob: ['', [Validators.required]],
        contactNo: ['', [Validators.required, Validators.pattern('/^(\\+\\d{1,3}[- ]?)?\\d{10}$/')]],
        address: ['', [Validators.required], Validators.maxLength(200)],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.minLength(8), Validators.required]],
        conformPassword: ['', [Validators.minLength(8), Validators.required]]
     */
      },
    );
  }

  initOrderStatus() {
    this.orderStatusObs = new Observable((observer) => {
      setTimeout(() => {
        observer.next('in progress');
      }, 1000);
      setTimeout(() => {
        observer.next('processing!');
      }, 2000);
      setTimeout(() => {
        observer.next('completed!');
      }, 3000);
    });

    this.subcription = this.orderStatusObs.subscribe((value: any) => {
      this.orderStatus = value;
    });
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.studentform.valid) {

      this.isLoading = true;
      alert('form 2 successfull');
      // avoiding redudancy data insertion
      setTimeout(() => {
        console.log('Response');
        this.checked1 = false;
        this.isLoading = false;
        this.checked2 = true;
      }, 1000);
      console.log();

    }
  }

  clearForm(): void {
    this.submitted = false;
    this.studentform.reset();
  }


}
