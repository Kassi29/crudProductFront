import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Product} from "../../model/product";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'product-form',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {

  @Input() product: Product = {
    id: 0,
    name: "",
    description: "",
    price: 500
  };

  protected readonly onsubmit = onsubmit;


  @Output() newProductEvent = new EventEmitter();
  onSubmit(): void{
    this.newProductEvent.emit(this.product);
    console.log(this.product)
  }

}
