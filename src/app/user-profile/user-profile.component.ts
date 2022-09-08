import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: any = {};
  // favoriteMovies: any = {};
  // movie: any = {};

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public router: Router,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    // this.getMovies()
    // this.getFavorites()
    this.getUser()
  }

  /**
   * Uses fetch api getUser() function to get user info
   */
  getUser(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.user = resp;
      console.log(this.user);
      return this.user;
    })
  }

  /**
   * Uses Angular Router to go back to /movies
   */
  goBack(): void {
    this.router.navigate(['/movies'])
  }

  // getMovies(): void {
  //   this.fetchApiData.getAllMovies().subscribe((resp: any) => {
  //     this.movie = resp;
  //     console.log(this.movie);
  //     return this.movie;
  //   })
  // }

  // getFavorites(): void {
  //   this.fetchApiData.getFavoriteMovies().subscribe((resp: any) => {
  //     this.favoriteMovies = resp;
  //     console.log(this.favoriteMovies);
  //     return this.favoriteMovies;
  //   })
  // }

  // isFavorite(id: string): boolean {
  //   return this.favoriteMovies.includes(id)
  // }

  openEditProfile(): void {
    this.dialog.open(EditProfileComponent, {
      width: '300px'
    })
  }

}
