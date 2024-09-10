import {Component, OnInit} from '@angular/core';
import {ServiceService} from "../../service/service.service";
import {Product} from "../../model/product";
import {FormComponent} from "../form/form.component";

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [FormComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {


  constructor(private service: ServiceService) {

  }

  products: Product[] = [];


  //se crea solo cuando se unializa por primera vez
  ngOnInit(): void {
    this.service.findAll().subscribe(products => {
      this.products = products;
    })
  }

  addProduct(product: Product) {
    if (product.id && product.id > 0) {
      // Actualiza el producto existente
      this.service.update(product).subscribe(updateProduct => {
        this.products = this.products.map(prod => {
          if (prod.id === product.id) {
            return {...updateProduct};
          }
          return prod;
        });
      })
      /*
      this.products = this.products.map(prod => {
        if (prod.id === product.id) {
          return {...product};
        }
        return prod;
      });

       */
    } else {
      // Añade un nuevo producto
      this.service.create(product).subscribe(newproduct => {
        this.products = [...this.products, {...newproduct}];
      })
      //    product.id = new Date().getTime(); // Genera un nuevo ID
      //    this.products.push(product);
    }
    this.productSelected = new Product();
  }

  productSelected: Product = new Product();

  UpdateProduct(productRow: Product) {
    this.productSelected = productRow;
  }

  DeleteProduct(id: number) {

    this.service.remove(id).subscribe(() =>
        this.products = this.products.filter(prod =>
              prod.id != id
    )
  //  this.products = this.products.filter(prod =>
  //    prod.id != id
    )

  }


}
