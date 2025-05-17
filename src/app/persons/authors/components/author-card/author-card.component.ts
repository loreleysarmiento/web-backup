import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-author-card',
  standalone: true,
  templateUrl: './author-card.component.html',
  styleUrls: ['./author-card.component.css']
})
export class AuthorCardComponent {
  @Input() nombre: string = '';
  @Input() imagen: string = '';
}
