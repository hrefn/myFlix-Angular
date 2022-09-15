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
  favoriteMovies: any = [];
  movies: any = {};

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public router: Router,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getUser();
    this.getMovies();
    this.favoriteIDToArray();
  }

  /**
   * Uses fetch api getUser() function to get user info
   */
  getUser(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.user = resp;
      this.favoriteIDToArray();
      console.log(this.favoriteMovies)
      return this.user;
    })
  }

  /**
   * Uses Angular Router to go back to /movies
   */
  goBack(): void {
    this.router.navigate(['/movies'])
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    })
  }

  favoriteIDToArray(): void {
    let movieArr = []
    for (let i = 0; i < this.movies.length; i++) {
      for (let j = 0; j < this.user.FavoriteMovies.length; j++) {
        if (this.user.FavoriteMovies[j] == this.movies[i]._id) {
          movieArr.push(this.movies[i])
        }
      }
    }
    console.log(movieArr)
    for (let i = 0; i < movieArr.length; i++) {
      this.favoriteMovies.push(movieArr[i].Title)
    }
    return this.favoriteMovies
  }

  openEditProfile(): void {
    this.dialog.open(EditProfileComponent, {
      width: '300px'
    })
  }

}
