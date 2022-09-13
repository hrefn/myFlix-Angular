import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  /**
   * navigate to movies page
   */
  goToMovies(): void {
    this.router.navigate(['movies']);
  }

  /**
   * navigate to user profile page
   */
  goToProfile(): void {
    this.router.navigate(['profile']);
  }

  /**
   * logout and navigate to welcome page
   */
  logout(): void {
    localStorage.clear();
    this.router.navigate(['welcome']);
  }

}
