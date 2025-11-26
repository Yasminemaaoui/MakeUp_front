import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProduitMakeUp } from '../model/produit.model';
import { ProduitService } from '../service/produit.service';
import { Marque } from '../model/marque.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-produit',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-produit.component.html',
  styleUrl: './add-produit.component.css'
})
export class AddProduitComponent implements OnInit {
  newMakeUp = new ProduitMakeUp();

  message!:string;
  marques! : Marque[];
newIdMrq! : number;
newMarque! : Marque;

  constructor(private produitService: ProduitService,private router :Router) { }

  ngOnInit() {
    //this.marques = this.produitService.listeMarque();
    this.produitService.listeMarque().
      subscribe(mrq => {this.marques = mrq._embedded.marques;
      console.log(mrq);
});

  }

  /*addProduitMakeUp(){
    //this.newMarque=this.produitService.consulterMarque(this.newIdMrq);
    this.newMakeUp.marque=this.newMarque;
    //console.log(this.newMakeUp);
    this.produitService.ajouterProduitMakeUp(this.newMakeUp);
    this.message="Produit "+this.newMakeUp.designation+" Ajouté avec succès !" ;
    this.router.navigate(['produits']);
}*/

addProduitMakeUp(){
      this.newMakeUp.marque = this.marques.find(cat => cat.id_marque == this.newIdMrq)!;
      this.produitService.ajouterProduitMakeUp(this.newMakeUp)
      .subscribe(prod => {
      console.log(prod);
      this.router.navigate(['produits']);
      });
}



}
