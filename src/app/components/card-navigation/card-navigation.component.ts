import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-navigation',
  templateUrl: './card-navigation.component.html',
  styleUrls: ['./card-navigation.component.css']
})
export class CardNavigationComponent implements OnInit {

  @Input() titulo: string = 'No definido';
  @Input() ruta: string;
  @Input() icon: string = 'fas fa-times-circle fa-4x';
  @Input() estilo: string = 'salmon-outline';
  @Input() color: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
