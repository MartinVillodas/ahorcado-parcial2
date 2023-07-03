import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { IngresarPalabraComponent } from "./ingresar-palabra/ingresar-palabra.component";
import { FormsModule } from "@angular/forms";
import { AgregarPalabraComponent } from './agregar-palabra/agregar-palabra.component';


@NgModule({
    declarations: [
        IngresarPalabraComponent,
        AgregarPalabraComponent,
      ],
    imports: [
      FormsModule,
      CommonModule
    ],
    exports: [
      IngresarPalabraComponent,
      AgregarPalabraComponent,
    ]
  })
  export class ComponentsModule { }
