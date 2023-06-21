import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environment/environment';
import { HttpClient } from '@angular/common/http';
import { Personaje } from 'src/app/interfaces/Personaje';
import { CardComponent } from '../../card/card.component';
import { v4 as uuidv4 } from 'uuid';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent implements OnInit {
  imagenesGenericas = [
    {
      url: 'https://rickandmortyapi.com/api/character/avatar/20.jpeg',
      nombre: 'Imagen 1',
    },
    {
      url: 'https://rickandmortyapi.com/api/character/avatar/21.jpeg',
      nombre: 'Imagen 2',
    },
    {
      url: 'https://rickandmortyapi.com/api/character/avatar/22.jpeg',
      nombre: 'Imagen 3',
    },
    // Agrega más objetos de imágenes genéricas si es necesario
  ];

  personajes: Personaje[] = [];
  personajesCopy: Personaje[] = [];
  nombrePersonaje!: string;
  personajeNoEncontrado: any;
  cardComponent!: CardComponent;
  mostrarFormulario = false;

  nuevoPersonaje: Personaje = {
    id: '',
    name: '',
    status: '',
    species: '',
    image: '',
  };

  constructor(public http: HttpClient) {}

  ngOnInit() {
    this.getData();
  }

  async getData() {
    await this.http
      .get<any>(environment.apiUrl + 'characters')
      .subscribe((res) => {
        this.personajes = res.map((r: any) => {
          return {
            id: r.id,
            name: r.name,
            status: r.status,
            species: r.species,
            image: r.image,
          };
        });

        this.personajesCopy = this.personajes;
      });
  }

  buscarPersonaje() {
    if (this.nombrePersonaje) {
      this.personajes = this.personajes?.filter((personaje) =>
        personaje.name
          .toLowerCase()
          .includes(this.nombrePersonaje.toLowerCase())
      );

      if (this.personajes.length === 0) {
        this.personajeNoEncontrado = true;
      }
    } else {
      // Si no se encuentra el personaje, te muestra un error
      this.personajeNoEncontrado = true;
      this.personajes = [];
    }
  }

  abrirFormulario() {
    this.mostrarFormulario = true;
    console.log(this.mostrarFormulario);
  }

  agregarPersonaje() {
    if (this.nuevoPersonaje.id) {
      const personajeEditado: Personaje = {
        id: this.nuevoPersonaje.id,
        name: this.nuevoPersonaje.name,
        status: this.nuevoPersonaje.status,
        species: this.nuevoPersonaje.species,
        image: this.nuevoPersonaje.image,
      };

      // Realiza acciones para editar el personaje en la base de datos
      this.http
        .put<any>(
          environment.apiUrl + 'characters/' + personajeEditado.id,
          personajeEditado
        )
        .subscribe((res) => {
          // Lógica adicional después de editar el personaje
          console.log('Personaje editado:', res);
          // Por ejemplo, puedes actualizar la lista de personajes
          this.getData();
        });
    } else {
      // Generar un ID único para el nuevo personaje
      const nuevoId = uuidv4(); // Genera el ID según tus necesidades

      // Asignar el ID al nuevo personaje
      this.nuevoPersonaje.id = nuevoId;

      // Enviar el nuevo personaje a la base de datos
      this.http
        .post<any>(environment.apiUrl + 'characters', this.nuevoPersonaje)
        .subscribe(
          (res) => {},
          (error) => {
            console.error('Error al agregar el personaje:', error);
          }
        );

      // Limpiar los campos del formulario
      this.nuevoPersonaje = {
        id: '',
        name: '',
        status: '',
        species: '',
        image: '',
      };
    }
    this.mostrarFormulario = false;

    // Actualiza la lista de personajes después de agreagar
    this.refreshPage();
  }

  editarPersonaje(personaje: Personaje) {
    this.nuevoPersonaje = {
      id: personaje.id,
      name: personaje.name,
      status: personaje.status,
      species: personaje.species,
      image: personaje.image,
    };
    this.mostrarFormulario = true;
  }

  deletePersonaje(personaje: any) {
    this.http
      .delete<any>(environment.apiUrl + 'characters/' + personaje.id)
      .subscribe(
        () => {
          // El personaje se eliminó exitosamente en la base de datos
          console.log('Personaje eliminado:', personaje.name);

          // Actualiza la lista de personajes después de eliminar
          this.getData();
        },
        (error) => {
          // Manejo de errores en caso de que ocurra un problema al eliminar el personaje
          console.error('Error al eliminar el personaje:', error);
        }
      );
  }

  refreshPage() {
    window.location.reload();
    this.personajeNoEncontrado = null;
  }
}
