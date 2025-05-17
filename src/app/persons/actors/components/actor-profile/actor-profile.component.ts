import {Component, OnInit} from '@angular/core';
import {Actor} from "../../model/actor.entity";
import {ActivatedRoute} from "@angular/router";
import {ActorService} from "../../services/actor.service.service";

@Component({
  selector: 'app-actor-profile',
  imports: [],
  templateUrl: './actor-profile.component.html',
  styleUrl: './actor-profile.component.css'
})

export class ActorProfileComponent implements OnInit {
  actor: Actor | null = null;
  loading = true;
  error: string | null = null;

  constructor(
      private route: ActivatedRoute,
      private actorService: ActorService
  ) {}

  ngOnInit() {
    const actorId = this.route.snapshot.paramMap.get('id');
    if (actorId) {
      this.actorService.getActorsByIds([actorId]).subscribe({
        next: (actors) => {
          if (actors.length > 0) {
            this.actor = new Actor(actors[0]);
          } else {
            this.error = 'Actor no encontrado';
          }
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Error al cargar el actor';
          this.loading = false;
          console.error(err);
        }
      });
    } else {
      this.error = 'ID de actor inválido';
      this.loading = false;
    }
  }
}
