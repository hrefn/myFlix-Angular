import { Component, Input, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  @Input() userData: any = {};

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<EditProfileComponent>,
    public router: Router,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  /**
   * Uses changeUsername() function to edit user info
   */
  editUser(): void {
    console.log(this.userData)
    this.fetchApiData.changeUsername(this.userData).subscribe((res) => {
      this.dialogRef.close()
      this.snackBar.open('Profile Updated', 'OK', {
        duration: 2000
      });
      if(this.userData.Username || this.userData.Password) {
        localStorage.clear();
        this.router.navigate(['welcome']);
        this.snackBar.open('Please login with new credentials', 'OK', {
          duration: 2000
        })
      }
    })
  }

}
