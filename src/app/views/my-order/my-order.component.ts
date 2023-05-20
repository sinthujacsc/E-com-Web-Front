import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from '@shared/services/common.service';
import { environment } from 'environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css']
})
export class MyOrderComponent implements OnInit {
  user:any;
  allProduct:any;
  allOrders:any;
  serverImgPath = environment.img_path + 'product/';

  constructor(private modalService: NgbModal,private cookieService: CookieService, private service: CommonService) { }

  ngOnInit(): void {
    this.user = JSON.parse(this.cookieService.get('user'));
    this.loadAllProduct();
  
    
  }
  onView(content:any,size:any,id:any){
    this.service.GetById('get-products', id).subscribe(
      (item: any) => {       
        this.allOrders=item;
        console.log(this.allOrders);
        setTimeout(() => {
          this.modalService.open(content, { size: size });

        }, 2000);
       
      },
      err => {
        console.log(err);
      }
    );
   
  }
  loadAllProduct(){
    this.service.GetById('get-order-by-cust', this.user.custId).subscribe(
      (item: any) => {
       this.allProduct=item.data;
      },
      err => {
        console.log(err);
      }
    );
  }

}
