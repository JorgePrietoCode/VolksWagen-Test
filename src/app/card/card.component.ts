import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Personaje } from '../interfaces/Personaje';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {

@Input() personaje!: Personaje;
@Output() borrarPersonajeClick: EventEmitter<any> = new EventEmitter<any>();
@Output() editarPersonajeClick: EventEmitter<Personaje> = new EventEmitter<Personaje>();

borrarPersonaje() {
  this.borrarPersonajeClick.emit(this.personaje);
}

editarPersonaje() {
  if (this.personaje) {
    // Emitir el evento con el ID del personaje
    this.editarPersonajeClick.emit(this.personaje);
  }
}






}
