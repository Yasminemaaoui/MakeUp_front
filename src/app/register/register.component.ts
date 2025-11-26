import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { User } from '../model/user.model';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  public user = new User();
  confirmPassword?: string;
  myForm!: FormGroup;
  err: any;

  constructor(
    private formBuilder: FormBuilder, 
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  onRegister() {
    if (this.myForm.invalid) {
      this.markAllFieldsAsTouched();
      return;
    }

    // Vérifier que les mots de passe correspondent
    const password = this.myForm.get('password')?.value;
    const confirmPassword = this.myForm.get('confirmPassword')?.value;
    
    if (password !== confirmPassword) {
      this.err = "Les mots de passe ne correspondent pas";
      return;
    }

    // Préparer les données pour l'inscription
    const userData = {
      username: this.myForm.get('username')?.value,
      email: this.myForm.get('email')?.value,
      password: this.myForm.get('password')?.value
    };

    console.log('Tentative d\'inscription:', userData);

    this.authService.registerUser(userData).subscribe({
      next: (res: any) => {
        console.log('Inscription réussie:', res);
        alert("Inscription réussie ! Veuillez vous connecter.");
        this.router.navigate(['/login']);
      },
      error: (err: any) => {
        console.error('Erreur inscription détaillée:', err);
        
        if (err.status === 400) {
          this.err = err.error?.message || "Erreur lors de l'inscription";
        } else if (err.status === 0) {
          this.err = "Impossible de se connecter au serveur. Vérifiez que le serveur est démarré.";
        } else {
          this.err = "Erreur lors de l'inscription. Veuillez réessayer.";
        }
        
        // Afficher l'erreur pendant 5 secondes
        setTimeout(() => {
          this.err = null;
        }, 5000);
      }
    });
  }

  // Marquer tous les champs comme touchés pour afficher les erreurs
  private markAllFieldsAsTouched() {
    Object.keys(this.myForm.controls).forEach(key => {
      const control = this.myForm.get(key);
      control?.markAsTouched();
    });
  }

  // Méthode pour vérifier la validité d'un champ
  isFieldInvalid(fieldName: string): boolean {
    const field = this.myForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  // Méthode pour obtenir le message d'erreur d'un champ
  getFieldError(fieldName: string): string {
    const field = this.myForm.get(fieldName);
    
    if (!field || !field.errors) return '';
    
    if (field.errors['required']) {
      return 'Ce champ est obligatoire';
    }
    
    if (field.errors['email']) {
      return 'Email invalide';
    }
    
    if (field.errors['minlength']) {
      return `Minimum ${field.errors['minlength'].requiredLength} caractères requis`;
    }
    
    return '';
  }
}