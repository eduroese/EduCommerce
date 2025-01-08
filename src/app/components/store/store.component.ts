import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { ServercommandsService } from '../../services/servercommands.service';

@Component({
  selector: 'app-store',
  imports: [CommonModule, FormsModule],
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css'],
})
export class StoreComponent {
  serverCommandsService = inject(ServercommandsService);
  products: any[] = [];
  name: string = '';
  imagem: string = '';
  preco: number = 0;
  visualizacoes: number = 0;
  isEditing: boolean = false;
  isPopupHidden: boolean = true;
  currentProductID: string = '';
  userData: any;
  dropdownVisible: boolean = false;
  cartItemCount = 0;
  cartItens: any[] = [];

  constructor(private http: HttpClient, private authService: AuthService) {
    this.userData = this.authService.getUserData();
  }

  isUserLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }

  logout(): void {
    this.dropdownVisible = false;
    return this.authService.logout();
  }

  addToCart(item: any) {
    let cart = JSON.parse(localStorage.getItem('cart') ?? '[]');

    cart.push(item);

    localStorage.setItem('cart', JSON.stringify(cart));
  }

  getUserImg(): string {
    return this.userData ? this.userData.user.imagem : 'default-img-url.jpg';
  }

  async getProducts() {
    this.products = await this.serverCommandsService.getAllProducts();
  }

  getCartCount(): number {
    const cart = JSON.parse(localStorage.getItem('cart') ?? '[]');

    if (cart && Array.isArray(cart)) {
      return cart.length;
    } else {
      return 0;
    }
  }

  ngOnInit() {
    this.getProducts();
  }

  openAddProductPopup() {
    this.isEditing = false;
    this.isPopupHidden = false;
  }

  closeAddProductPopup() {
    this.isPopupHidden = true;
    this.name = '';
    this.imagem = '';
    this.preco = 0;
    this.currentProductID = '';
  }

  async setEditProduct(form: NgForm, product: any) {
    this.isPopupHidden = false;
    this.isEditing = true;

    this.name = product.name;
    this.imagem = product.imagem;
    this.preco = product.preco;
    this.currentProductID = product._id;
  }

  async verifier(data: any) {
    if (this.currentProductID === '') {
      this.addProduct(data);
    } else {
      this.editProduct(data);
    }
  }

  async editProduct(data: any) {
    if (data.invalid) {
      return;
    }

    const bodyData = {
      name: this.name,
      imagem: this.imagem,
      preco: this.preco,
      visualizacoes: this.visualizacoes,
    };

    try {
      await firstValueFrom(
        this.http.patch(
          'http://localhost:8000/products/updateProduct/' +
            this.currentProductID,
          bodyData
        )
      );
      data.resetForm();
      this.closeAddProductPopup();
      this.getProducts();
    } catch (err) {
      console.log('Erro ao adicionar produto:', err);
    }
  }

  async addProduct(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const bodyData = {
      name: this.name,
      imagem: this.imagem,
      preco: this.preco,
      visualizacoes: this.visualizacoes,
    };

    try {
      await firstValueFrom(
        this.http.post('http://localhost:8000/products/createProduct', bodyData)
      );
      form.resetForm(); // Limpa o formulário após sucesso
      this.closeAddProductPopup();
      this.getProducts(); // Atualiza a lista de produtos
    } catch (err) {
      console.log('Erro ao adicionar produto:', err);
    }
  }
}
