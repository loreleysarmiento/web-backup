import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../users/pages/login-form/services/auth.service';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatToolbar } from '@angular/material/toolbar';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
  standalone: true,
  imports: [
    MatIcon,
    MatButton,
    MatMenu,
    MatMenuTrigger,
    MatToolbar,
    RouterLink,
    MatIconButton,
    MatMenuItem,
    NgIf
  ]
})
export class ToolbarComponent implements OnInit {
  userProfileImage: string = 'assets/profile.png';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser && currentUser.images) {
      this.userProfileImage = currentUser.images;
    }
  }

  async logout() {
    this.authService.logout();
    await this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
