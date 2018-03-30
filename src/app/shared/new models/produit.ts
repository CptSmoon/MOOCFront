

export class Produit {
  public produit_id: number;
  public label: string;
  public reference: string;
  public codeABarre: string;
  public seuil: number;
  public quantite_disponible: number;
  public quantite_physique: number;
  public prix: number;


  public editMode : number = 0;

  public created_at: Date;
  public deleted_at: Date;
  public updated_at: Date;

  public position: number = 0;
}
