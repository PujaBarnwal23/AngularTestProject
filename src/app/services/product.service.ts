import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  url: string = "assets/productList.json";
  constructor(private http: HttpClient) {}


  getAllProductData() {
   return  this.http.get(this.url);
  }

  getProductById(id: number) {

   return  this.http.get(this.url).pipe(
      map((products : any) => {
        return  products.filter((product: any) => product.id == id )[0]
      })
    );
  }

}
