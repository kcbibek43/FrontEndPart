import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  role = sessionStorage.getItem('role');

  getToolbarColor() {
    return this.role === 'landlord' ? 'primary' : 'accent';
  }
}
