import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import {map, filter} from 'rxjs/operators';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent  implements OnInit{

  productId !: number;
  public productData : any;

  constructor(private route: ActivatedRoute, private productService: ProductService) {
    
  }

  ngOnInit(): void {
    this.productId = this.route.snapshot.params['id'];
    
    this.productService.getProductById(this.productId).subscribe((data:any) => {
        this.productData = data;
    })
    
  }

}
