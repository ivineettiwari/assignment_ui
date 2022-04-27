
import { Component, OnInit, Inject } from '@angular/core';
import { Validators, AbstractControl, FormBuilder, FormGroup, FormControl, Validator, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterServiceService } from '../common/services/register-service.service';

// import { CheckRequiredField } from '../_shared/helpers/form.helper';
// import { AuthService } from '../_auth/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  loginForm!: FormGroup;
  signInForm!: FormGroup;

  processing: Boolean = false;
  error: Boolean = false;
  error2: Boolean = false;
  error3: Boolean = false;
  signIn: boolean = true;
  signUp: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private registerServiceService: RegisterServiceService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }
  get f() { return this.loginForm.controls; }
  private initForm() {
    this.loginForm = new FormGroup({
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      username: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]),
    });

    this.signInForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }
  onSubmitButtonClicked() {
    this.error = false;
    this.error2 = false;
    var reqObj = {
      firstname: this.loginForm.value.firstname,
      lastname: this.loginForm.value.lastname,
      username: this.loginForm.value.username,
      password: this.loginForm.value.password,
    }
    this.registerServiceService.encryptData(reqObj).then((data) => {
      this.registerServiceService.registerUser(data).subscribe((val) => {
        console.log(val)
        if (val.token) {
          this.registerServiceService.appendToken(val.token);
          this.router.navigateByUrl('/home')
        } else {
          console.log(val)
          if (val == 'Already register') {
            this.error2 = true;
          } else {
            this.error = true;
          }
        }
      })
    })
  }

  pageLogin1() {
    this.error = false;
    this.error2 = false;
    this.error3 = false;
    this.signIn = true;
    this.signUp = false;
  }

  pageLogin2() {
    this.error = false;
    this.error2 = false;
    this.error3 = false;
    this.signIn = false;
    this.signUp = true;
  }

  onSubmitButtonClickedLogin() {
    this.error3 = false;
    var reqObj = {
      username: this.signInForm.value.username,
      password: this.signInForm.value.password,
    }
    this.registerServiceService.encryptData(reqObj).then((data) => {
      this.registerServiceService.loginUser(data).subscribe((val) => {
        if (val.token) {
          this.registerServiceService.appendToken(val.token);
          this.router.navigateByUrl('/home')
        } else {
          this.error3 = true;
        }
      })
    })
  }

}
