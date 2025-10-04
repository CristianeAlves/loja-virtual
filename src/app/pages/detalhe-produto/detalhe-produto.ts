import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProdutosService } from '../../services/produtos-service';
import { ButtonDemoComponent } from '../../components/buttonDemo/buttonDemo.component';
import { CurrencyPipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, switchMap } from 'rxjs';
import { CarrinhoService } from '../../services/carrinho-service';

@Component({
  selector: 'app-detalhe-produto',
  imports: [ButtonDemoComponent, CurrencyPipe],
  templateUrl: './detalhe-produto.html',
  styleUrl: './detalhe-produto.scss',
})
export class DetalheProduto {
  private produtoService = inject(ProdutosService);
  private route = inject(ActivatedRoute);
  private carrinhoService = inject(CarrinhoService);

  public produto = toSignal(
    this.route.paramMap.pipe(
      map((params) => Number(params.get('id'))),
      switchMap((id) => this.produtoService.getProduto(id))
    )
  );

  adicionarAoCarrinho() {
    const produto = this.produto();
    if(produto) {
      this.carrinhoService.adicionarAoCarrinho(produto);
      console.log("PRODUTO ADICIONADO PELO DETALHE PRODUTO:", produto.title);
    }
  }
}
