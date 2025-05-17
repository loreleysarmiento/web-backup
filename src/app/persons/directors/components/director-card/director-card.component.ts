import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-director-card',
  templateUrl: './director-card.component.html',
  styleUrl: './director-card.component.css'
})
export class DirectorCardComponent {
  @Input() nombre: string = '';
  @Input() imagen: string = '';
}
