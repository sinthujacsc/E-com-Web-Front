import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { parse } from 'path';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user:any;
  cartItems:any;
  wishItems: any;
  cartCount:any;
  wishCount:any;
  systemToken: any = {};
	browsername: any;
  allCompany: any;
  isLogged: boolean=false;
  totalPrice:any=0;
  serverImgPath = environment.img_path + 'company/';
  serverImgPath1 = environment.img_path + 'product/';

  constructor( private modalService: NgbModal,private router: Router,private cookieService:CookieService,private http:HttpClient, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadAllCompany();
    var token = this.cookieService.get('token');
    if(token != null && token != undefined && token != ''){
      this.isLogged = true;
    }
    this.user = JSON.parse(this.cookieService.get('user'));
    console.log(this.user);
    this.showCartItems();
    this.showWishItems();
  }
  showCartItems(){
    this.user = JSON.parse(this.cookieService.get('user'));
    var userId = this.user.custId;
    this.cartItems = JSON.parse(localStorage.getItem('cartItems'));
    this.cartItems = this.cartItems.filter(x=>x.userId === userId);

    if(this.cartItems==null){
      this.cartCount=0;
    }
    else{
      this.cartCount= this.cartItems.length;
    }
    this.cartItems.forEach(element => {     
      this.totalPrice = this.totalPrice+ (parseFloat(element.qty) * parseFloat(element.price));

    });
  }
  showWishItems(){
    this.user = JSON.parse(this.cookieService.get('user'));
    var userId = this.user.custId;
    this.wishItems = JSON.parse(localStorage.getItem('wishItems'));
    this.wishItems = this.wishItems.filter(x=>x.userId === userId);
    if(this.wishItems==null){
      this.wishCount=0;
    }
    else{
      this.wishCount= this.wishItems.length;
    }
   
  }
 
  loadAllCompany() {
    var apiURL = environment.utilityApiBasePath+'company';
    this.http.get(apiURL).subscribe(
      (item: any) => {
        this.allCompany = item.data;
       
      },
      error => {
        this.toastr.error('Error while fetching data!', 'Error.');
      });
  }

  onLogout() {
	    this.cookieService.deleteAll();			
			this.toastr.success('Successfully logged out...', '');
      this.router.navigate(['/home']);
	}
	
  onView(content: any, size: any) {
    this.modalService.open(content, { size: size });
  }
}
