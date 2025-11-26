import { Component, OnInit } from '@angular/core';
import { ProduitMakeUp } from '../model/produit.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Marque } from '../model/marque.model';
import { ProduitService } from '../service/produit.service';

@Component({
  selector: 'app-recherche-par-marque',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './recherche-par-marque.component.html',
  styles: ``
})
export class RechercheParMarqueComponent implements OnInit {
   produits: ProduitMakeUp[] = [];
   IdMarque!: number;
   marques: Marque[] = [];
   newIdMrq!: number;

    constructor(private produitService: ProduitService) { }

   ngOnInit(): void {
      this.produitService.listeMarque()
        .subscribe({
          next: (cats) => {
            // Débogage pour voir la structure de la réponse
            console.log('Réponse complète:', cats);
            
            // Essayez différentes structures possibles
            if (cats && cats._embedded && cats._embedded.marques) {
              this.marques = cats._embedded.marques;
            } else if (Array.isArray(cats)) {
              // Si la réponse est directement un tableau
              this.marques = cats;
            } else {
              console.error('Structure de réponse inattendue:', cats);
              this.marques = [];
            }
            console.log('Marques chargées:', this.marques);
          },
          error: (err) => {
            console.error('Erreur lors du chargement des marques:', err);
            this.marques = [];
          }
        });
    }

onChange() {
  console.log('ID Marque sélectionnée:', this.newIdMrq); // Debug
  
  if (this.newIdMrq) {
    this.produitService.rechercherParCategorie(this.newIdMrq)
      .subscribe({
        next: (prods) => {
          console.log('Produits trouvés:', prods); // Debug
          this.produits = prods || [];
        },
        error: (err) => {
          console.error('Erreur recherche par marque:', err);
          this.produits = [];
        }
      });
  } else {
    this.produits = [];
  }
}
}