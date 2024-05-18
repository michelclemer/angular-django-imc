import { Component } from '@angular/core';
import {ImcComponent} from "../imc/imc.component";
import {HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ImcComponent, HttpClientModule],
  template: `
  <section class="results">
    <form-imc></form-imc>
  </section>
  `,
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
