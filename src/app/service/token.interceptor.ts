import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {

    const authService = inject(AuthService);
    const toExclude = ["/login", "/register"]; // ← AJOUTER "/register" ici
    
    // Vérifier si l'URL contient un des endpoints à exclure
    let excluded = false;
    toExclude.forEach(pattern => {
      if (req.url.includes(pattern)) {
        excluded = true;
      }
    });
    
    // Si ce n'est pas une URL exclue, ajouter le token
    if (!excluded) {
      let jwt = authService.getToken();
      let reqWithToken = req.clone({
        setHeaders: { Authorization: "Bearer " + jwt }
      })
      return next(reqWithToken);
    }
    
    // Pour les URLs exclues, passer la requête sans modification
    return next(req);
}