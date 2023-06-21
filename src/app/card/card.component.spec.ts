import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CardComponent } from './card.component';
import { Personaje } from '../interfaces/Personaje';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit borrarPersonajeClick event when borrarPersonaje is called', () => {
    const personaje: Personaje = {
      id: '1',
      name: 'Rick',
      status: 'Alive',
      species: 'Human',
      image: 'https://example.com/rick.jpg',
    };
    const borrarPersonajeSpy = spyOn(component.borrarPersonajeClick, 'emit');

    component.personaje = personaje;
    component.borrarPersonaje();

    expect(borrarPersonajeSpy).toHaveBeenCalledWith(personaje);
  });

  it('should emit editarPersonajeClick event when editarPersonaje is called', () => {
    const personaje: Personaje = {
      id: '1',
      name: 'Rick',
      status: 'Alive',
      species: 'Human',
      image: 'https://example.com/rick.jpg',
    };
    const editarPersonajeSpy = spyOn(component.editarPersonajeClick, 'emit');

    component.personaje = personaje;
    component.editarPersonaje();

    expect(editarPersonajeSpy).toHaveBeenCalledWith(personaje);
  });

  it('should render personaje data in the template', () => {
    const personaje: Personaje = {
      id: '1',
      name: 'Rick',
      status: 'Alive',
      species: 'Human',
      image: 'https://example.com/rick.jpg',
    };

    component.personaje = personaje;
    fixture.detectChanges();

    const cardElement = fixture.debugElement.query(By.css('.card'));
    const nameElement = cardElement.query(By.css('.card-name'));
    const statusElement = cardElement.query(By.css('.card-status'));
    const speciesElement = cardElement.query(By.css('.card-species'));

    expect(cardElement).toBeTruthy();
    expect(nameElement.nativeElement.textContent).toBe(personaje.name);
    expect(statusElement.nativeElement.textContent).toBe(personaje.status);
    expect(speciesElement.nativeElement.textContent).toBe(personaje.species);
  });
});
