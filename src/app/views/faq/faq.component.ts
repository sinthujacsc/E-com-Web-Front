import { Component, OnInit } from '@angular/core';
import { CommonService } from '@shared/services/common.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {
  allfaq: any;
  FaqForm:any={};

  constructor(private service: CommonService,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadAllfaq();
  }
  loadAllfaq() {
    this.service.Get('faq-category-front').subscribe(
      (success: any) => {
        this.allfaq = success.data;
      },
      error => {
        this.toastr.error('Error while fetching data!', 'Error.');


      });
  }
}
