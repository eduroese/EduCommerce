import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServercommandsService {
  productsArray: any[] = [];
  isResultLoaded = false;

  constructor(private http: HttpClient) {
    this.getAllProducts();
  }

  async getAllProducts(): Promise<any[]> {
    const resultData: any = await firstValueFrom(
      this.http.get('http://localhost:8000/products/getAll')
    );
    this.isResultLoaded = true;
    this.productsArray = resultData.data;
    return this.productsArray;
  }
}
