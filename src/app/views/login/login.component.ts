import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from '@shared/services/common.service';
import { ToastrService } from 'ngx-toastr';
import * as Bowser from "bowser";
import { CookieService } from 'ngx-cookie-service';


@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	ipAddress: any;
	systemToken: any = {};
	browsername: any;
	registerForm: any;
	user: any = {};
	isView:any;
	isView1:any;
	isrecaptcha:boolean=false;
	recaptchamess:any='Verify required';
	

	public aFormGroup!: FormGroup;
	public siteKey: any = '';

	constructor(public formBuilder: FormBuilder, private router: Router, private http: HttpClient, private toastr: ToastrService, private service: CommonService, private cookieService: CookieService) { }
	title = 'recatcha';

	formModel = {
		email: '',
		password: ''
	};

	ngOnInit() {
		this.registerForm = this.formBuilder.group({
			title: ['', [Validators.required]],
			firstName: ['', [Validators.required]],
			lastName: ['', [Validators.required]],
			email: ['', [Validators.required]],
			mobileNum: ['', [Validators.required]],
			password: ['', [Validators.required]],
		});
		this.aFormGroup = this.formBuilder.group({
			recaptcha: ['', Validators.required],

		});
		// if (this.cookieService.get('token') != null) {
		// 	this.router.navigateByUrl('/dashboard');
		//   }
		this.siteKey = "6LfAiCEjAAAAANJ9kjiwXCSSP7z72CLwQUbw38Bz";

		this.getIpAddress();
	}
	isViewed()
	{
		this.isView = !this.isView;

	}
	isViewed1()
	{
		this.isView1 = !this.isView1;

	}

	VerifyingsussfullyClick(e:any)
	{
		this.isrecaptcha = true
		this.recaptchamess ='Verified'
	}

	verfyfail()
	{
		this.isrecaptcha = false
		this.recaptchamess ='verification fails';
	}

	onSubmit(form: NgForm) {

		
		this.service.systemLogin(form.value).subscribe(
			(res: any) => {
				var domain = window.location.hostname;
				this.cookieService.set("token", res.access_token, 1, undefined, domain, true);
				this.cookieService.set("user_id", res.user.code, 1, undefined, domain, true);
				this.cookieService.set('user', JSON.stringify(res.user), 1, undefined, domain, true);
				this.saveSystemToken(res.access_token, res.user.code);
				this.router.navigateByUrl('/home');
				this.toastr.success('Login Successfull.', '');
			},
			err => {
				this.toastr.error('Incorrect userName or password.', '');
			}
		);
	}
	onSubmitRegister() {
		this.user.title = this.registerForm.get('title').value;
		this.user.firstName = this.registerForm.get('firstName').value;
		this.user.lastName = this.registerForm.get('lastName').value;
		this.user.mobileNum = this.registerForm.get('mobileNum').value;
		this.user.password = this.registerForm.get('password').value;
		this.user.email = this.registerForm.get('email').value;


		this.service.Post('customer', this.user).subscribe(
			() => {

				this.toastr.success('You are successfully registered!', 'OK!');
				this.router.navigateByUrl('/login');
			}
		);
	}
	// getIpAddress() {
	// 	const httpOptions = {
	// 		headers: new HttpHeaders({ 
	// 		  'Access-Control-Allow-Origin':'*',
	// 		})
	// 	  };
	// 	this.http.get<{ ip: string }>('https://jsonip.com',httpOptions)
	// 		.subscribe(data => {

	// 			this.ipAddress = data.ip;
	// 		})
	// }
	getIpAddress() {
		this.http.get("http://api.ipify.org/?format=json").subscribe((res: any) => {
			this.ipAddress = res.ip;
		});
	}

	saveSystemToken(tokenNo: any, userId: any) {
		var userAgent = Bowser.parse(window.navigator.userAgent);
		var browser = Bowser.getParser(window.navigator.userAgent);
		this.browsername = JSON.stringify(browser.getBrowser(), null, 4);

		this.systemToken.token_number = tokenNo;
		this.systemToken.user_id = userId;
		this.systemToken.ip_address = this.ipAddress;
		this.systemToken.browser = JSON.parse(this.browsername).name;

		this.service.Post('check-token-availability-customer', this.systemToken).subscribe(
			() => {

			},
			err => {
				this.toastr.error('Error while fetching data!', 'Error');
			}
		);
	}


}
