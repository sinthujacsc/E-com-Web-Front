import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from '@shared/services/common.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  sendEmailForm: any;
  sendmail: any = {};
  dataSaved = false;

  constructor(public formBuilder: FormBuilder,private service: CommonService, private toastr: ToastrService,private router:Router) { }

  ngOnInit(): void {
    this.sendEmailForm = this.formBuilder.group({
      email: ['', [Validators.required]]
    });
  }
  sendEmail(){
    var email=this.sendEmailForm.get('email').value;
    this.service.GetById('send-forgot-password-mail-customer', email).subscribe(
      (item: any) => {
        this.toastr.info(item.message);
        if(item.message!='The email does not exist'){
          this.router.navigate(['/login']);
        }
      },
      err => {
        this.toastr.error('Error while fetching data!', 'Error.');

      }
    );
  }

}
