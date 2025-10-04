import { Component, inject } from '@angular/core';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { CarrinhoService } from '../../services/carrinho-service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-resumo-compra',
  imports: [DividerModule, ButtonModule, CurrencyPipe],
  templateUrl: './resumo-compra.html',
  styleUrl: './resumo-compra.scss'
})
export class ResumoCompra {

  carrinhoService = inject(CarrinhoService)

  totalItens = this.carrinhoService.totalItens;
  precoTotal = this.carrinhoService.precoTotal;

}
