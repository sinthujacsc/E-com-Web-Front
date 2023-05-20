import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-footer-v1',
  templateUrl: './footer-v1.component.html',
  styleUrls: ['./footer-v1.component.css']
})
export class FooterV1Component implements OnInit {
  allCompany: any;
  serverImgPath = environment.img_path + 'company/';
  isLogged: boolean = false;

  constructor(private modalService:NgbModal ,private cookieService: CookieService,private http:HttpClient, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadAllCompany();
    var token = this.cookieService.get('token');
    if (token != null && token != undefined && token != '') {
      this.isLogged = true;
    }
  }
  onView1(content: any, size: any) {
    this.modalService.open(content, { size: size });
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
  
}
