import { Component ,OnInit} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from './../user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  userList: any = []
  url:any
  constructor(private fb: FormBuilder, private router: Router, public userService:UserService) {
  }
  ngOnInit(): void {
    this.getUsers();
  }
  getUsers() {
    this.url = this.userService.hostUrl + "/users/userlist"
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
    this.router.navigateByUrl('user/user-details/' + id)
  }
  
  delete(item: any) {
    var body = {
      id: item
    }
    this.url = this.userService.hostUrl + "/users/remove"
    this.userService.remove(this.url, body)
      .subscribe((res: any) => {
        if (res.data.deletedCount == 1) {
          console.log("User Deleted Successfully")
           this.getUsers();
        } else {
          console.log("Something Went Wrong")
        }
      })
  }

  goto() {
    this.router.navigate(
      ["adduser"]);
  }

}
