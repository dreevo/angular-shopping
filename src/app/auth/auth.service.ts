import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user.model';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;
  constructor(private http: HttpClient, private router: Router) {}
  signUp(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCC_yzNivIsqcQZsG3Hd20Q5XLyR2A9tiI',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError((err) => {
          let errorMessage = 'An unknown error occured!';
          if (!err.error || !err.error.error) return throwError(errorMessage);
          switch (err.error.error.message) {
            case 'EMAIL_EXISTS':
              errorMessage = 'this email exists already';
          }
          return throwError(errorMessage);
        }),
        tap((res) => {
          const expirationDate = new Date(
            new Date().getTime() + +res.expiresIn * 1000
          );
          const user = new User(
            res.email,
            res.localId,
            res.idToken,
            expirationDate
          );
          this.user.next(user);
          this.autoLogout(+res.expiresIn * 1000);
          localStorage.setItem('userData', JSON.stringify(user));
        })
      );
  }
  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCC_yzNivIsqcQZsG3Hd20Q5XLyR2A9tiI',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError((err) => {
          let errorMessage = 'An unknown error occured!';
          if (!err.error || !err.error.error) return throwError(err);
          switch (err.error.error.message) {
            case 'EMAIL_EXISTS':
              errorMessage = 'this email exists already';
          }
          return throwError(err);
        }),
        tap((res) => {
          const expirationDate = new Date(
            new Date().getTime() + +res.expiresIn * 1000
          );
          const user = new User(
            res.email,
            res.localId,
            res.idToken,
            expirationDate
          );
          this.user.next(user);
          this.autoLogout(+res.expiresIn * 1000);
          localStorage.setItem('userData', JSON.stringify(user));
        })
      );
  }
  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) return;
    else {
      const loadedUser = new User(
        userData.email,
        userData.id,
        userData._token,
        new Date(userData._tokenExpirationDate)
      );
      if (loadedUser.getToken) {
        const expirationDuration =
          new Date(userData._tokenExpirationDate).getTime() -
          new Date().getTime();
        this.autoLogout(expirationDuration);
        this.user.next(loadedUser);
      }
    }
  }
}
