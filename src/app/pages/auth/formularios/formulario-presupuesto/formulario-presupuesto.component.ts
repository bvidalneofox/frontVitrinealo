import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-formulario-presupuesto',
  templateUrl: './formulario-presupuesto.component.html',
  styleUrls: ['./formulario-presupuesto.component.css']
})
export class FormularioPresupuestoComponent implements OnInit {

  public form_item: FormGroup;
  data=[];
  tabla={};
  detalle=false;
  constructor(config: NgbModalConfig, 
              private modal:NgbModal,
              private fb: FormBuilder,
              ) { 
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.construccion_form();
    localStorage.removeItem('items')
    // this.data = localStorage.getItem('items');
  }

  construccion_form(){
    this.form_item = this.fb.group({
      tipo_presupuesto:[''],
      item:[''],
      unidad:[''],
      ml:[''],
      m2:[''],
      m3:[''],
      m_total:[''],
      cantidad:[''],
      valor_unitario:[''],
      total:[''],
    });
  }

  open_modal(ref){
    this.modal.open(ref, { size: 'lg' });
  }

  insert_item(){
    // console.log("kk");
     const data = this.form_item.value;
   
    this.data.push(data);
    console.log(this.data);
    // localStorage.setItem('items', JSON.stringify(this.data));
    // this.tabla = localStorage.getItem('items');
   

  }
  delete_item(indice){
    console.log(indice);
    this.data.splice(indice, 1);
  }

}
