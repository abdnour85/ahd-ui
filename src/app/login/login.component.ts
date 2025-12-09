import { Component, inject } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email = '';
  password = '';
  authService = inject(AuthService);
  router = inject(Router);

  loggingInStatus = 100;

  login(event: Event) {
    this.loggingInStatus = 101;
    event.preventDefault();
    //console.log(`Login: ${this.email} / ${this.password}`);

    if (localStorage.getItem('missions_list_parameters') != null) localStorage.removeItem('missions_list_parameters')
    if (localStorage.getItem('missions_followup_list_parameters') != null) localStorage.removeItem('missions_followup_list_parameters')

    this.authService
      .login({
        UserName: this.email,
        Password: this.password,
      })
      .subscribe(
        {
          next: (v: any) => {
            this.loggingInStatus = 102;
            //alert('Login success!');
            this.router.navigate(['/dashboard']).then(() => {
              window.location.reload();
            });
          },
          error: (e) => {
            this.loggingInStatus = e.status;
          },
          complete: () => {
            //this.loggingInStatus=104
            console.info('complete');
          },
        });
  }
}
