import { Injectable } from '@angular/core';
import { catchError, mapTo } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';


//Declaring the api url for use later
const apiUrl = 'https://myflix-db-54469.herokuapp.com/';

@Injectable({
  providedIn: 'root'
})

export class FetchApiDataService {
  //Inject HttpClient module to the constructor params making this.http available to the whole class
  constructor (private http: HttpClient) {  }

  /**
   * Register new user via posting to api
   * @param {any} userDetails
   * @returns a new user in json format
   */
  public userRegistration(userDetails: any): Observable<any>{
    console.log(userDetails)
    return this.http.post(apiUrl + 'users', userDetails).pipe(catchError(this.handleError));
  }


  /**
   * Login existing account via posting to api
   * @param {any} userDetails
   * @returns login confirmation
   */  
  public userLogin(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'login', userDetails).pipe(catchError(this.handleError))
  }

  /**
   * Get all movies in the database
   * @returns all movies as array of objects
   */

  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token')
    return this.http.get(apiUrl + 'movies', {
      headers: new HttpHeaders({ 
        Authorization: 'Bearer ' + token
      })
    }).pipe(map(this.extractResponseData), catchError(this.handleError))
  }


  /**
   * Get only 1 movie based on title
   * @param {any} title
   * @returns info on a specific movie as object
   */
  getSpecificMovie(title: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/' + title, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    }).pipe(map(this.extractResponseData), catchError(this.handleError))
  }


  /**
   * Get info on a specific director
   * @param {any} name
   * @returns Info on director as an object
   */
  getDirector(name: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/director/' + name, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    }).pipe(map(this.extractResponseData), catchError(this.handleError))
  }


  /**
   * Get info on a specific genre
   * @param {any} name
   * @returns Info on a genre as an object
   */
  getGenre(name: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/genre/' + name, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    }).pipe(map(this.extractResponseData), catchError(this.handleError))
    
  }


  /**
   * Get info for the user that is currently logged in
   * @returns info on a specific user
   */
  getUser(): Observable<any> {
    const name = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'users/' + name, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    }).pipe(map(this.extractResponseData), catchError(this.handleError)) 
  }


  /**
   * Post new favorite movie to user
   * @param {string} movieID
   * @returns adds movie to favorite movies of the currently logged in user
   */
  addFavoriteMovie(movieID: string): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
      .post(apiUrl + `users/${username}/movies/${movieID}`, movieID, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }


  /**
   * Delete favorite movie from user
   * @param {string} movieID
   * @returns remove movie from users favorite movies
   */
  deleteFavoriteMovie(movieID: string): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
      .delete(apiUrl + `users/${username}/movies/${movieID}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }


  /**
   * Put new info in user profile
   * @param {any} updateDetails
   * @returns Updated user profile
   */
  changeUsername(updateDetails: any): Observable<any> {
    const username = localStorage.getItem('user')
    const token = localStorage.getItem('token');
    return this.http.put(apiUrl + 'users/' + username, updateDetails, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    }).pipe(map(this.extractResponseData), catchError(this.handleError))
  }


  /**
   * Delete user profile from database
   * @param {any} user
   * @returns user has been deleted
   */
  deleteUser(user: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + 'users/' + user, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    }).pipe(map(this.extractResponseData), catchError(this.handleError))
  }


  /**
   * Get favorite movies for a user
   * @returns array of objects
   */
  getFavoriteMovies(): Observable<any> {
    const token = localStorage.getItem('token')
    const user = localStorage.getItem('user')
    return this.http.get(apiUrl + 'users/' + user + '/movies', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    })
    .pipe(map(this.extractResponseData), catchError(this.handleError))
  }


  /**
   * Function to process api response
   * @param {any} res 
   * @returns response from the api or an empty array
   */
  private extractResponseData(res: any): any {
    const body = res;
    console.log(body)
    return body || { };
  }


  /**
   * Error handling function
   * @param {HttpErrorResponse} error 
   * @returns Error status code and message
   */
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error has occurred:', error.error.message)
    } else {
      console.error(`Error Status code ${error.status}, ` + `Error body is: ${error.error.message}`);
    }
    return throwError('Something went wrong!')
  }
}

