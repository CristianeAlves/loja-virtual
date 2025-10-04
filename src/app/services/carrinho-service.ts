import { computed, inject, Injectable, signal } from '@angular/core';
import { Produto } from '../models/produto.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {

  private itensDoCarrinho = signal<Produto[]>([]);
  private route = inject(Router);

  public readonly itens = this.itensDoCarrinho.asReadonly();
  public readonly totalItens = computed(() => this.itensDoCarrinho().length);
  public readonly precoTotal = computed(() => {
    return this.itensDoCarrinho().reduce((total, item) => total + item.price, 0);
  });

  adicionarAoCarrinho(produto: Produto) {
    this.itensDoCarrinho.update(itens => [...itens, produto]);
    console.log("Produto adicionado: ", produto.title);

    this.route.navigate(['/carrinho']);
  }


  limparCarrinho() {
    this.itensDoCarrinho.set([]);
  }
  
}
