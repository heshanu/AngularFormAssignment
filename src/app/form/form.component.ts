import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Observable, Subscription} from 'rxjs';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  studentform!: FormGroup;

  submitted = false;

  isLoading = false;

  /* material form*/
  checked = false;
  indeterminate = false;
  labelPosition: 'before' | 'after' = 'after';
  disabled = false;
  /**/

  checked1 = true;
  checked2 = false;

  get f() {
    return this.studentform.controls;
    // return this.studentForm1.controls;
  }

  // observer part
  orderStatus: any;
  orderStatusObs!: Observable<any>;
  subcription!: Subscription;

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

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.initForm();
    this.initOrderStatus();
  }


  initForm(): void {
    this.studentform = this.formBuilder.group(
      {
        firstName: [
          '',
          [Validators.required, Validators.pattern('[A-Za-z]{4,15}$')],
        ],
        lastName: [
          '',
          [Validators.required, Validators.pattern('[A-Za-z]{4,15}$')],
        ],
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


  onSubmit(): void {
    this.submitted = true;


    if (this.studentform.valid) {

      this.isLoading = true;
     // alert('form 1 successfull');

      // avoiding redudancy data insertion
      setTimeout(() => {
        this.checked1 = false;
        this.checked2 = true;
        this.isLoading = false;
      }, 5000);

    }
  }


  clearForm(): void {
    this.submitted = false;
    this.studentform.reset();
    this.checked1 = true;
  }


}
