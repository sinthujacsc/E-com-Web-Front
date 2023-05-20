import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from '@shared/layouts/header/header.component';
import { CommonService } from '@shared/services/common.service';
import { environment } from 'environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  isLogged: boolean = false;
  selectedQty: any;
  quickViewImageSrc: any;
  selectedColor: any;
  cartItems: any = [];
  wishItems: any = [];
  product: any;
  user: any;
  serverImgPath = environment.img_path + 'product/';
  serverImgPath1 = environment.img_path + 'productColorImg/';
  productCode: any;
  value: any = 1;
  constructor(private toastr: ToastrService, private http: HttpClient, private router: Router, private service: CommonService, private route: ActivatedRoute, private modalService: NgbModal, private cookieService: CookieService) { }

  ngOnInit(): void {
    this.route.params.subscribe(data => {
      this.productCode = data['code'];
      if (this.productCode != undefined) { 
        if (this.productCode.length > 0) {
          this.getProduct();
        }
      }

    });
    var token = this.cookieService.get('token');
    if (token != null && token != undefined && token != '') {
      this.isLogged = true;
    }
  }
  handleMinus() {
    if (this.value >= 2) {
      this.value--;
    }
    else {

    }
  }
  handlePlus() {
    this.value++;
  }
  getProduct() {
    this.service.GetById('get-product-by-code', this.productCode).subscribe(
      (success: any) => {
        this.product = success.data;
        this.quickViewImageSrc = this.serverImgPath + this.product[0].imgPath;
      },
      error => {
        this.toastr.error('Error while fetching data!', 'Error.');
      });

  }
  onClickImageQuick(imgURL: any) {

    this.quickViewImageSrc = this.serverImgPath1 + imgURL;
  }
  onView1(content: any, size: any) {
    this.modalService.open(content, { size: size });
  }
  onCheckChange(color: any) {
    this.selectedColor = color;
  }

  addToWish(itemId: any, itemName: any, imgPath: any, price: any) {
    this.user = JSON.parse(this.cookieService.get('user'));
    var userId = this.user.custId;
    this.wishItems = [];

    this.wishItems = JSON.parse(localStorage.getItem('wishItems'));
    if (this.wishItems != null) {
      var item = this.wishItems.find(x => x.itemId === itemId && x.userId === userId);
      var index = this.wishItems.findIndex(x => x.itemId === itemId && x.userId === userId);

      if (item) {
        //If Product already exist update the qty
        this.wishItems[index].userId = userId;
        this.wishItems[index].itemId = itemId;
        this.wishItems[index].itemName = itemName;
        this.wishItems[index].imgPath = imgPath;
        this.wishItems[index].qty = (this.wishItems[index].qty + this.value);
        this.wishItems[index].color = this.selectedColor;
        this.wishItems[index].price = price;

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
        this.wishItems.push(obj);
      }
    }
    else {
      //When user add product first time
      this.wishItems = [];

      var obj: any = {};
      obj.userId = userId;
      obj.itemId = itemId;
      obj.itemName = itemName;
      obj.imgPath = imgPath;
      obj.qty = this.value;
      obj.color = this.selectedColor;
      obj.price = price;
      this.wishItems.push(obj);
    }
    localStorage.removeItem('wishItems');
    localStorage.setItem('wishItems', JSON.stringify(this.wishItems));
    window.location.reload();
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
}
