import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '@shared/services/common.service';
import { environment } from 'environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';

declare var $: any;
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit {
  cartItems: any;
  serverImgPath = environment.img_path + 'product/';
  totalPrice: any = 0;
  checkoutPrice: any = 0;
  user: any;
  allService: any = [];
  shippingServiceDe: any = [];
  value: any = 1;


  constructor(private router: Router, private cookieService: CookieService, private service: CommonService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadCart();
    this.loadService();
    this.cartItems = JSON.parse(localStorage.getItem('cartItems'));
    console.log(this.cartItems);
  }
  loadCart() {
    this.user = JSON.parse(this.cookieService.get('user'));
    var userId = this.user.custId;
    this.cartItems = JSON.parse(localStorage.getItem('cartItems'));
    this.cartItems = this.cartItems.filter(x => x.userId === userId);

    this.cartItems.forEach(element => {
      this.totalPrice = this.totalPrice + (parseFloat(element.qty) * parseFloat(element.price));

    });
    this.checkoutPrice = this.totalPrice;
  }
  handleMinus(itemId: any) {
    this.user = JSON.parse(this.cookieService.get('user'));
    var userId = this.user.custId;
    this.cartItems = JSON.parse(localStorage.getItem('cartItems'));
    var data = this.cartItems.find(x => x.itemId === itemId && x.userId === userId);
    if(data.qty <= 1){
      data.qty = 1;
    }
    else{
      data.qty = data.qty - 1;
    }
    this.cartItems = this.cartItems.filter(x =>x.userId === userId);
    localStorage.removeItem('cartItems');
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    // window.location.reload();

    this.totalPrice = 0;
    this.cartItems.forEach(element => {
      this.totalPrice = this.totalPrice + (parseFloat(element.qty) * parseFloat(element.price));

    });
    this.checkoutPrice = this.totalPrice;

  }
  handlePlus(itemId: any) {
    this.user = JSON.parse(this.cookieService.get('user'));
    var userId = this.user.custId;
    this.cartItems = JSON.parse(localStorage.getItem('cartItems'));
    var data = this.cartItems.find(x => x.itemId === itemId && x.userId === userId);
    data.qty = data.qty + 1;
    this.cartItems = this.cartItems.filter(x =>x.userId === userId);
    localStorage.removeItem('cartItems');
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    // window.location.reload();
    this.totalPrice = 0;
    this.cartItems.forEach(element => {
      this.totalPrice = this.totalPrice + (parseFloat(element.qty) * parseFloat(element.price));

    });
    this.checkoutPrice = this.totalPrice;

  }
  remove(itemId: any) {
    this.user = JSON.parse(this.cookieService.get('user'));
    var userId = this.user.custId;
    this.cartItems = this.cartItems.filter(x => x.itemId !== itemId && x.userId === userId);
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    window.location.reload();
  }
  removeAll() {
    this.user = JSON.parse(this.cookieService.get('user'));
    var userId = this.user.custId;
    this.cartItems = this.cartItems.filter(x => x.userId !== userId);
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    // window.location.reload();
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
  calculation(serviceamount: any) {
    this.checkoutPrice = this.totalPrice + serviceamount;
  }

  shippingService() {

    this.user = JSON.parse(this.cookieService.get('user'));
    var userId = this.user.custId;
    this.shippingServiceDe = [];

    var obj: any = {};
    obj.userId = userId;
    obj.checkoutPrice = this.checkoutPrice;
    obj.totalPrice = this.totalPrice;
    obj.serviceId = $("input[name='shipping']:checked").val();

    this.shippingServiceDe.push(obj);
    localStorage.removeItem('shippingServiceDe');
    localStorage.setItem('shippingServiceDe', JSON.stringify(this.shippingServiceDe));

    this.router.navigateByUrl('/checkout');

  }
}
