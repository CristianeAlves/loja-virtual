import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProdutosService } from '../../services/produtos-service';
import { Produto } from '../../models/produto.interface';

@Component({
  selector: 'app-detalhe-produto',
  imports: [],
  templateUrl: './detalhe-produto.html',
  styleUrl: './detalhe-produto.scss'
})
export class DetalheProduto implements OnInit {
  produtoService = inject(ProdutosService);
  produto: Produto | undefined;

  produtoId: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.produtoId = this.route.snapshot.paramMap.get('id');
    console.log('ID do produto:', this.produtoId);

    if(this.produtoId) {
      this.carregaProduto(Number(this.produtoId));
    }
  }

  carregaProduto(id: number): void {
    this.produtoService.getProduto(id).subscribe((produto) => {
      this.produto = produto;
    });
  }

}
