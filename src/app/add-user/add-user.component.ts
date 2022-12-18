import { Component, OnInit } from '@angular/core';
import { ValidationManager } from 'ng2-validation-manager';
import { Router } from '@angular/router';
import { UserService } from './../user.service';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  form: any; 
  isClicked: Boolean = false;
  url: any;
  selectedFile!: File;
  profile_pic: any;
  constructor( private router: Router, public userService:UserService) { }

  ngOnInit(): void {
    this.form = new ValidationManager({
      'first_name': 'required',
      'last_name': 'required',
      'email': 'required|email',
      'mobile_number': 'required|number|maxLength:10|minLength:10'
    })
  }

  save() {
    if (this.form.isValid()) {
      const body = this.form.getData();
      body.profile_image_url= this.profile_pic
      this.isClicked = true;
      this.url = this.userService.hostUrl + "/users/saveUser"
      this.userService.addUser(this.url, body)
        .subscribe((res: any) => {
          if (res.status == true) {
            // this.toaster.success('Message Success!', 'User Added Successfully!')
            this.router.navigateByUrl('user');
          } else {
            // this.toaster.error('Message Error!', 'Something Went Wrong!');
            console.log("Something Went Wrong")
          }
        });
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0];
    const formData = new FormData();
    formData.append('filedata',this.selectedFile);
    console.log(formData);
    this.url = this.userService.hostUrl + "/users/saveimages"
    this.userService.addimages(this.url, formData)
      .subscribe((res: any) => {
        if (res.length != 0) {
          // this.toaster.success('Message Success!', 'Profile Pic Added Successfully!')
          this.profile_pic = res[0].mediaSource
        } else {
          console.log("Something Went Wrong")
        }
      });
  }

}
