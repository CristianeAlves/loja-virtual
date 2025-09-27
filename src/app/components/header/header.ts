import { Component, OnInit } from '@angular/core';
import { Toolbar } from 'primeng/toolbar';
import { AvatarModule } from 'primeng/avatar';
import { SharedModule, MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { SplitButtonModule } from 'primeng/splitbutton';

// Interface personalizada para itens do menu (opcional se quiser estender)
export interface CustomMenuItem extends MenuItem {
  routerLink?: string[];
  badge?: string;
}

@Component({
  selector: 'app-header',
  imports: [
    Toolbar,
    AvatarModule,
    ButtonModule,
    SharedModule,
    RouterModule,
    SplitButtonModule,
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements OnInit {
  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      {
        label: 'Dashboard',
        icon: 'pi pi-chart-line',
        routerLink: ['/admin/dashboard'],
      },
      {
        label: 'Produtos',
        icon: 'pi pi-shopping-bag',
        routerLink: ['/admin/manage-products'],
      },
      {
        label: 'Usuários',
        icon: 'pi pi-users',
        routerLink: ['/admin/manage-users'],
      },
    ];
  }
}
