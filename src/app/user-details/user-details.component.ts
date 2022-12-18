import { Component, OnInit } from '@angular/core';
import { ValidationManager } from 'ng2-validation-manager';
import { Router } from '@angular/router';
import { UserService } from './../user.service';
import {ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  form: any; 
  isClicked: Boolean = false;
  url: any;
  selectedFile!: File;
  profile_pic: any;
  id: any;
  userDetails: any;
  constructor(private router: Router, public userService: UserService, private activatedRoute: ActivatedRoute) {
    this.id = this.activatedRoute.snapshot.params['id'];
    console.log(this.id)
   }

  ngOnInit(): void {
    this.form = new ValidationManager({
      'first_name': 'required',
      'last_name': 'required',
      'email': 'required|email',
      'mobile_number': 'required|number|maxLength:10|minLength:10'
    })
    this.getuserByID(this.id)
  }

  getuserByID(id: any) {
    this.url = this.userService.hostUrl + "/users/userdetails/" + id
    this.userService.getUsersDetails(this.url)
      .subscribe((res: any) => {
        this.userDetails = res.data
        console.log(this.userDetails)
        this.form.setValue({
            'first_name': this.userDetails.first_name,
            'last_name': this.userDetails.last_name,
            'email': this.userDetails.email,
            'mobile_number': this.userDetails.mobile_number
        })
        this.profile_pic = this.userDetails.profile_image_url
      },
        err => {
          console.log(err);
        });
  }

  update() {
    if (this.form.isValid()) {
      const body = this.form.getData();
      body.profile_image_url = this.profile_pic
      body.id = this.id;
      this.isClicked = true;
      this.url = this.userService.hostUrl + "/users/update"
      this.userService.updateUser(this.url, body)
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
