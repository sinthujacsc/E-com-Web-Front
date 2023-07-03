import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from '@shared/services/common.service';
import { environment } from 'environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';

// import sagepay from "@mhayk/sagepay";


const sagepay = require("@mhayk/sagepay");
const Client = sagepay.Client;


// Gets Access Token stored in environment variable
const VENDOR_NAME = environment.VENDOR_NAME
const SANDBOX_INTEGRATION_KEY = environment.SANDBOX_INTEGRATION_KEY
const SANDBOX_INTEGRATION_PASSWORD = environment.SANDBOX_INTEGRATION_PASSWORD
const vendorTxCode = `${Math.random().toString(36).substring(2, 8)}-${Date.now().toString(36)}`;

const client = new Client({
  vendor_name: VENDOR_NAME,
  integration_key: SANDBOX_INTEGRATION_KEY,
  integration_password: SANDBOX_INTEGRATION_PASSWORD,
  environment: "sandbox",
  card: "007",
});

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cartItems: any;
  allCompany: any;
  shippingServiceDe: any = [];
  isViewed: boolean = false;
  isOpayo: boolean = false;
  isCash: boolean = false;
  user: any;
  allService: any;
  salesBrief: any = {};
  serviceDe: any;
  saleBriefForm: any;
  saleBreifIdToUpdate = null;
  infoData: any;
  paymentForm: any;


  constructor(private router: Router, private modalService: NgbModal, private toastr: ToastrService, public formBuilder: FormBuilder, private cookieService: CookieService, private service: CommonService) { }


  ngOnInit(): void {

    this.user = JSON.parse(this.cookieService.get('user'));

    this.saleBriefForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      companyName: [''],
      billingCountry: ['', [Validators.required]],
      billingAdd1: ['', [Validators.required]],
      billingAdd2: [''],
      billingCity: ['', [Validators.required]],
      billingPostcode: ['', [Validators.required]],
      mobileNum: ['', [Validators.required]],
      email: ['', [Validators.required]],
      shippingFirstName: [''],
      shippingLastName: [''],
      shippingCountry: [''],
      shippingCompany: [''],
      shippingAdd1: [''],
      shippingAdd2: [''],
      shippingEmail: [''],
      shippingPostcode: [''],
      shippingCity: [''],
      shippingMobileNum: [''],
      discriptionOf: ['']


    });
    this.paymentForm = this.formBuilder.group({
      cardholderName: ['', [Validators.required]],
      cardNumber: ['', [Validators.required]],
      expiryDate: ['', [Validators.required]],
      securityCode: ['', [Validators.required]]
    });
    this.loadAllCompany();

    this.loadService();
    setTimeout(() => {
      this.loadCheckout();
    }, 1000);
    this.onEditUserInfo();

    this.cartItems = JSON.parse(localStorage.getItem('cartItems'));
    console.log(this.cartItems);

  }
  formatExpiryDate(event: Event) {
    const input = event.target as HTMLInputElement;
    let value = input.value;

    value = value.replace(/\D/g, ''); // Remove non-digit characters

    if (value.length > 2) {
      value = value.slice(0, 2) + ' / ' + value.slice(2);
    }

    input.value = value;
    this.paymentForm.get('expiryDate')?.setValue(value);
  }

  formatCardNumber(event: Event) {
    const input = event.target as HTMLInputElement;
    let value = input.value;

    value = value.replace(/\D/g, ''); // Remove non-digit characters

    if (value.length > 4) {
      value = value.match(new RegExp('.{1,4}', 'g')).join(' ');
    }

    input.value = value;
    this.paymentForm.get('cardNumber')?.setValue(value);
  }

  formatSecurityCode(event: Event) {
    const input = event.target as HTMLInputElement;
    let value = input.value;

    value = value.replace(/\D/g, ''); // Remove non-digit characters

    input.value = value;
    this.paymentForm.get('securityCode')?.setValue(value);
  }

  onEditUserInfo() {
    this.service.GetById('customer', this.user.custId).subscribe(
      (item: any) => {
        this.saleBriefForm.controls['firstName'].setValue(item.firstName);
        this.saleBriefForm.controls['lastName'].setValue(item.lastName);
        this.saleBriefForm.controls['email'].setValue(item.email);
        this.saleBriefForm.controls['billingAdd1'].setValue(item.billingAdd1);
        this.saleBriefForm.controls['billingAdd2'].setValue(item.billingAdd2);
        this.saleBriefForm.controls['billingCity'].setValue(item.billingCity);
        this.saleBriefForm.controls['billingCountry'].setValue(item.billingCountry);
        this.saleBriefForm.controls['billingPostcode'].setValue(item.billingPostcode);
        this.saleBriefForm.controls['mobileNum'].setValue(item.mobileNum);

      },
      err => {
        console.log(err);
      }
    );
  }
  async onSubmit() {
console.clear();
console.log("isOpayo",this.isOpayo,"isCash",this.isCash);
    if((this.isCash ==false)  && (this.isOpayo==false))
    {
      this.toastr.error("Plese select the payment type");
      return;
    }

    if (this.isOpayo === true) {
      this.user = JSON.parse(this.cookieService.get('user'));
      var userId = this.user.custId;
      this.shippingServiceDe = JSON.parse(localStorage.getItem('shippingServiceDe'));
      // console.log(this.shippingServiceDe[0].checkoutPrice);

      this.shippingServiceDe = this.shippingServiceDe.filter(x => x.userId === userId);
      //  console.log(this.shippingServiceDe.checkoutPrice);

      this.salesBrief.firstName = this.saleBriefForm.get('firstName').value;
      this.salesBrief.lastName = this.saleBriefForm.get('lastName').value;
      this.salesBrief.email = this.saleBriefForm.get('email').value;
      this.salesBrief.companyName = this.saleBriefForm.get('companyName').value;
      this.salesBrief.billingAdd1 = this.saleBriefForm.get('billingAdd1').value;
      this.salesBrief.billingAdd2 = this.saleBriefForm.get('billingAdd2').value;
      this.salesBrief.billingCity = this.saleBriefForm.get('billingCity').value;
      this.salesBrief.billingCountry = this.saleBriefForm.get('billingCountry').value;
      this.salesBrief.billingPostcode = this.saleBriefForm.get('billingPostcode').value;
      this.salesBrief.mobileNum = this.saleBriefForm.get('mobileNum').value;
      this.salesBrief.grossTotal = this.shippingServiceDe[0].checkoutPrice;
      this.salesBrief.netTotal = this.shippingServiceDe[0].checkoutPrice;
      this.salesBrief.totalPaid = this.shippingServiceDe[0].checkoutPrice;
      this.salesBrief.manAmount = this.shippingServiceDe[0].checkoutPrice;
      this.salesBrief.netAmount = this.shippingServiceDe[0].checkoutPrice;
      this.salesBrief.cashTendered = this.shippingServiceDe[0].checkoutPrice;
      this.salesBrief.serviceId = this.shippingServiceDe[0].serviceId;
      this.salesBrief.compId = this.allCompany[0].custId;
      this.salesBrief.compName = '';
      this.salesBrief.custId = this.user.custId;
      this.salesBrief.discriptionOf = '';

      if (this.isViewed == true) {
        this.salesBrief.shippingFirstName = this.saleBriefForm.get('shippingFirstName').value;
        this.salesBrief.shippingLastName = this.saleBriefForm.get('shippingLastName').value;
        this.salesBrief.shippingCompany = '';
        this.salesBrief.shippingAdd1 = this.saleBriefForm.get('shippingAdd1').value;
        this.salesBrief.shippingAdd2 = this.saleBriefForm.get('shippingAdd2').value;
        this.salesBrief.shippingCity = this.saleBriefForm.get('shippingCity').value;
        this.salesBrief.shippingCountry = this.saleBriefForm.get('shippingCountry').value;
        this.salesBrief.shippingEmail = this.saleBriefForm.get('shippingEmail').value;
        this.salesBrief.shippingPostcode = this.saleBriefForm.get('shippingPostcode').value;
        this.salesBrief.shippingMobileNum = this.saleBriefForm.get('shippingMobileNum').value;
      }
      else {
        this.salesBrief.shippingFirstName = this.saleBriefForm.get('firstName').value;
        this.salesBrief.shippingLastName = this.saleBriefForm.get('lastName').value;
        this.salesBrief.shippingCompany = '';
        this.salesBrief.shippingAdd1 = this.user.shippingAdd1;
        this.salesBrief.shippingAdd2 = this.user.shippingAdd2;
        this.salesBrief.shippingCity = this.user.shippingCity;
        this.salesBrief.shippingCountry = this.user.shippingCountry;
        this.salesBrief.shippingEmail = this.saleBriefForm.get('email').value;
        this.salesBrief.shippingPostcode = this.user.shippingPostcode;
        this.salesBrief.shippingMobileNum = this.saleBriefForm.get('mobileNum').value;
      }

      console.log(this.salesBrief);

      setTimeout(() => {
        console.log('Timeout function called');
        // this.info = 'info';
        const size = '1000';
        this.modalService.open(this.info, { size: size });
      }, 2000);

    }
    if (this.isCash === true) {
      this.user = JSON.parse(this.cookieService.get('user'));
      var userId = this.user.custId;
      this.shippingServiceDe = JSON.parse(localStorage.getItem('shippingServiceDe'));
      // console.log(this.shippingServiceDe[0].checkoutPrice);

      this.shippingServiceDe = this.shippingServiceDe.filter(x => x.userId === userId);
      //  console.log(this.shippingServiceDe.checkoutPrice);

      this.salesBrief.firstName = this.saleBriefForm.get('firstName').value;
      this.salesBrief.lastName = this.saleBriefForm.get('lastName').value;
      this.salesBrief.email = this.saleBriefForm.get('email').value;
      this.salesBrief.companyName = '';
      this.salesBrief.billingAdd1 = this.saleBriefForm.get('billingAdd1').value;
      this.salesBrief.billingAdd2 = this.saleBriefForm.get('billingAdd2').value;
      this.salesBrief.billingCity = this.saleBriefForm.get('billingCity').value;
      this.salesBrief.billingCountry = this.saleBriefForm.get('billingCountry').value;
      this.salesBrief.billingPostcode = this.saleBriefForm.get('billingPostcode').value;
      this.salesBrief.mobileNum = this.saleBriefForm.get('mobileNum').value;
      this.salesBrief.grossTotal = this.shippingServiceDe[0].checkoutPrice;
      this.salesBrief.netTotal = this.shippingServiceDe[0].checkoutPrice;
      this.salesBrief.totalPaid = this.shippingServiceDe[0].checkoutPrice;
      this.salesBrief.manAmount = this.shippingServiceDe[0].checkoutPrice;
      this.salesBrief.netAmount = this.shippingServiceDe[0].checkoutPrice;
      this.salesBrief.cashTendered = this.shippingServiceDe[0].checkoutPrice;
      this.salesBrief.serviceId = this.shippingServiceDe[0].serviceId;
      this.salesBrief.compId = this.allCompany[0].custId;
      this.salesBrief.compName = this.allCompany[0].nameOf;
      this.salesBrief.custId = this.user.custId;
      this.salesBrief.discriptionOf = '';
      this.salesBrief.paymentStatus = 'cod';

      if (this.isViewed == true) {
        this.salesBrief.shippingFirstName = this.saleBriefForm.get('shippingFirstName').value;
        this.salesBrief.shippingLastName = this.saleBriefForm.get('shippingLastName').value;
        this.salesBrief.shippingCompany = '';
        this.salesBrief.shippingAdd1 = this.saleBriefForm.get('shippingAdd1').value;
        this.salesBrief.shippingAdd2 = this.saleBriefForm.get('shippingAdd2').value;
        this.salesBrief.shippingCity = this.saleBriefForm.get('shippingCity').value;
        this.salesBrief.shippingCountry = this.saleBriefForm.get('shippingCountry').value;
        this.salesBrief.shippingEmail = this.saleBriefForm.get('shippingEmail').value;
        this.salesBrief.shippingPostcode = this.saleBriefForm.get('shippingPostcode').value;
        this.salesBrief.shippingMobileNum = this.saleBriefForm.get('shippingMobileNum').value;
      }
      else {
        this.salesBrief.shippingFirstName = this.saleBriefForm.get('firstName').value;
        this.salesBrief.shippingLastName = this.saleBriefForm.get('lastName').value;
        this.salesBrief.shippingCompany = '';
        this.salesBrief.shippingAdd1 = this.user.shippingAdd1;
        this.salesBrief.shippingAdd2 = this.user.shippingAdd2;
        this.salesBrief.shippingCity = this.user.shippingCity;
        this.salesBrief.shippingCountry = this.user.shippingCountry;
        this.salesBrief.shippingEmail = this.saleBriefForm.get('email').value;
        this.salesBrief.shippingPostcode = this.user.shippingPostcode;
        this.salesBrief.shippingMobileNum = this.saleBriefForm.get('mobileNum').value;
      }


      if (this.saleBreifIdToUpdate == null) {
        this.service.Post('sale-brief', this.salesBrief).subscribe(
          (data: any) => {
            // success
            this.toastr.success('New sale brief Created!', 'OK!');
            this.saleBreifIdToUpdate = null;
            var briefId = data.data.billId;
            // alert(briefId);
            this.cartItems = JSON.parse(localStorage.getItem('cartItems'));
            this.cartItems = this.cartItems.filter(x => x.userId === userId);
            for (let index = 0; index < this.cartItems.length; index++) {
              var obj: any = {};
              obj.itemId = this.cartItems[index].itemId;
              obj.SQty = this.cartItems[index].qty;
              obj.unitPrice = this.cartItems[index].price;
              obj.totalAmount = this.cartItems[index].qty * this.cartItems[index].price;
              obj.selling = this.cartItems[index].qty * this.cartItems[index].price;
              obj.saleBriefId = briefId;
              this.service.Post('sale-detail', obj).subscribe(

              )
              setTimeout(() => {
                /** spinner ends after 5 seconds */
                this.toastr.success('Sale Detail Successfully Created!', 'Successfully Saved.');
                this.user = JSON.parse(this.cookieService.get('user'));
                var userId = this.user.custId;
                this.cartItems = this.cartItems.filter(x => x.userId !== userId);
                localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
                this.router.navigateByUrl('/myorder');

              }, 2000);
            }

          },
          err => {
            this.toastr.error('Error while fetching data!', 'Error.');
          }
        );
      }
    }
  }

  async processPayment() {
    const expiryDate = this.paymentForm.get('expiryDate').value;
    const formattedExpiryDate = expiryDate.replace(/[\/\s]/g, '');
    console.log(formattedExpiryDate);
    const cardNumber = this.paymentForm.get('cardNumber').value;
    const formattedCardNumber = cardNumber.replace(/\s/g, '');
    console.log(formattedCardNumber);
    const merchant = await client.merchant_session_keys.create(
      { vendorName: VENDOR_NAME }
    );
    const { expiry, merchantSessionKey } = merchant
    console.log(`Expiry: ${expiry}, Merchant Session Key: ${merchantSessionKey}`)

    client.merchantSessionKey = merchantSessionKey;

    const card = {
      cardDetails: {
        cardholderName: this.paymentForm.get('cardholderName').value,
        cardNumber: formattedCardNumber,
        expiryDate: formattedExpiryDate,
        securityCode: this.paymentForm.get('securityCode').value
      }
    }
    const newCardIdentifier = await client.card_identifiers.create(card)
    const { cardIdentifier } = newCardIdentifier
    console.log(`Card Identifier: ${cardIdentifier}`)

    const payment = {
      transactionType: 'Payment',
      paymentMethod: {
        card: {
          merchantSessionKey,
          cardIdentifier,
        }
      },

      vendorTxCode: vendorTxCode,
      amount: this.salesBrief.totalPaid,
      currency: 'GBP',
      description: 'MHAYK TEST LIBRARY',
      customerFirstName: this.salesBrief.firstName,
      customerLastName: this.salesBrief.lastName,
      billingAddress: {
        address1: this.salesBrief.billingAdd1,
        city: this.salesBrief.billingCity,
        postalCode: this.salesBrief.billingPostcode,
        country: "GB"
      }
    }
    const transaction = await client.transactions.create(payment)
    console.log(transaction);

    this.user = JSON.parse(this.cookieService.get('user'));
    var userId = this.user.custId;
    if (transaction.statusCode === '0000') {
      this.salesBrief.paymentStatus = 'paid';
      if (this.saleBreifIdToUpdate == null) {
        this.service.Post('sale-brief', this.salesBrief).subscribe(
          (data: any) => {
            // success
            this.toastr.success('New sale brief Created!', 'OK!');
            this.saleBreifIdToUpdate = null;
            var briefId = data.data.billId;
            // alert(briefId);
            this.cartItems = JSON.parse(localStorage.getItem('cartItems'));
            this.cartItems = this.cartItems.filter(x => x.userId === userId);
            for (let index = 0; index < this.cartItems.length; index++) {
              var obj: any = {};
              obj.itemId = this.cartItems[index].itemId;
              obj.SQty = this.cartItems[index].qty;
              obj.unitPrice = this.cartItems[index].price;
              obj.totalAmount = this.cartItems[index].qty * this.cartItems[index].price;
              obj.selling = this.cartItems[index].qty * this.cartItems[index].price;
              obj.saleBriefId = briefId;
              this.service.Post('sale-detail', obj).subscribe(

              )
              setTimeout(() => {
                /** spinner ends after 5 seconds */
                this.toastr.success('Sale Detail Successfully Created!', 'Successfully Saved.');
                this.user = JSON.parse(this.cookieService.get('user'));
                var userId = this.user.custId;
                this.cartItems = this.cartItems.filter(x => x.userId !== userId);
                localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
                this.router.navigateByUrl('/myorder');

              }, 2000);
            }

          },
          err => {
            this.toastr.error('Error while fetching data!', 'Error.');
          }
        );
      }
    }

    else {
      // Transaction failed or has error
      this.toastr.error('Transaction failed!', 'Error.');
    }

  }
  loadAllCompany() {
    this.service.Get('company').subscribe(
      (success: any) => {
        this.allCompany = success.data;
      },
      error => {
        this.toastr.error('Error while fetching data!', 'Error.');
      });
  }
  loadService() {
    this.service.Get('shipping-type').subscribe(
      (success: any) => {
        this.allService = success.data;
      },
      error => {
        this.toastr.error('Error while fetching data!', 'Error.');
      });
  }

  isViewedShipping() {

    this.isViewed = !this.isViewed;
  }
  isOpayoShipping() {

    this.isOpayo = !this.isOpayo;
    this.isCash = !this.isOpayo;
    console.clear();
    console.log("isOpayo",this.isOpayo,"isCash",this.isCash);
  }
  isCashShipping() {

    this.isCash = !this.isCash;
    this.isOpayo = !this.isCash;
    console.clear();
    console.log("isOpayo",this.isOpayo,"isCash",this.isCash);
  }
  loadCheckout() {
    this.user = JSON.parse(this.cookieService.get('user'));
    var userId = this.user.custId;

    this.cartItems = JSON.parse(localStorage.getItem('cartItems'));
    this.cartItems = this.cartItems.filter(x => x.userId === userId);

    this.shippingServiceDe = JSON.parse(localStorage.getItem('shippingServiceDe'));
    this.shippingServiceDe = this.shippingServiceDe.filter(x => x.userId === userId);


    this.serviceDe = this.allService.filter(x => x.id === parseInt(this.shippingServiceDe[0].serviceId));
  }
  @ViewChild('info', { static: true }) info: any;
}
