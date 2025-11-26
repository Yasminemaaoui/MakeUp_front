import { Component, OnInit } from '@angular/core';
import { ProduitMakeUp } from '../model/produit.model';
import { ProduitService } from '../service/produit.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-recherche-par-nom',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './recherche-par-nom.component.html',
  styles: ``
})
export class RechercheParNomComponent implements OnInit {

  nomProduit!: string;
  produits!: ProduitMakeUp[];
  constructor(private produitService: ProduitService) { }

  ngOnInit(): void {
    this.produitService.listeProduit().subscribe(prods => {
      console.log(prods);
      this.produits = prods;
    });
  }
  rechercherProds() {
    this.produitService.rechercherParNom(this.nomProduit).
      subscribe(prods => {
        console.log(prods);
        this.produits = prods;
      });
  }


}
