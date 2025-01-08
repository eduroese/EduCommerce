import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-checkout',
  imports: [CommonModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
  cartItems: any[] = [];
  dropdownVisible: boolean = false;
  userData: any;
  totalPrice: number = 0;
  visualizacoes: number[] = [];
  currentProductID: string[] = [];

  constructor(private http: HttpClient, private authService: AuthService) {
    this.userData = this.authService.getUserData();
  }

  ngOnInit(): void {
    const cart = JSON.parse(localStorage.getItem('cart') ?? '[]');
    this.cartItems = cart;
    this.calculateTotalPrice();

    if (this.cartItems.length > 0) {
      this.cartItems.forEach((element) => {
        this.currentProductID.push(element._id);
        this.visualizacoes.push(element.visualizacoes);
      });
    }
  }

  calculateTotalPrice(): void {
    this.totalPrice = this.cartItems.reduce((total, item) => {
      return total + (item.preco || 0);
    }, 0);
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

  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }

  getTotal() {
    return this.cartItems.reduce((total, item) => total + item.preco, 0);
  }

  getCartCount(): number {
    const cart = JSON.parse(localStorage.getItem('cart') ?? '[]');

    if (cart && Array.isArray(cart)) {
      return cart.length;
    } else {
      return 0;
    }
  }

  removeFromCart(item: any) {
    const index = this.cartItems.indexOf(item);
    if (index > -1) {
      this.cartItems.splice(index, 1);
      this.getTotal(); // Atualiza o preço total após a remoção
    }
  }

  async finalizePurchase(value: number) {
    if (!this.currentProductID || this.currentProductID.length === 0) {
      console.log('Erro: ID do produto não está definido.');
      return;
    }

    try {
      const updatePromises = this.currentProductID.map(
        (elementCurrent, index) => {
          const bodyData = {
            visualizacoes: this.visualizacoes[index] + value,
          };

          return firstValueFrom(
            this.http.patch(
              'http://localhost:8000/products/updateProduct/' + elementCurrent,
              bodyData
            )
          );
        }
      );

      // Aguarda todas as requisições serem concluídas em paralelo
      await Promise.all(updatePromises);

      localStorage.removeItem('cart');
      this.cartItems = [];
      this.calculateTotalPrice();
      console.log('Compra finalizada com sucesso!');
    } catch (err) {
      console.log('Erro ao finalizar a compra:', err);
    }
  }
}
