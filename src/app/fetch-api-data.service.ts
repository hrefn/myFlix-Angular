import { Injectable } from '@angular/core';
import { catchError, mapTo } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

const apiUrl = 'https://myflix-db-54469.herokuapp.com/';

@Injectable({
  providedIn: 'root'
})

export class FetchApiDataService {
  constructor (private http: HttpClient, public snackBar: MatSnackBar) {

  }
  public userRegistration(userDetails: any): Observable<any>{
    console.log(userDetails)
    return this.http.post(apiUrl + 'users', userDetails).pipe(catchError(this.handleError));
  }

  public userLogin(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'login', userDetails).pipe(catchError(this.handleError))
  }

  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token')
    return this.http.get(apiUrl + 'movies', {
      headers: new HttpHeaders({ 
        Authorization: 'Bearer ' + token
      })
    }).pipe(map(this.extractResponseData), catchError(this.handleError))
  }

  getSpecificMovie(title: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/' + title, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    }).pipe(map(this.extractResponseData), catchError(this.handleError))
  }

  getDirector(name: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/director/' + name, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    }).pipe(map(this.extractResponseData), catchError(this.handleError))
  }

  getGenre(name: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/genre/' + name, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    }).pipe(map(this.extractResponseData), catchError(this.handleError))
    
  }

  getUser(): Observable<any> {
    const name = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'users/' + name, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    }).pipe(map(this.extractResponseData), catchError(this.handleError)) 
  }

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

  deleteFavoriteMovie(movieID: any): Observable<any> {
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

  changeUsername(updateDetails: any): Observable<any> {
    const username = localStorage.getItem('user')
    const token = localStorage.getItem('token');
    return this.http.put(apiUrl + 'users/' + username, updateDetails, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    }).pipe(map(this.extractResponseData), catchError(this.handleError))
  }

  deleteUser(user: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + 'users/' + user, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    }).pipe(map(this.extractResponseData), catchError(this.handleError))
  }

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


  private extractResponseData(res: any): any {
    const body = res;
    console.log(body)
    return body || { };
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error has occurred:', error.error.message)
    } else {
      console.error(`Error Status code ${error.status}, ` + `Error body is: ${error.error.message}`);
    }
    // this.snackBar.open(throwError,'OK', {duration: 2000})
    return throwError('Something went wrong!')
  }
}

