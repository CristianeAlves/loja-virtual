import { Component, inject, OnInit } from '@angular/core';
import { Produto } from '../../models/produto.interface';
import { ProdutosService } from '../../services/produtos-service';
import { RouterLink } from '@angular/router';
import { Card } from 'primeng/card';
import { Button } from "primeng/button";
import { CurrencyPipe } from '@angular/common';


@Component({
  selector: 'app-lista-produtos',
  imports: [RouterLink, Button, Card, CurrencyPipe],
  templateUrl: './lista-produtos.html',
  styleUrl: './lista-produtos.scss',
})
export class ListaProdutos implements OnInit{
  produtoService = inject(ProdutosService);

  produtos: Produto[] = [];

  ngOnInit(): void {
    this.getAllProdutos();
  }

  getAllProdutos() {
    this.produtoService.getAllProdutos().subscribe((produtos) => {
      this.produtos = produtos;
    });
  }
}
