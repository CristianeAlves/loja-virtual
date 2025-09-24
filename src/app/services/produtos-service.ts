import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Produto } from '../models/produto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  http = inject(HttpClient);
  apiUrl = "https://fakestoreapi.com/products";

  getAllProdutos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.apiUrl);
  }

  getProduto(id: number): Observable<Produto> {
    return this.http.get<Produto>(`${this.apiUrl}/${id}`)
  }
  
}
