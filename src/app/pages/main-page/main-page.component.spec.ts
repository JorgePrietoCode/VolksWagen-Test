import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MainPageComponent } from './main-page.component';

describe('MainPageComponent', () => {
  let component: MainPageComponent;
  let fixture: ComponentFixture<MainPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainPageComponent],
      imports: [HttpClientTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter personajes by name when buscarPersonaje is called with a non-empty name', () => {
    // Arrange
    const personaje1 = { id: '1', name: 'Rick', status: 'Alive', species: 'Human', image: '' };
    const personaje2 = { id: '2', name: 'Morty', status: 'Alive', species: 'Human', image: '' };
    const personajes = [personaje1, personaje2];
    component.personajes = personajes;

    // Act
    component.nombrePersonaje = 'Rick';
    component.buscarPersonaje();

    // Assert
    expect(component.personajes).toEqual([personaje1]);
  });

  it('should display "No se encontró ningún personaje" message when buscarPersonaje is called with an empty name', () => {
    // Arrange
    component.personajes = [{ id: '1', name: 'Rick', status: 'Alive', species: 'Human', image: '' }];

    // Act
    component.nombrePersonaje = '';
    component.buscarPersonaje();

    // Assert
    expect(component.personajes).toEqual([]);
    expect(component.personajeNoEncontrado).toBeTruthy();
  });

  it('should open the formulario when abrirFormulario is called', () => {
    // Act
    component.abrirFormulario();

    // Assert
    expect(component.mostrarFormulario).toBeTruthy();
  });

  it('should add a new personaje when agregarPersonaje is called with a valid personaje', () => {
    // Arrange
    component.nuevoPersonaje = {
      id: '1',
      name: 'Rick',
      status: 'Alive',
      species: 'Human',
      image: '',
    };

    // Act
    component.agregarPersonaje();

    // Assert
    expect(component.mostrarFormulario).toBeFalsy();
    // Additional assertions based on the desired behavior
  });

  it('should edit a personaje when agregarPersonaje is called with an existing personaje', () => {
    // Arrange
    const personaje = {
      id: '1',
      name: 'Rick',
      status: 'Alive',
      species: 'Human',
      image: '',
    };
    component.nuevoPersonaje = { ...personaje };

    // Act
    component.agregarPersonaje();

    // Assert
    expect(component.mostrarFormulario).toBeFalsy();
    // Additional assertions based on the desired behavior
  });

  it('should set nuevoPersonaje properties when editarPersonaje is called', () => {
    // Arrange
    const personaje = { id: '1', name: 'Rick', status: 'Alive', species: 'Human', image: '' };

    // Act
    component.editarPersonaje(personaje);

    // Assert
    expect(component.nuevoPersonaje.id).toEqual(personaje.id);
    expect(component.nuevoPersonaje.name).toEqual(personaje.name);
    expect(component.nuevoPersonaje.status).toEqual(personaje.status);
    expect(component.nuevoPersonaje.species).toEqual(personaje.species);
    expect(component.nuevoPersonaje.image).toEqual(personaje.image);
    expect(component.mostrarFormulario).toBeTruthy();
  });

  it('should delete a personaje and call getData when deletePersonaje is called', () => {
    // Arrange
    spyOn(component, 'getData');
    const personaje = { id: '1', name: 'Rick', status: 'Alive', species: 'Human', image: '' };
    component.personajes = [personaje];

    // Act
    component.deletePersonaje(personaje);

    // Assert
    expect(component.getData).toHaveBeenCalled();
    expect(component.personajes.length).toEqual(0);
    // Additional assertions based on the desired behavior
  });

  it('should reload the page and reset personajeNoEncontrado when refreshPage is called', () => {
    // Arrange
    spyOn(window.location, 'reload');
    component.personajeNoEncontrado = true;

    // Act
    component.refreshPage();

    // Assert
    expect(window.location.reload).toHaveBeenCalled();
    expect(component.personajeNoEncontrado).toBeNull();
  });
});
