import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { HeaderAdmin } from "../../components/header-admin/header-admin";

@Component({
  selector: 'app-admin',
  imports: [RouterOutlet, HeaderAdmin],
  templateUrl: './admin.html',
  styleUrl: './admin.scss'
})
export class Admin {

}
