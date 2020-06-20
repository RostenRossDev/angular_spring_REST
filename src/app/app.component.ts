import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Bienvenido a Angular';

  cursi: string ='Curso Spring 5 con Angular 7'
  profesor: string= 'Andrés Gúzman'
}
