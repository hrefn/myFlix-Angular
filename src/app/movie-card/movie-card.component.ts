import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DirectorComponent } from '../director/director.component';
import { FetchApiDataService } from '../fetch-api-data.service';
import { GenreComponent } from '../genre/genre.component';
import { SynopsisComponent } from '../synopsis/synopsis.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any [] = [];
  favoriteMovies: any [] = [];
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  ngOnInit(): void {
    console.log('loading page')
    this.getMovies();
    this.getFavorites();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    })
  }

  getFavorites(): void {
    this.fetchApiData.getFavoriteMovies().subscribe((resp: any) => {
      this.favoriteMovies = resp;
      console.log(this.favoriteMovies);
      return this.favoriteMovies
    })
  }

  openGenre(name: string, description: string): void {
    this.dialog.open(GenreComponent, {
      data: {
        Name: name,
        Description: description,
      },
      width: '600px'
    })
  }

  openDirector(name: string, bio: string, birth: string, death: string): void {
    this.dialog.open(DirectorComponent, {
      data: {
        Name: name,
        Bio: bio,
        Birth: birth,
        Death: death
      },
      width: '600px'
    })
  }

  openSynopsis(title: string, description: string, genreName: string, directorName: string, imagepath: string): void {
    this.dialog.open(SynopsisComponent, {
      data: {
        Title: title,
        Description: description,
        GenreName: genreName,
        DirectorName: directorName,
        ImagePath: imagepath
      },
      width: '400px'
    })
  }

  openProfile(): void {
    this.router.navigate(['profile'])
  }

  isFavorite(id: string): boolean {
    return this.favoriteMovies.includes(id)
  }

  addMovieToFavorites(id: string): void {
    console.log(id + ' added to favorites');
    this.fetchApiData.addFavoriteMovie(id).subscribe((resp: any) => {
      console.log(resp)
      this.ngOnInit();
    })
  }

  removeMovieFromFavorites(id: string): void {
    console.log(id + 'remove from favorites');
    this.fetchApiData.deleteFavoriteMovie(id).subscribe((resp) => {
      this.ngOnInit();
    }); 
  }

}
