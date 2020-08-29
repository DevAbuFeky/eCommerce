import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MainShopFormService } from 'src/app/services/main-shop-form.service';
import { Country } from 'src/app/common/country';
import { State } from 'src/app/common/state';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup: FormGroup;

  totalPrice: number = 0;
  totalQuantity: number = 0;

  creditCardYears: number [] = [];
  creditCardMonths: number [] = [];

  countries: Country[] = [];
  shippingAddressStates: State[] = [];
  billingAddressStates: State[] = [];

  constructor(private formBuilder: FormBuilder,
              private mainShopFormServices: MainShopFormService) { }

  ngOnInit(): void {

    // Build the form name >> customer
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        // FormControl names .. these are the form fields
        firstName : new FormControl('',[Validators.required, Validators.minLength(5)]),
        lastName : new FormControl('', [Validators.required, Validators.minLength(5)]),
        email : new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])
      }),
      shippingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        zipCode: [''],
        state: [''],
        country: ['']
      }),
      billingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        zipCode: [''],
        state: [''],
        country: ['']
      }),
      creditCard: this.formBuilder.group({
        cardType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        securityCode: [''],
        expirationMonth: [''],
        expirationYear: ['']
      })
    });

    // populate credit card month
    const startMonth: number = new Date().getMonth() + 1;
    console.log("startMonth" + startMonth);

    this.mainShopFormServices.getCreditCardMonths(startMonth).subscribe(
      data => {
        console.log("Retrieved credit card months: " + JSON.stringify(data));
        this.creditCardMonths = data;
      }
    );

    // populate credit card year
    this.mainShopFormServices.getCreditCardYears().subscribe(
      data => {
        console.log("Retrieved credit card Years: " + JSON.stringify(data));
        this.creditCardYears = data;
      }
    );

    // populate countries
    this.mainShopFormServices.getCountries().subscribe(
      data => {
        console.log("Retrive Countries:" + JSON.stringify(data));
        this.countries = data;
      }
    );

  }

  //get customer data
  get firstName() { return this.checkoutFormGroup.get('customer.firstName'); }
  get lastName() { return this.checkoutFormGroup.get('customer.lastName'); }
  get email() { return this.checkoutFormGroup.get('customer.email'); }

  // checkbox copy data
  copyShippingAddressToBillingAddress(event){
    if (event.target.checked){
      this.checkoutFormGroup.controls.billingAddress
      .setValue(this.checkoutFormGroup.controls.shippingAddress.value);

      this.billingAddressStates = this.shippingAddressStates;
    }
    else {
      this.checkoutFormGroup.controls.billingAddress.reset();

      this.billingAddressStates = [];
    }

  }

  // Method to call when submit button is clicked
  onSubmit(){
    console.log("Handling the submit button");

    if(this.checkoutFormGroup.invalid){
      this.checkoutFormGroup.markAllAsTouched();
    }

    console.log(this.checkoutFormGroup.get('customer').value);
    console.log(this.checkoutFormGroup.get('shippingAddress').value);
    console.log(this.checkoutFormGroup.get('billingAddress').value);
    console.log(this.checkoutFormGroup.get('creditCard').value);
    console.log("The email address is " + this.checkoutFormGroup.get('customer').value.email);
    console.log("The shipping address country is " + this.checkoutFormGroup.get('shippingAddress').value.country.name);
    console.log("The shipping address state is " + this.checkoutFormGroup.get('shippingAddress').value.state.name);
  }

  handelMonthsAndYears(){
    const creditCardFromGroup = this.checkoutFormGroup.get('creditCard');
    const currentYear: number = new Date().getFullYear();
    const selectYear: number = Number(creditCardFromGroup.value.expirationYear);

    // if the current year equals the selected year, the start with the current month

    let startMonth: number;
    if(currentYear == selectYear){
      startMonth = new Date().getMonth() + 1;
    }
    else{
      startMonth = 1;
    }

    this.mainShopFormServices.getCreditCardMonths(startMonth).subscribe(
      data => {
        console.log("Retrieved credit card months: " + JSON.stringify(data));
        this.creditCardMonths = data;
      }
    );
  }

  getStates(formGroupName: string){
    const formGroup = this.checkoutFormGroup.get(formGroupName);

    const countryCode = formGroup.value.country.code;
    const countryName = formGroup.value.country.name;

    console.log(`${formGroupName} country code: ${countryCode}`);
    console.log(`${formGroupName} country name: ${countryName}`);

    this.mainShopFormServices.getStates(countryCode).subscribe(
      data => {
        if (formGroupName == 'shippingAddress'){
          this.shippingAddressStates = data;
        }
        else{
          this.billingAddressStates = data;
        }

        // select the first state as the default 
        formGroup.get('state').setValue(data[0]);
      }
    );
  }
}
