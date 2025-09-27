import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';

@Component({
  selector: 'app-footer',
  imports: [ButtonModule, SplitButtonModule],
  templateUrl: './footer.html',
  styleUrl: './footer.scss'
})
export class Footer {


}
