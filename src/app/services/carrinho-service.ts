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
  public readonly totalItens = computed(() => this.itensDoCarrinho.length);
  public readonly precoTotal = computed(() => {
    return this.itensDoCarrinho().reduce((total, item) => total + item.price, 0);
  });

  adicionarAoCarrinho(produto: Produto) {
    this.itensDoCarrinho.update(itens => [...itens, produto]);
    console.log("Produto adicionado: ", produto.title);

    this.route.navigate(['/carrinho']);
  }

  //   adicionarAoCarrinho(produto: Produto) {
  //   console.log('🛒 ANTES - Itens no carrinho:', this.itensDoCarrinho());
  //   this.itensDoCarrinho.update((itens) => {
  //     const novosItens = [...itens, produto];
  //     console.log('🛒 DEPOIS - Novos itens:', novosItens);
  //     return novosItens;
  //   });
  //   console.log('🛒 FINAL - Total:', this.itensDoCarrinho().length);
  //   this.route.navigate(['/carrinho']);
  // }

  limparCarrinho() {
    this.itensDoCarrinho.set([]);
  }
  
}
