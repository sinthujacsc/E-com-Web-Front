import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from '@shared/services/common.service';
import { environment } from 'environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  allMainCategory:any;
  allTopCategory:any;
  allPopularProduct:any;
  isLogged: boolean = false;
  serverImgPath = environment.img_path + 'product/';
  cartItems: any = [];
  user: any;
  selectedColor: any;
  value: any = 1;
  quickViewImageSrc: any;
  allrecent:any;


  constructor(private modalService:NgbModal ,private service:CommonService,private cookieService: CookieService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadAllMainCategory();
    this.loadTopCategory();
    this.loadpopularProduct();
    this.loadRecentProduct();

    var token = this.cookieService.get('token');
    if (token != null && token != undefined && token != '') {
      this.isLogged = true;
    }
  }
  onView(content: any, size: any, id: any, imgPath: any) {
    this.quickViewImageSrc = this.serverImgPath + imgPath;
    this.modalService.open(content, { size: size });
  }
  onView1(content: any, size: any) {
    this.modalService.open(content, { size: size });
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
  loadAllMainCategory() {
    this.service.Get('major-category').subscribe(
      (success: any) => {
        this.allMainCategory = success.data;
      },
      error => {
        this.toastr.error('Error while fetching data!', 'Error.');


      });
  }
  loadpopularProduct(){
    this.service.Get('get-popular').subscribe(
      (success: any) => {
        this.allPopularProduct = success.data;
        console.log(success);
      },
      error => {
        this.toastr.error('Error while fetching data!', 'Error.');


      });
  }
  loadRecentProduct(){
    this.service.Get('get-recent').subscribe(
      (success: any) => {
        this.allrecent = success.data;
        console.log(success);
      },
      error => {
        this.toastr.error('Error while fetching data!', 'Error.');


      });
  }
  loadTopCategory() {
    this.service.Get('get-top-category').subscribe(
      (success: any) => {
        this.allTopCategory = success;
        console.log(success);
      },
      error => {
        this.toastr.error('Error while fetching data!', 'Error.');


      });
  }

}
