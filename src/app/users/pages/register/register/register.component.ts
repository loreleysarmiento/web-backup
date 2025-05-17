import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { User } from '../../../model/user.entity';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [CommonModule, FormsModule, MatCardModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule]
})
export class RegisterComponent {
  protected name: string = '';
  protected username: string = '';
  protected email: string = '';
  protected password: string = '';
  protected confirmPassword: string = '';
  protected errorMessage: string = '';

  constructor(private userService: UserService, private router: Router) {}

  register() {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden';
      return;
    }

    // Dividir el nombre y apellido
    const nameParts = this.name.trim().split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(' ') || '';

    // Obtener todos los usuarios para calcular el nuevo ID
    this.userService.getAll().subscribe({
      next: (users) => {
        // Generar el próximo ID en formato US001, US002, etc.
        const userIds = users.map(user => user.id.replace("US", "")).map(Number);
        const nextId = Math.max(...userIds) + 1;
        const newUserId = `US${String(nextId).padStart(3, '0')}`;

        const newUser: User = {
          id: newUserId,
          firstName: firstName,
          lastName: lastName,
          userName: this.username,
          email: this.email,
          password: this.password,
          platforms: [],
          list: [],
          images: 'https://i.pinimg.com/236x/09/02/86/090286be7ffa5bc199ad0bb34af40d68.jpg'
        };

        // Crear el nuevo usuario
        this.userService.registerUser(newUser).subscribe({
          next: () => {
            this.router.navigate(['/login']);
          },
          error: (err) => {
            console.error(err);
            this.errorMessage = 'Error al registrar el usuario';
          }
        });
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Error al cargar los usuarios';
      }
    });
  }

  goBack() {
    this.router.navigate(['/login']);
  }
}
