import { Component, inject } from '@angular/core';
import { DataView } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { CarrinhoService } from '../../services/carrinho-service';
import { ResumoCompra } from "../../components/resumo-compra/resumo-compra";
import { Produto } from '../../models/produto.interface';


@Component({
  selector: 'app-carrinho',
  imports: [DataView, ButtonModule, CommonModule, ResumoCompra],
  templateUrl: './carrinho.html',
  styleUrl: './carrinho.scss'
})
export class Carrinho {

  carrinhoService = inject(CarrinhoService);
  itens = this.carrinhoService.itens;
  
}
