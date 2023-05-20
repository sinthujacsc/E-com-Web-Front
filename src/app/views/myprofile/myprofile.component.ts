import { HttpHeaders, HttpEventType, HttpResponse, HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonService } from '@shared/services/common.service';
import { environment } from 'environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
declare var $: any;
@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit {
  user: any;
  serverImgPath = environment.img_path + 'customer/';
  serverImgPath1 = environment.img_path + 'customerCover/';

  myprofileData: any;
  myprofileForm: any;
  myprofileForm1: any;
  myprofileForm2: any;
  myprofileForm3: any;
  checked: boolean = true;
  url:any = '';

  profileImageSrc:any="./assets/images/noImage.jpg";
  profileCoverImageSrc:any="./assets/images/noImage.jpg";

  myprofileIdToUpdate = null;
  file_store_profile!: FileList;
  file_store_profile_cover!: FileList;

  profile_image: any;
  profileCover_image: any;


  profile_profile: FormControl = new FormControl("");
  profileCover_profile: FormControl = new FormControl("");

  dataSaved = false;
  myprofile: any = {};

  constructor(private sanitizer: DomSanitizer, private http: HttpClient,private toastr: ToastrService, public formBuilder: FormBuilder, private cookieService: CookieService, private service: CommonService) { }

  ngOnInit(): void {
    this.myprofileForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      mobileNum: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required]]
    });
    this.myprofileForm1 = this.formBuilder.group({
      mobileNum: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required]]
    });
    this.myprofileForm2 = this.formBuilder.group({
      billingAdd1: ['', [Validators.required]],
      billingAdd2: ['', [Validators.required]],
      billingCity: ['', [Validators.required]],
      billingPostcode: ['', [Validators.required]],
      billingCountry: ['', [Validators.required]],

    });
    this.myprofileForm3 = this.formBuilder.group({
      shippingAdd1: ['', [Validators.required]],
      shippingAdd2: ['', [Validators.required]],
      shippingCity: ['', [Validators.required]],
      shippingPostcode: ['', [Validators.required]],
      shippingCountry: ['', [Validators.required]],

    });
    this.user = JSON.parse(this.cookieService.get('user'));
    
    this.profileImageSrc=this.sanitizer.bypassSecurityTrustResourceUrl(this.serverImgPath+this.user.imagePath) ;
    this.profileCoverImageSrc=this.sanitizer.bypassSecurityTrustResourceUrl(this.serverImgPath1+this.user.coverImagePath);
  }
 
  
  handleImage(l: FileList, event: any): void {
    this.file_store_profile = l;
    if (l.length) {
      const f = l[0];
      const count = l.length > 1 ? `(+${l.length - 1} files)` : "";
      this.profile_profile.patchValue(`${f.name}${count}`);
      this.profile_image = event.target.files[0];
    } else {
      this.profile_profile.patchValue("");
    }

    const reader = new FileReader();
    reader.onload = e => {
      this.profileImageSrc = reader.result;
    };

    reader.readAsDataURL(this.profile_image);

    const myFormData_cv = new FormData();
    const headers_cv = new HttpHeaders();
    headers_cv.append('Content- Type', 'multipart/form-data');
    headers_cv.append('Accept', 'application/json');
    myFormData_cv.append('imgPath', this.profile_image);
    myFormData_cv.append('code', this.profile_image.name);

    this.http.post(environment.utilityApiBasePath + 'upload-customer', myFormData_cv, {
      headers: headers_cv, reportProgress: true,
      observe: 'events'
    }).subscribe((event: any) => {
      if (event.type === HttpEventType.UploadProgress) {
      } else if (event instanceof HttpResponse) {
        this.onSubmitProfile();
        console.log('File uploaded successfully!' + JSON.stringify(event));

        this.profile_image = null;
      }

    }, error => {


      this.toastr.error('Error while fetching data!', 'Error.');

    });

  }
  handleCoverImage(l: FileList, event: any): void {
    this.file_store_profile_cover = l;
    if (l.length) {
      const f = l[0];
      const count = l.length > 1 ? `(+${l.length - 1} files)` : "";
      this.profileCover_profile.patchValue(`${f.name}${count}`);
      this.profileCover_image = event.target.files[0];
    } else {
      this.profileCover_profile.patchValue("");
    }

    const reader = new FileReader();
    reader.onload = e => {
      this.profileCoverImageSrc = reader.result;
    };

    reader.readAsDataURL(this.profileCover_image);

    const myFormData_cv = new FormData();
    const headers_cv = new HttpHeaders();
    headers_cv.append('Content- Type', 'multipart/form-data');
    headers_cv.append('Accept', 'application/json');
    myFormData_cv.append('imgPath', this.profileCover_image);
    myFormData_cv.append('code', this.profileCover_image.name);

    this.http.post(environment.utilityApiBasePath + 'upload-customer-cover', myFormData_cv, {
      headers: headers_cv, reportProgress: true,
      observe: 'events'
    }).subscribe((event: any) => {
      if (event.type === HttpEventType.UploadProgress) {
      } else if (event instanceof HttpResponse) {
        this.onSubmitProfileCover();
        console.log('File uploaded successfully!' + JSON.stringify(event));

        this.profileCover_image = null;
      }

    }, error => {


      this.toastr.error('Error while fetching data!', 'Error.');

    });

  }

  checkValue(e: any) {
    if (e.target.checked === true) {
      this.checked = true;

      this.service.GetById('customer', this.user.custId).subscribe(
        (item: any) => {
          console.log(item);
          this.dataSaved = false;
          this.myprofileForm3.controls['shippingAdd1'].setValue(item.billingAdd1);
          this.myprofileForm3.controls['shippingAdd2'].setValue(item.billingAdd2);
          this.myprofileForm3.controls['shippingCity'].setValue(item.billingCity);
          this.myprofileForm3.controls['shippingPostcode'].setValue(item.billingPostcode);
          this.myprofileForm3.controls['shippingCountry'].setValue(item.billingCountry);
        },
        err => {
          console.log(err);
        }
      );


    } else {
      this.checked = false;
    }
  }
  onSubmitProfile(){
    this.myprofile.custId = this.user.custId;
    this.myprofile.imagePath = this.profile_profile.value ? this.profile_profile.value : '-';
    this.service.Update('update-profile', this.myprofile, this.user.custId).subscribe(
      (res: any) => {
        this.dataSaved = true;
        // success
        this.toastr.success('Your Profile image Updated!', 'Ok!');
        var domain = window.location.hostname;
        this.cookieService.delete('user', undefined, domain, true);
        this.cookieService.set('user', JSON.stringify(res.data), 1, undefined, domain, true);
        this.user = JSON.parse(this.cookieService.get('user'));
        this.profileImageSrc=this.serverImgPath+this.user.imagePath;
        this.myprofileIdToUpdate = null;     

      },
      err => {
        this.toastr.error('Error while fetching data!', 'Error');
      }
    );
  }
  onSubmitProfileCover(){
    this.myprofile.custId = this.user.custId;
    this.myprofile.coverImagePath = this.profileCover_profile.value ? this.profileCover_profile.value : '-';
    this.service.Update('update-profile-cover', this.myprofile, this.user.custId).subscribe(
      (res: any) => {
        this.dataSaved = true;
        // success
        this.toastr.success('Your Profile Cover image Updated!', 'Ok!');
        var domain = window.location.hostname;
        this.cookieService.delete('user', undefined, domain, true);
        this.cookieService.set('user', JSON.stringify(res.data), 1, undefined, domain, true);
        this.user = JSON.parse(this.cookieService.get('user'));
        this.profileCoverImageSrc=this.serverImgPath1+this.user.coverImagePath;

        this.myprofileIdToUpdate = null;     

      },
      err => {
        this.toastr.error('Error while fetching data!', 'Error');
      }
    );
  }
  onSubmitUserInfo() {
    this.myprofile.custId = this.myprofileIdToUpdate;
    this.myprofile.title = this.myprofileForm.get('title').value;
    this.myprofile.firstName = this.myprofileForm.get('firstName').value;
    this.myprofile.lastName = this.myprofileForm.get('lastName').value;
    this.myprofile.email = this.myprofileForm.get('email').value;
    console.log(this.myprofile);
    this.service.Update('update-userinfo', this.myprofile, this.myprofileIdToUpdate).subscribe(
      (res: any) => {
        this.dataSaved = true;
        // success
        this.toastr.success('Your Profile User Info Updated!', 'Ok!');
        var domain = window.location.hostname;
        this.cookieService.delete('user', undefined, domain, true);
        this.cookieService.set('user', JSON.stringify(res.data), 1, undefined, domain, true);
        this.user = JSON.parse(this.cookieService.get('user'));
        this.myprofileIdToUpdate = null;

        $("#exampleModal1").modal("hide");

      },
      err => {
        this.toastr.error('Error while fetching data!', 'Error');
      }
    );
  }
  onSubmitContactInfo() {
    this.myprofile.custId = this.myprofileIdToUpdate;
    this.myprofile.mobileNum = this.myprofileForm1.get('mobileNum').value;
    this.myprofile.dateOfBirth = this.myprofileForm1.get('dateOfBirth').value;

    this.service.Update('update-contactinfo', this.myprofile, this.myprofileIdToUpdate).subscribe(
      (res: any) => {
        this.dataSaved = true;
        // success
        this.toastr.success('Your Profile Contact Info Updated!', 'Ok!');
        var domain = window.location.hostname;
        this.cookieService.delete('user', undefined, domain, true);
        this.cookieService.set('user', JSON.stringify(res.data), 1, undefined, domain, true);
        this.user = JSON.parse(this.cookieService.get('user'));
        this.myprofileIdToUpdate = null;

        $("#exampleModal2").modal("hide");

      },
      err => {
        this.toastr.error('Error while fetching data!', 'Error');
      }
    );
  }
  onSubmitBillingInfo() {
    this.myprofile.custId = this.myprofileIdToUpdate;
    this.myprofile.billingAdd1 = this.myprofileForm2.get('billingAdd1').value;
    this.myprofile.billingAdd2 = this.myprofileForm2.get('billingAdd2').value;
    this.myprofile.billingCity = this.myprofileForm2.get('billingCity').value;
    this.myprofile.billingPostcode = this.myprofileForm2.get('billingPostcode').value;
    this.myprofile.billingCountry = this.myprofileForm2.get('billingCountry').value;

    this.service.Update('update-billinginfo', this.myprofile, this.myprofileIdToUpdate).subscribe(
      (res: any) => {
        this.dataSaved = true;
        // success
        this.toastr.success('Your Profile Billing Info Updated!', 'Ok!');
        var domain = window.location.hostname;
        this.cookieService.delete('user', undefined, domain, true);
        this.cookieService.set('user', JSON.stringify(res.data), 1, undefined, domain, true);
        this.user = JSON.parse(this.cookieService.get('user'));
        this.myprofileIdToUpdate = null;

        $("#exampleModal3").modal("hide");

      },
      err => {
        this.toastr.error('Error while fetching data!', 'Error');
      }
    );
  }
  onSubmitShippingInfo() {
    this.myprofile.custId = this.myprofileIdToUpdate;
    this.myprofile.shippingAdd1 = this.myprofileForm3.get('shippingAdd1').value;
    this.myprofile.shippingAdd2 = this.myprofileForm3.get('shippingAdd2').value;
    this.myprofile.shippingCity = this.myprofileForm3.get('shippingCity').value;
    this.myprofile.shippingPostcode = this.myprofileForm3.get('shippingPostcode').value;
    this.myprofile.shippingCountry = this.myprofileForm3.get('shippingCountry').value;

    this.service.Update('update-shippinginfo', this.myprofile, this.myprofileIdToUpdate).subscribe(
      (res: any) => {
        this.dataSaved = true;
        // success
        this.toastr.success('Your Profile Shipping Info Updated!', 'Ok!');
        var domain = window.location.hostname;
        this.cookieService.delete('user', undefined, domain, true);
        this.cookieService.set('user', JSON.stringify(res.data), 1, undefined, domain, true);
        this.user = JSON.parse(this.cookieService.get('user'));
        this.myprofileIdToUpdate = null;

        $("#exampleModal4").modal("hide");

      },
      err => {
        this.toastr.error('Error while fetching data!', 'Error');
      }
    );
  }
  onEditUserInfo(id: any) {
    this.service.GetById('customer', id).subscribe(
      (item: any) => {
        console.log(item);
        this.dataSaved = false;
        this.myprofileIdToUpdate = item.custId;
        this.myprofileForm.controls['title'].setValue(item.title);
        this.myprofileForm.controls['firstName'].setValue(item.firstName);
        this.myprofileForm.controls['lastName'].setValue(item.lastName);
        this.myprofileForm.controls['email'].setValue(item.email);

      },
      err => {
        console.log(err);
      }
    );
  }

  onEditContactInfo(id: any) {
    this.service.GetById('customer', id).subscribe(
      (item: any) => {
        console.log(item);
        this.dataSaved = false;
        this.myprofileIdToUpdate = item.custId;
        this.myprofileForm1.controls['mobileNum'].setValue(item.mobileNum);
        this.myprofileForm1.controls['dateOfBirth'].setValue(item.dateOfBirth);

      },
      err => {
        console.log(err);
      }
    );
  }

  onEditBillingInfo(id: any) {
    this.service.GetById('customer', id).subscribe(
      (item: any) => {
        console.log(item);
        this.dataSaved = false;
        this.myprofileIdToUpdate = item.custId;
        this.myprofileForm2.controls['billingAdd1'].setValue(item.billingAdd1);
        this.myprofileForm2.controls['billingAdd2'].setValue(item.billingAdd2);
        this.myprofileForm2.controls['billingCity'].setValue(item.billingCity);
        this.myprofileForm2.controls['billingPostcode'].setValue(item.billingPostcode);
        this.myprofileForm2.controls['billingCountry'].setValue(item.billingCountry);



      },
      err => {
        console.log(err);
      }
    );
  }
  onEditShippingInfo(id: any) {
    this.service.GetById('customer', id).subscribe(
      (item: any) => {
        console.log(item);
        this.dataSaved = false;
        this.myprofileIdToUpdate = item.custId;
        this.myprofileForm3.controls['shippingAdd1'].setValue(item.shippingAdd1);
        this.myprofileForm3.controls['shippingAdd2'].setValue(item.shippingAdd2);
        this.myprofileForm3.controls['shippingCity'].setValue(item.shippingCity);
        this.myprofileForm3.controls['shippingPostcode'].setValue(item.shippingPostcode);
        this.myprofileForm3.controls['shippingCountry'].setValue(item.shippingCountry);



      },
      err => {
        console.log(err);
      }
    );
  }

}
