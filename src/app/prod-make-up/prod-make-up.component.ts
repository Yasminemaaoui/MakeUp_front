import { Component, OnInit } from '@angular/core';
import { ProduitMakeUp } from '../model/produit.model';
import { CommonModule } from '@angular/common';
import { ProduitService } from '../service/produit.service';
import { RouterLink } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-prod-make-up',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './prod-make-up.component.html',
  styleUrl: './prod-make-up.component.css'
})
export class ProdMakeUpComponent implements OnInit{
  produits!: ProduitMakeUp []; //un tableau 


  constructor(private produitService: ProduitService ,public authService: AuthService) {
    //this.produits = produitService.listeProduits();
  }
  ngOnInit(): void {
    this.chargerProduits();

  }

  chargerProduits(){
      this.produitService.listeProduit().subscribe(prods => {
          console.log(prods);
          this.produits = prods;
      });
}


 /* supprimerProduit(m: ProduitMakeUp)
  {
  //console.log(p);
    let conf = confirm("Etes-vous sûr ?");
    if (conf)
    this.produitService.supprimerProduit(m);
  }*/

  supprimerProduit(p: ProduitMakeUp)
{
    let conf = confirm("Etes-vous sûr ?");
    if (conf)
    this.produitService.supprimerProduit(p.code_produit).subscribe(() => {
    console.log("produit supprimé");
    this.chargerProduits();
    });
    } 
  

}


