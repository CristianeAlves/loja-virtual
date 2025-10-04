import { Routes } from '@angular/router';
import { ListaProdutos } from './pages/lista-produtos/lista-produtos';
import { DetalheProduto } from './pages/detalhe-produto/detalhe-produto';
import { NotFound } from './pages/not-found/not-found';
import { Admin } from './pages/admin/admin';
import { Dashboard } from './pages/admin/dashboard/dashboard';
import { ManageProducts } from './pages/admin/manage-products/manage-products';
import { ManageUsers } from './pages/admin/manage-users/manage-users';
import { Carrinho } from './pages/carrinho/carrinho';

export const routes: Routes = [
    {
        path: 'lista-produtos', 
        component: ListaProdutos
    },
    {
        path: 'detalhe-produto/:id', 
        component: DetalheProduto
    },
    {
        path: 'carrinho', 
        component: Carrinho
    },
    {
        path: 'admin', 
        component: Admin,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: Dashboard },
            { path: 'manage-products', component: ManageProducts },
            { path: 'manage-users', component: ManageUsers }
        ]
    },
    {
        path: '', 
        redirectTo: '/lista-produtos', 
        pathMatch: 'full'
    },
    {
        path: '**', 
        component: NotFound
    }
];
