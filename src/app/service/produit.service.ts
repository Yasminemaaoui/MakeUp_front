import { Injectable } from '@angular/core';
import { ProduitMakeUp } from '../model/produit.model';
import { Marque } from '../model/marque.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MarqueWrapper } from '../model/MarqueWrapped.model';

const httpOptions = {
  headers: new HttpHeaders( {'Content-Type': 'application/json'} )
};

@Injectable({
  providedIn: 'root'
})
export class ProduitService {
  
  apiURL: string = 'http://localhost:8080/prodMakeUp/api';
  apiURLMarque: string = 'http://localhost:8080/prodMakeUp/Marque';

  constructor(private http: HttpClient) { }

  // === PRODUITS ===
  listeProduit(): Observable<ProduitMakeUp[]> {
    return this.http.get<ProduitMakeUp[]>(this.apiURL + "/all");
  }

  ajouterProduitMakeUp(prod: ProduitMakeUp): Observable<ProduitMakeUp> {
    return this.http.post<ProduitMakeUp>(this.apiURL + "/addprod", prod, httpOptions);
  }

  supprimerProduit(id: number): Observable<any> {
    const url = `${this.apiURL}/delprod/${id}`;
    return this.http.delete(url);
  }

  consulterProduit(id: number): Observable<ProduitMakeUp> {
    const url = `${this.apiURL}/getbyid/${id}`;
    return this.http.get<ProduitMakeUp>(url);
  }

  updateProduit(prod: ProduitMakeUp): Observable<ProduitMakeUp> {
    return this.http.put<ProduitMakeUp>(this.apiURL + "/updateprod", prod, httpOptions);
  }

  // === RECHERCHE ===
  rechercherParCategorie(idCat: number): Observable<ProduitMakeUp[]> {
    const url = `${this.apiURL}/prodscat/${idCat}`;
    return this.http.get<ProduitMakeUp[]>(url);
  }

  rechercherParNom(nom: string): Observable<ProduitMakeUp[]> {
    const url = `${this.apiURL}/prodsByName/${nom}`;
    return this.http.get<ProduitMakeUp[]>(url);
  }

  // === MARQUES ===
  listeMarque(): Observable<MarqueWrapper> {
    return this.http.get<MarqueWrapper>(this.apiURLMarque);
  }

  ajouterMarque(mrq: Marque): Observable<Marque> {
    return this.http.post<Marque>(this.apiURLMarque, mrq, httpOptions);
  }

  updateMarque(mrq: Marque): Observable<Marque> {
    const url = `${this.apiURLMarque}/${mrq.id_marque}`;
    return this.http.put<Marque>(url, mrq, httpOptions);
  }
}