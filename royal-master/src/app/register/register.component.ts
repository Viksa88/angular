import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formdata = {firstName:"",lastName:"",email:"",password:"",c_password:""};
  submit=false;
  errorMessage="";
  loading=false;

  constructor(private auth:AuthService, private router:Router, private toastr: ToastrService ) { }

  ngOnInit(): void {
    this.auth.canAuthenticate();
  }

  onSubmit(){
    const data = {
        firstName: this.formdata.firstName,
        lastName: this.formdata.lastName,
        email: this.formdata.email,
        password: this.formdata.password
      };
      this.loading=true;

      //call register service
      this.auth.register(data)
      .subscribe({
          next:data=>{
            this.router.navigate(['/login']);
            this.toastr.success('Register', 'User register successfully !!!');
          },
          error:data=>{
            console.log(data.error.message);
              if (data.error.code == 400) {
                  this.errorMessage = data.error.message;
              } else{
                  this.errorMessage = "Unknown error occured when creating this account!";
              }
          }
      }).add(()=>{
          this.loading =false;
          console.log('Register process completed!');
      })
  }

}
