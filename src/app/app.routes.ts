import { Routes } from '@angular/router';
import { ProdMakeUpComponent } from './prod-make-up/prod-make-up.component';
import { AddProduitComponent } from './add-produit/add-produit.component';
import { UpdateProduitMakeUpComponent } from './update-produit-make-up/update-produit-make-up.component';
import { RechercheParMarqueComponent } from './recherche-par-marque/recherche-par-marque.component';
import { RechercheParNomComponent } from './recherche-par-nom/recherche-par-nom.component';
import { ListeMarquesComponent } from './liste-marques/liste-marques.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { produitMakeUpGuard } from './produit-make-up.guard';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
  { path: 'produits', component: ProdMakeUpComponent },
  {path: "add-produit", component : AddProduitComponent,canActivate:[produitMakeUpGuard]},
  {path: "", redirectTo: "produits", pathMatch: "full"},
  {path: "updateProduit/:id", component: UpdateProduitMakeUpComponent},
  {path: "rechercheParMarque", component : RechercheParMarqueComponent},
  {path: "rechercheParNom", component : RechercheParNomComponent},
  {path: "listeMarques", component : ListeMarquesComponent},
  {path: 'login', component: LoginComponent},
  {path: 'app-forbidden', component: ForbiddenComponent},
  {path:'register',component:RegisterComponent},






];
