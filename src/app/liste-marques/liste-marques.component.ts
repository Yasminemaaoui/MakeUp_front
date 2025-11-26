import { Component } from '@angular/core';
import { Marque } from '../model/marque.model';
import { ProduitService } from '../service/produit.service';
import { CommonModule } from '@angular/common';
import { UpdateCategorieComponent } from '../update-categorie/update-categorie.component';

@Component({
  selector: 'app-liste-marques',
  standalone: true,
  imports: [CommonModule, UpdateCategorieComponent],
  templateUrl: './liste-marques.component.html',
  styles: ``
})
export class ListeMarquesComponent {
  marques!: Marque[];
  
  ajout:boolean=true;

  updatedCat: Marque = { "id_marque": null, "nom_marque": "", "pays_origine": "" };
  
  
  constructor(private produitService: ProduitService) { }

  
  ngOnInit(): void {
      this.chargerMarques();
  }


  chargerMarques() {
  this.produitService.listeMarque().subscribe({
    next: (wrapper) => {
      // Adaptez cette ligne selon la structure réelle de votre réponse API
      this.marques =wrapper._embedded.marques || wrapper._embedded?.marques || [];
      console.log('Marques chargées:', this.marques);
    },
    error: (err) => {
      console.error('Erreur chargement marques:', err);
    }
  });
}


  marqueUpdated(mrq: Marque) {
    console.log("marque recu de composant update marque", mrq);
    this.produitService.ajouterMarque(mrq).subscribe({
      next: () => this.chargerMarques(),
      error: (err) => console.error('Erreur lors de l\'ajout:', err)
    });
  }


updateCat(cat:Marque) {
this.updatedCat=cat;
this.ajout=false;
}

  

}
