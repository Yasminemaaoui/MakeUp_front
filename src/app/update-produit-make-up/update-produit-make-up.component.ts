import { Component, OnInit } from '@angular/core';
import { ProduitMakeUp } from '../model/produit.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProduitService } from '../service/produit.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Marque } from '../model/marque.model';


@Component({
  selector: 'app-update-produit-make-up',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './update-produit-make-up.component.html',
  styles: ``
})
export class UpdateProduitMakeUpComponent implements OnInit {

  marques!: Marque[];
  updatedMrqId!: number;


  currentProduit = new ProduitMakeUp();
  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private produitService: ProduitService
  ) { }

ngOnInit() {
  this.produitService.listeMarque().subscribe(cats => {
    this.marques = cats._embedded.marques;
    console.log(cats);
    
    this.produitService.consulterProduit(this.activatedRoute.snapshot.params['id'])
      .subscribe(prod => {
        this.currentProduit = prod;
        // Utiliser ?? pour fournir une valeur par défaut si null
        this.updatedMrqId = this.currentProduit.marque.id_marque ?? 0;
      });
  });
}

  /*updateProduit() { //console.log(this.currentProduit);
   // this.currentProduit.marque=this.produitService.consulterMarque(this.updatedMrqId);
    this.produitService.updateProduit(this.currentProduit);
    this.router.navigate(['produits']);
  }*/

  updateProduit() {
    this.currentProduit.marque = this.marques.
      find(cat => cat.id_marque == this.updatedMrqId)!;
    this.produitService.updateProduit(this.currentProduit).subscribe(prod => {
      this.router.navigate(['produits']);
    }
    );
  }



}
