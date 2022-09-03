import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { User, UserColumns } from '../model/user';
import { AuthService } from '../_services/auth.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  displayedColumns: string[] = UserColumns.map((col) => col.key);
  columnsSchema: any = UserColumns;
  dataSource = new MatTableDataSource<User>();
  valid: any = {};
  length: number = 0;
  pageSize: number = 5;
  usersData: any;
  usersList: any[] = [];
  showMsg:any;
  errorMessage="";
  loading=false;

  constructor(
    public dialog: MatDialog, 
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.authService.getUsers().subscribe((res: any) => {
      this.dataSource.data = res;
      if (this.dataSource.data) {
        var i =1;
        const arrUsers = this.dataSource.data.map(v => ({...v, index: i++}));        
    
        this.length = this.dataSource.data.length;
        this.usersList = arrUsers.splice(0, this.pageSize);        
      }
    });
  }

  editRow(row: User) {
    if (row.id === 0) {
      this.authService.addUser(row)
      .subscribe({
          next:data=>{
            row.id = data.id;
            row.isEdit = false;
            this.getUser();
            this.toastr.success('Success', 'Customer added successfully.');
          },
          error:data=>{
              if (data.error.code == 400) {
                this.toastr.error('Error', data.error.message);
              } else{
                this.toastr.error('Error', "Unknown error occured when creating this account!");
              }
          }
      });
    } else {
      this.authService.updateUser(row)
      .subscribe({
        next:data=>{
          row.isEdit = false;
          this.getUser();
          this.toastr.success('Success', 'Customer updated successfully.');
        },
        error:data=>{
            if (data.error.code == 400) {
              this.toastr.error('Error', data.error.message);
            } else{
              this.toastr.error('Error', "Unknown error occured when creating this account!");
            }
        }
    });
      
    }
  }

  pageEvent(event: PageEvent) {
    this.pageSize = event.pageSize;
    const count = event.pageIndex * event.pageSize;
    const size = event.pageSize;
   
    var i = 1;
    const arrUsers = this.dataSource.data.map(v => ({...v, index: i++}));   
    this.usersList = [];
    this.usersList = arrUsers.splice(count, size);
    
  }

  addRow() {
    const newRow: User = {
      id: 0,
      firstName: '',
      lastName:'',
      email: '',
      phone: '',
      isEdit: true,
      isSelected: false,
    };
    console.log(newRow);
    this.usersList= [newRow, ...this.usersList];
    console.log(this.usersList);
  }

  removeRow(id: number) {
    this.dialog
    .open(ConfirmDialogComponent)
    .afterClosed()
    .subscribe((confirm) => {
      if(confirm) {
        this.authService.deleteUser(id)

        .subscribe({
          next:data=>{
            this.getUser();
            this.toastr.success('Success', 'Customer deleted successfully.');
          },
          error:data=>{
              if (data.error.code == 400) {
                this.toastr.error('Error', data.error.message);
              } else{
                this.toastr.error('Error', "Unknown error occured!");
              }
          }
        });
      }
    })
    
  }

  removeSelectedRows() {
    const users = this.dataSource.data.filter((u: User) => u.isSelected);
    this.dialog
      .open(ConfirmDialogComponent)
      .afterClosed()
      .subscribe((confirm) => {
        if (confirm) {
          this.authService.deleteUsers(users).subscribe(() => {
            this.usersList = this.usersList.filter(
              (u: User) => !u.isSelected
            );
          });
        }
      });
  }

  inputHandler(e: any, id: number, key: string) {
    if (!this.valid[id]) {
      this.valid[id] = {};
    }
    this.valid[id][key] = e.target.validity.valid;
  }

  disableSubmit(id: number) {
    if (this.valid[id]) {
      return Object.values(this.valid[id]).some((item) => item === false);
    }
    return false;
  }

}
