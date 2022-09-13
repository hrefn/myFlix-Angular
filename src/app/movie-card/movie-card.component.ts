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

  /**
   * Get all movies with fetch api data function getAllMovies()
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    })
  }

  /**
   * Get user's favorite movies with fetch api data function getFavorites()
   */
  getFavorites(): void {
    this.fetchApiData.getFavoriteMovies().subscribe((resp: any) => {
      this.favoriteMovies = resp;
      console.log(this.favoriteMovies);
      return this.favoriteMovies
    })
  }

  /**
   * Open genre dialog, passes in the name and description of the genre from the movie component
   * @param {string} name 
   * @param {string} description 
   */
  openGenre(name: string, description: string): void {
    this.dialog.open(GenreComponent, {
      data: {
        Name: name,
        Description: description,
      },
      width: '600px'
    })
  }

  /**
   * Open director dialog, passes in name, bio, birth year, and death year from the movie component
   * @param {string} name 
   * @param {string} bio 
   * @param {string} birth 
   * @param {string} death 
   */
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

  /**
   * Open movie synopsis dialog, passes in title, description, genre, director, and movie image path from movie component
   * @param {string} title 
   * @param {string} description 
   * @param {string} genreName 
   * @param {string} directorName 
   * @param {string} imagepath 
   */
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

  /**
   * Uses Angular Router to navigate to profile page
   */
  openProfile(): void {
    this.router.navigate(['profile'])
  }

  /**
   * Function to check if movie is in users favorite movie
   * @param {string} id
   * @returns returns true or false based on if a movie is in users favorite movies
   */
  isFavorite(id: string): boolean {
    return this.favoriteMovies.includes(id)
  }

  /**
   * Add movie to users favorite movies with addFavoriteMovie(id) function
   * @param {string} id
   */
  addMovieToFavorites(id: string): void {
    console.log(id + ' added to favorites');
    this.fetchApiData.addFavoriteMovie(id).subscribe((resp: any) => {
      console.log('movie-card-component response' + resp)
      this.ngOnInit();
    })
  }

  /**
   * Remove movie from users favorite movies with deleteFavoriteMovie(id) function
   * @param {string} id
   */
  removeMovieFromFavorites(id: string): void {
    console.log(id + ' removed from favorites');
    this.fetchApiData.deleteFavoriteMovie(id).subscribe((resp) => {
      this.ngOnInit();
    }); 
  }

}
