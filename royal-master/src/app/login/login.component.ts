import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formdata = {email:"",password:""};
  submit=false;
  loading=false;
  errorMessage="";
  constructor(private auth:AuthService,private router:Router) { }

  ngOnInit(): void {
    this.auth.canAuthenticate();
  }

  onSubmit(){
    const data = {
      email: this.formdata.email,
      password: this.formdata.password
    };
    this.loading=true;
    //call login service
    this.auth.login(data)
    .subscribe({
        next:(res:any)=>{
            //store token            
            this.auth.storeToken(res.tokens.access.token);
            this.auth.canAuthenticate();
            this.router.navigate(['/dashboard']);
        },
        error:data=>{      
            if (data.error.code == 401) {
                this.errorMessage = "Invalid Credentials!";
            } else{
                this.errorMessage = "Unknown error when logging into this account!";
            }
        }
    }).add(()=>{
        this.loading =false;
        console.log('login process completed!');

    })
  }

}
