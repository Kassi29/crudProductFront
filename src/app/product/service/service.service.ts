import { Injectable } from '@angular/core';
import {Product} from "../model/product";
import {map, Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private products: Product[] = [
    {
      id:1,
      name:"Hola",
      description:"description",
      price:111
    },
    {
      id:2,
      name:"producto2",
      description:"description",
      price:111
    },
    {
      id:3,
      name:"producto3",
      description:"description",
      price:111
    },
    {
      id:4,
      name:"producto4",
      description:"description",
      price:444
    }
  ]

 // constructor() { }


  private url: string= 'http://localhost:8080/api/';
  constructor(private http: HttpClient) {
  }

  findAll(): Observable<Product[]>{
    //return of(this.products);
    return this.http.get<Product[]>(this.url);

  }

  create(product: Product): Observable<Product>{
    return this.http.post<Product>(this.url, product)
  }

  update(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.url}edit/${product.id}`,product);
  }

  remove(id: number): Observable<void>{
    return this.http.delete<void>(`${this.url}eliminar/${id}`)
  }


}
