import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from '../../service/http.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})

export class UserListComponent implements OnInit {
  userForm: FormGroup;
  baseUrl = "http://localhost:3000/";
  userData;
  editButton = false;
  userId;
  constructor(
    private fb: FormBuilder,
    public httpService: HttpService,
    route: ActivatedRoute
  ) {
    this.userForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]), //, [Validators.required]
      phoneNumber: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
    this.fetchUserDetails();
  }


  onSubmit({ value, valid }: { value: any, valid: boolean }) {
    if (!valid) {
      this.userForm.markAsDirty();

    } else {
      if (this.userForm.dirty) {
        this.userForm.markAsPristine();
        if (value.update) {
          value['userId'] = this.userId;
          this.httpService.get(this.baseUrl + 'edit', value).subscribe(resData => {
            if (resData.msg == 'data edit successfully') {
              this.fetchUserDetails();
              this.userForm.reset();
              alert('User editted successfully');
              this.editButton = false;
            }
          });
        } else {
          value['query'] = 'insert';
          this.httpService.get(this.baseUrl + 'create', value).subscribe(resData => {
            if (resData.msg == 'user created successfully') {
              this.userForm.reset();
              alert('user created successfully');
            }
            this.fetchUserDetails();
            if (resData.msg.indexOf('Already') > 0) {
              alert('Email Already exists');
            }
          });
        }
      }
    }
  }

  onRedirectToSubmit({ value, valid }: { value: any, valid: boolean }) {
    value['update'] = 'update';
    this.onSubmit({ value: value, valid: true });
  }

  fetchUserDetails() {
    let obj = {
      query: "find"
    }
    this.httpService.get(this.baseUrl + 'create', obj).subscribe(result => {
      if (result) {
        this.userData = result;
      }
    })
  }

  onEdit(user) {
    this.editButton = true;
    this.userId = '';
    if (user._id) {
      this.userId = user._id;
      this.userForm.controls['firstName'].setValue(user.firstName);
      this.userForm.controls['lastName'].setValue(user.lastName);
      this.userForm.controls['email'].setValue(user.email);
      this.userForm.controls['phoneNumber'].setValue(user.phoneNumber);
      alert('Edit User detail');
    }
  }
  onDelete(user) {
    if (user._id) {
      let obj = {
        userData: user,
        query: 'delete'
      }
      this.httpService.get(this.baseUrl + 'delete', obj).subscribe(data => {
        if (data.msg == "data deleted successfully") {
          alert('data deleted successfully');
          this.fetchUserDetails();
        }
      });
    }
  }
}
