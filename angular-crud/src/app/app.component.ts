import { Component } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']  // Corrigido: `styleUrls` em vez de `styleUrl`
})
export class AppComponent {
  title = 'homes';
}
