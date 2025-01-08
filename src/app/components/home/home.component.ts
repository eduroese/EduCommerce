import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ServercommandsService } from '../../services/servercommands.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  //functions

  dropdownVisible: boolean = false;
  userData: any;

  constructor(private authService: AuthService) {
    this.userData = this.authService.getUserData();
  }

  serverCommandsService = inject(ServercommandsService);
  products: any[] = [];

  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }

  async getProducts() {
    this.products = await this.serverCommandsService.getAllProducts();
  }

  ngOnInit() {
    this.getProducts();
  }

  isUserLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  logout(): void {
    this.dropdownVisible = false;
    return this.authService.logout();
  }

  getUserImg(): string {
    return this.userData ? this.userData.user.imagem : 'default-img-url.jpg';
  }
}
