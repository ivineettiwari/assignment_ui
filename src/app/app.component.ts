import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-project';
  loadData: boolean = false;
  userEmail: String = '';

  constructor(private router: Router) {

  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    var token = this.getSessionToken();
    if(token && token.emailID && (token.expiry > Date.now() / 1000)){
      this.loadData = true; 
      this.userEmail = token.emailID; 
    }else{
      this.router.navigateByUrl('/register');
    }
  }

  getSessionToken() {
    var token: any = sessionStorage.getItem('token');
    if(token){
      let payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    }else{
      return null
    }
  }
}
