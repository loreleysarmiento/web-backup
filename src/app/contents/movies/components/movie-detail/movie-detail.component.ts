import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActorCardComponent} from '../../../../persons/actors/components/actor-card/actor-card.component';
import {PlatformCardComponent} from '../../../platforms/components/platform-card/platform-card.component';
import {DirectorService} from '../../../../persons/directors/services/director.service.service';
import {ActorService} from '../../../../persons/actors/services/actor.service.service';
import {PlatformService} from '../../../platforms/services/platform.service.service';


@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [CommonModule, ActorCardComponent, PlatformCardComponent],
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  @Input() movie: any;
  director: any = null;
  actores: any[] = [];
  plataformas: any[] = [];

  constructor(
    private directorService: DirectorService,
    private actorService: ActorService,
    private platformService: PlatformService
  ) {}

  ngOnInit(): void {
    if (this.movie) {
      this.loadDirector(this.movie.director_id);
      this.loadActors(this.movie.actores_id);
      this.loadPlatforms(this.movie.plataformas_id);
    }
  }

  loadDirector(directorId: string): void {
    this.directorService.getDirectorById(directorId).subscribe(director => {
      this.director = director;
    });
  }

  loadActors(actorIds: string[]): void {
    if (actorIds && actorIds.length > 0) {
      this.actorService.getActorsByIds(actorIds).subscribe(actores => {
        this.actores = actores;
      });
    }
  }

  loadPlatforms(platformIds: string[]): void {
    if (platformIds && platformIds.length > 0) {
      this.platformService.getPlatformsByIds(platformIds).subscribe(plataformas => {
        this.plataformas = plataformas;
      });
    }
  }
}
