import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from './user.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
  
export class AppComponent {
  userList: any = []
  url:any
  constructor(private fb: FormBuilder, private router: Router, public userService:UserService) {
  }
  ngOnInit(): void {
    this.getUsers();
  }
  getUsers() {
    this.url = this.userService.hostUrl + "/users/userlist"
    console.log(this.url)
    this.userService.getUsers(this.url)
      .subscribe((res: any) => {
          this.userList = res.data
      },
        err => {
          console.log(err);
        });
  }


  edit(item: any) {
    var id = item._id;
    this.router.navigateByUrl('hospitals/details/' + id)
  }
  delete(item: any) {
    // var body = {
    //   id: item,
    //   LocationID: this.locationid,
    //   UserName: this.username,
    //   MainModuleName: 'Hospitals',
    //   ModuleName: 'Hospital',
    //   Action: 'Delete',
    //   userID: this.UserID
    // }
    // var url = this.base_path_service.basePathUrl() + 'hospital/remove';
    // this.base_path_service.postRequest(url, body).subscribe(res => {
    //   if (res[0].json.n == 1) {
    //     this.search.controls['search'].setValue('');
    //     this.getAllHospitals('deleteFire')
    //   }
    // })
  }

  goto() {
    this.router.navigate(
      ["adduser"]);
  }
}
