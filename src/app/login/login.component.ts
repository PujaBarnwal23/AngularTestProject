import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

    SignUpForm !: FormGroup;

    loginFrom !: FormGroup;

    submitted = false;

    constructor(private fb: FormBuilder,
      private authService: AuthService,
      private router: Router,
      private http : HttpClient) {}

    

    ngOnInit(): void | string | null | Promise<boolean> {

      this.http.get('').subscribe();
      

      if (this.authService.isLoggedIn()) {
        return this.router.navigate(['dashboard']);
      }

      this.loginFrom = this.fb.group({
        username: ['', [Validators.required]],
        password: ['', Validators.required]
      })
    }

    get f(): { [key: string]: AbstractControl } {
      return this.loginFrom.controls;
    }

    login() {
      //debugger

      this.submitted = true;
      if (this.loginFrom.invalid) {
        return;
      }
      // console.log(this.loginFrom.value);
      if (this.loginFrom.valid) {
        this.authService.login(this.loginFrom.value).subscribe(
          (result) => {
            localStorage.setItem('token', result.token);
            this.router.navigate(['/dashboard']);
          }
          // },
          // (err: Error) => {
            
          //   alert(err);
          // }
        )
      }
    }

}

