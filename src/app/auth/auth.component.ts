import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  templateUrl: './auth.component.html',
  selector: 'app-auth',
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error: null;
  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
  constructor(private authService: AuthService, private router: Router) {}
  onSubmit(form: NgForm) {
    this.error = null;
    let obs: Observable<AuthResponseData>;
    if (this.isLoginMode) {
      obs = this.authService.login(form.value.email, form.value.password);
      this.isLoading = true;
    } else {
      obs = this.authService.signUp(form.value.email, form.value.password);
      this.isLoading = true;
    }
    obs.subscribe(
      (res) => {
        console.log(res);
        this.router.navigate(['/recipes']);
      },
      (errMessage) => {
        console.log(errMessage);
        this.error = errMessage;
      }
    );
    this.isLoading = false;
    form.reset();
  }
}
