import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from '@shared/services/common.service';
import { ToastrService } from 'ngx-toastr';
import { Options, LabelType } from "@angular-slider/ngx-slider";
import { environment } from 'environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.css']
})
export class ShopListComponent implements OnInit {
  p: number = 1;
  value: any = 1;
  selectedColor: any;
  cartItems: any = [];
  wishItems: any = [];
  allbrand: any = [];
  allPriceRange: any;
  mainCategoryCode: any;
  allSubCategories: any = [];
  allproductByCategory: any;
  quickViewImageSrc: any;
  isLogged: boolean=false;

  collection = [];
  start;
  last;

  serverImgPath = environment.img_path + 'product/';
  serverImgPath1 = environment.img_path + 'productColorImg/';

  sortText:any;
  user:any;


  minValue: number = 0;
  maxValue: number = 0;
  options: Options = {
    floor: 0,
    ceil: 5000000,

  };
  constructor(private cookieService:CookieService,private route: ActivatedRoute, private service: CommonService, private toastr: ToastrService, private modalService: NgbModal) {
    for (let i = 1; i <= 100; i++) {
      this.collection.push(`item ${i}`);
    }
  }

  ngOnInit(): void {
    this.route.params.subscribe(data => {
      this.mainCategoryCode = data['code'];
      if (this.mainCategoryCode != undefined) {
        if (this.mainCategoryCode.length > 0) {
          this.loadSubCategory();
          this.loadBrands();
          this.loadPriceRange();
          this.loadProductByCategory();
        }
      }

    });
    this.sortText='asc';
    var token = this.cookieService.get('token');
    if(token != null && token != undefined && token != ''){
      this.isLogged = true;
    }

  }
  onView1(content: any, size: any) {
    this.modalService.open(content, { size: size });
  }
  onView(content: any, size: any, id: any, imgPath: any) {
    this.quickViewImageSrc = this.serverImgPath + imgPath;
    this.modalService.open(content, { size: size });
  }
  listCount(count) {
    this.start = count
    this.start = this.start * 10 - 9
    this.last = count * 10
    if (this.last > this.collection.length) {
      this.last = this.collection.length;
    }
    console.log('start' + '      ' + this.start + '      ' + 'last' + '      ' + this.last);
  }
  loadSubCategory() {
    this.service.GetById('get-subcategory-by-id', this.mainCategoryCode).subscribe(
      (success: any) => {
        var data = success;
        var val = Object.keys(data).length;
        var counter = 0;
        for (let i = 0; i < val; i++) {
          this.allSubCategories.push(
            {
              isSelected: false,
              counter: counter,
              custId: data[i]['custId'],
              nameOf: data[i]['nameOf'],
              count: data[i]['count']
            }
          );
          counter++;
        }
      },
      error => {
        this.toastr.error('Error while fetching data!', 'Error.');
      });
  }
  checkSubCategory(event) {
    var id = event.target.name;
    if (this.allSubCategories[id]['isSelected'] == true) {
      this.allSubCategories[id]['isSelected'] = false;
    } else {
      this.allSubCategories[id]['isSelected'] = true;
    }
    this.filterProduct();
  }
  checkBrand(event) {
    var id = event.target.name;
    if (this.allbrand[id]['isSelected'] == true) {
      this.allbrand[id]['isSelected'] = false;
    } else {
      this.allbrand[id]['isSelected'] = true;
    }
    this.filterProduct();
  }
  onChange(event:any) {
    if(event == 'asc'){
    this.allproductByCategory.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    }
    if(event == 'dsc'){
      this.allproductByCategory.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
      }

  }
  sliderEvent() {

    var objprice: any = {};
    objprice.code = this.mainCategoryCode;
    objprice.low = this.minValue;
    objprice.high = this.maxValue;

    this.service.Post('get-product-by-price', objprice).subscribe(
      (success: any) => {
        this.allproductByCategory = success;
      },
      error => {
        this.toastr.error('Error while fetching data!', 'Error.');
      });
  }
  filterProduct() {
    var subCategoryids: any = [];
    this.allSubCategories.forEach(element => {
      if (element.isSelected == true) {
        subCategoryids.push(element.custId);
      }
    });

    var brandids: any = [];
    this.allbrand.forEach(element => {
      if (element.isSelected == true) {
        brandids.push(element.custId);
      }
    });


    if (subCategoryids.length > 0 && brandids.length <= 0) {
      var objSubCategory: any = {};
      objSubCategory.code = this.mainCategoryCode;
      objSubCategory.subCategory_id = subCategoryids.join(',');
      objSubCategory.low = this.minValue;
      objSubCategory.high = this.maxValue;


      this.service.Post('get-product-by-subcategory', objSubCategory).subscribe(
        (success: any) => {
          this.allproductByCategory = success;
        },
        error => {
          this.toastr.error('Error while fetching data!', 'Error.');
        });
    }
    //Only brand Selected
    if (brandids.length > 0 && subCategoryids.length <= 0) {
      var objbrand: any = {};
      objbrand.code = this.mainCategoryCode;
      objbrand.brand_id = brandids.join(',');
      objbrand.low = this.minValue;
      objbrand.high = this.maxValue;

      this.service.Post('get-product-by-brand', objbrand).subscribe(
        (success: any) => {
          this.allproductByCategory = success;
        },
        error => {
          this.toastr.error('Error while fetching data!', 'Error.');
        });
    }

    if (brandids.length > 0 && subCategoryids.length > 0) {
      var objbrandCategory: any = {};
      objbrandCategory.code = this.mainCategoryCode;
      objbrandCategory.brand_id = brandids.join(',');
      objbrandCategory.subCategory_id = subCategoryids.join(',');
      objbrandCategory.low = this.minValue;
      objbrandCategory.high = this.maxValue;

      this.service.Post('get-product-by-subcategory-brand', objbrandCategory).subscribe(
        (success: any) => {
          this.allproductByCategory = success;
        },
        error => {
          this.toastr.error('Error while fetching data!', 'Error.');
        });
    }
  }
  loadPriceRange() {
    this.service.GetById('get-price-range', this.mainCategoryCode).subscribe(
      (success: any) => {
        this.minValue = success[0].minPrice;
        this.maxValue = success[0].maxPrice;
        setTimeout(() => {
          this.options = {
            floor: this.minValue,
            ceil: this.maxValue,

          };
        }, 1000);

      },
      error => {
        this.toastr.error('Error while fetching data!', 'Error.');
      });
  }
  loadBrands() {
    this.service.GetById('get-brand-by-id', this.mainCategoryCode).subscribe(
      (success: any) => {
        var data = success;
        var val = Object.keys(data).length;
        var counter = 0;
        for (let i = 0; i < val; i++) {
          this.allbrand.push(
            {
              isSelected: false,
              counter: counter,
              custId: data[i]['custId'],
              nameOf: data[i]['nameOf'],
              count: data[i]['count']
            }
          );
          counter++;
        }
      },
      error => {
        this.toastr.error('Error while fetching data!', 'Error.');
      });
  }
  loadProductByCategory() {
    this.service.GetById('get-product-image-by-code', this.mainCategoryCode).subscribe(
      (success: any) => {
        this.allproductByCategory = success.data;
      },
      error => {
        this.toastr.error('Error while fetching data!', 'Error.');
      });
  }
  onClickImage(imageURL: any, i: any) {
    var imagPath = this.serverImgPath1 + imageURL;
    (document.getElementById(i.toString()) as HTMLImageElement).src = imagPath;
  }
  onClickImageQuick(imgURL: any) {
    this.quickViewImageSrc = this.serverImgPath1 + imgURL;

  }
  addToWish(itemId: any, itemName: any, imgPath: any, price: any) {
    this.user = JSON.parse(this.cookieService.get('user'));
    var userId = this.user.custId;
    this.wishItems = [];

    this.wishItems = JSON.parse(localStorage.getItem('wishItems'));
    if (this.wishItems != null) {
      var item = this.wishItems.find(x => x.itemId === itemId  && x.userId === userId);
      var index = this.wishItems.findIndex(x => x.itemId === itemId  && x.userId === userId);

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
 
}
