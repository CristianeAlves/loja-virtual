import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-buttonDemo',
  imports: [ButtonModule],
  templateUrl: './buttonDemo.component.html',
  styleUrls: ['./buttonDemo.component.css']
})
export class ButtonDemoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
