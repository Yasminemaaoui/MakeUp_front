import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Marque } from '../model/marque.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-categorie',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update-categorie.component.html',
  styles: ``
})
export class UpdateCategorieComponent implements OnInit{
  @Input()
marque! : Marque;

@Input()
ajout!:boolean;


  @Output() 
marqueUpdated = new EventEmitter<Marque>(); // Permet au composant enfant d'envoyer un objet Marque au composant parent



ngOnInit(): void {
console.log("ngOnInit du composant UpdateMarque ",this.marque);
}

saveMarque(){// Envoie la marque modifiée au composant parent
  this.marqueUpdated.emit(this.marque);

}
}
