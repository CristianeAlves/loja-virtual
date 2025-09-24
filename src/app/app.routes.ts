import { Routes } from '@angular/router';
import { ListaProdutos } from './pages/lista-produtos/lista-produtos';
import { DetalheProduto } from './pages/detalhe-produto/detalhe-produto';
import { NotFound } from './pages/not-found/not-found';

export const routes: Routes = [
    {path: 'lista-produtos', component: ListaProdutos},
    {path: 'detalhe-produto/:id', component: DetalheProduto},
    {path: '', redirectTo: '/lista-produtos', pathMatch: 'full'},
    {path: '**', component: NotFound }
];
