// src/app/users/components/user-profile/user-profile.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../pages/login-form/services/auth.service';
import { ReviewService } from '../../../reviews/services/review.service';
import { User } from '../../model/user.entity';
import { Review } from '../../../reviews/model/review.entity';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIcon } from '@angular/material/icon';
import { UserReviewCardComponent } from '../../../reviews/components/user-review-card/user-review-card.component';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIcon,
    NgIf,
    NgFor,
    UserReviewCardComponent
  ]
})
export class UserProfileComponent implements OnInit {
  protected userData: User | null = null;
  protected loading: boolean = true;
  protected userReviews: Review[] = [];

  constructor(private userService: UserService, private reviewService: ReviewService, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadUser();
  }

  private loadUser() {
    this.userData = this.authService.getCurrentUser();
    if (this.userData) {
      this.loadUserReviews(this.userData.id);
    } else {
      console.warn("No hay usuario autenticado");
      this.loading = false;
    }
  }

  private loadUserReviews(userId: string) {
    this.reviewService.getReviewsByUserId(userId).subscribe({
      next: (reviews) => {
        this.userReviews = reviews;
        console.log("Reseñas cargadas:", this.userReviews);
        this.loading = false;
      },
      error: (err) => {
        console.error("Error al cargar reseñas:", err);
        this.loading = false;
      }
    });
  }

  logout() {
    this.authService.logout();
    this.userData = null;
    this.userReviews = [];
  }
}
