import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-form5',
  templateUrl: './form5.component.html',
  styleUrls: ['./form5.component.css']
})
export class Form5Component implements OnInit {

  get f() {
    return this.studentform.controls;
    // return this.studentForm1.controls;
  }

  constructor(private formBuilder: FormBuilder) {}

  studentform !: FormGroup;

  submitted = false;
  isLoading = false;
  checked2 = false;
  checked1 = true;
  orderStatus: any;
  orderStatusObs!: Observable<any>;
  subcription!: Subscription;

  /* material form*/
  checked = false;
  indeterminate = false;
  labelPosition: 'before' | 'after' = 'after';
  disabled = false;
  /**/

  // checked1 = true;


  ngOnInit(): void {
    this.initForm();
    this.initOrderStatus();
  }


  initForm(): void {
    this.studentform = this.formBuilder.group(
      {
        where: [
          '',
          // tslint:disable-next-line:max-line-length
          [Validators.required]
          // tslint:disable-next-line:only-arrow-functions]
        ],
        linkedin: [
          '',
          // tslint:disable-next-line:max-line-length
          [Validators.required, Validators.pattern('@^(http\\:\\/\\/|https\\:\\/\\/)?([a-z0-9][a-z0-9\\-]*\\.)+[a-z0-9][a-z0-9\\-]*$@i')]
        ],
        github: [
          '',
          // tslint:disable-next-line:max-line-length
          [Validators.required, Validators.pattern('@^(http\\:\\/\\/|https\\:\\/\\/)?([a-z0-9][a-z0-9\\-]*\\.)+[a-z0-9][a-z0-9\\-]*$@i')]
        ],

        future: [
          '',
          [Validators.required, Validators.maxLength(300)]
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
      alert('form 5 successfull');
      // avoiding redudancy data insertion
      setTimeout(() => {
        this.checked1 = false;
        this.isLoading = false;
        this.checked2 = true;
      }, 3000);
    }
  }

  clearForm(): void {
    this.checked1 = true;
    this.submitted = false;
    this.studentform.reset();
  }



}
