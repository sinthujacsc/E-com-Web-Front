import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  wishItems: any;
  serverImgPath = environment.img_path + 'product/';
  totalPrice: any = 0;
  user:any;
  cartItems: any = [];
  value: any = 1;
  selectedColor: any;


  constructor(private cookieService:CookieService) { }

  ngOnInit(): void {
    this.wishItems = JSON.parse(localStorage.getItem('wishItems'));
    console.log(this.wishItems);
    this.loadWish();
  }
  addToCart(itemId: any, itemName: any, imgPath: any, price: any) {
    this.user = JSON.parse(this.cookieService.get('user'));
    var userId = this.user.custId;
    this.cartItems = [];

    this.cartItems = JSON.parse(localStorage.getItem('cartItems'));
    if (this.cartItems != null) {
      var item = this.cartItems.find(x => x.itemId === itemId && x.userId === userId);
      var index = this.cartItems.findIndex(x => x.itemId === itemId && x.userId === userId);

      if (item) {
        //If Product already exist update the qty
        this.cartItems[index].userId = userId;
        this.cartItems[index].itemId = itemId;
        this.cartItems[index].itemName = itemName;
        this.cartItems[index].imgPath = imgPath;
        this.cartItems[index].qty = (this.cartItems[index].qty + this.value);
        this.cartItems[index].color = this.selectedColor;
        this.cartItems[index].price = price;

      }
      else {
        //If not exist push to array
        var obj: any = {};
        obj.userId = userId;
        obj.itemId = itemId;
        obj.itemName = itemName;
        obj.imgPath = imgPath;
        obj.qty = this.value;
        obj.color = this.selectedColor;
        obj.price = price;
        this.cartItems.push(obj);
      }
    }
    else {
      //When user add product first time
      this.cartItems = [];

      var obj: any = {};
      obj.userId = userId;
      obj.itemId = itemId;
      obj.itemName = itemName;
      obj.imgPath = imgPath;
      obj.qty = this.value;
      obj.color = this.selectedColor;
      obj.price = price;
      this.cartItems.push(obj);
    }
    localStorage.removeItem('cartItems');
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    window.location.reload();
  }
  loadWish() {
    this.user = JSON.parse(this.cookieService.get('user'));
    var userId = this.user.custId;
    this.wishItems = JSON.parse(localStorage.getItem('wishItems'));
    this.wishItems = this.wishItems.filter(x=>x.userId === userId);

    this.wishItems.forEach(element => {
      this.totalPrice = this.totalPrice + (parseFloat(element.qty) * parseFloat(element.price));

    });
  }
  remove(itemId: any) {
    this.user = JSON.parse(this.cookieService.get('user'));
    var userId = this.user.custId;
    this.wishItems = this.wishItems.filter(x => x.itemId !== itemId && x.userId === userId);
    localStorage.setItem('wishItems', JSON.stringify(this.wishItems));
    window.location.reload();
  }
  removeAll() {
    this.user = JSON.parse(this.cookieService.get('user'));
    var userId = this.user.custId;
    this.wishItems = this.wishItems.filter(x => x.userId !== userId);
    console.log(this.wishItems);
    // localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    // window.location.reload();
  }
}
