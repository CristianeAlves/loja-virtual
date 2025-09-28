import { Component } from '@angular/core';
import { Toolbar } from 'primeng/toolbar';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header-admin',
  imports: [Toolbar, AvatarModule, ButtonModule, RouterModule],
  templateUrl: './header-admin.html',
  styleUrl: './header-admin.scss'
})
export class HeaderAdmin {

}
