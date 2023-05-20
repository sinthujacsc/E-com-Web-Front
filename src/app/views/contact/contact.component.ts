import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@shared/services/auth.service';
import { CommonService } from '@shared/services/common.service';
import { environment } from 'environments/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  allCompany: any;
  serverImgPath = environment.img_path + 'company/';
  contactForm: any;
  contact: any = {};
  dataSaved = false;
  contactIdToUpdate=null;

  isChecked: string = 'Y';
  checked: boolean = true;

  public aFormGroup!: FormGroup;
  public siteKey: any='';

  
  constructor(private http:HttpClient,public formBuilder: FormBuilder, private toastr: ToastrService,private service: CommonService) { }
  
  title = 'recatcha';
  ngOnInit(): void {
    this. aFormGroup = this. formBuilder.group({
      recaptcha: ['',Validators.required],
      
    });
    this.contactForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      isViewed: [''],
      email: ['', [Validators.required]],
      subject: ['', [Validators.required]],
      message: ['', [Validators.required]],
      phone: ['', [Validators.required]],


    });
    this.siteKey="6LfAiCEjAAAAANJ9kjiwXCSSP7z72CLwQUbw38Bz";
    this.loadAllCompany();
  }

  onSubmit() {
    this.dataSaved = false;
    this.saveOrUpdate();
    this.contactForm.reset();
  }
  saveOrUpdate() {

    this.contact.name = this.contactForm.get('name').value;
    this.contact.email = this.contactForm.get('email').value;
    this.contact.subject = this.contactForm.get('subject').value;
    this.contact.message = this.contactForm.get('message').value;
    this.contact.phone = this.contactForm.get('phone').value;
    this.contact.isViewed = this.isChecked;

    if (this.contactIdToUpdate == null) {
      this.service.Post('customer-enquiry', this.contact).subscribe(
        () => {
          this.dataSaved = true;
          // success
          this.toastr.success('New contact Created!', 'OK!');
          this.contactIdToUpdate = null;
        },
        err => {
          this.toastr.error('Error while fetching data!', 'Error.');
        }
      );
      
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
}
