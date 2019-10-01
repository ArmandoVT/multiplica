import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ServicioService } from '../servicio.service';
import { Company } from '../../models/company.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  pagedItems: Company[];
  private allItems: Company[];
  pager: any = {};
  configUrl = 'assets/datos.json';

  constructor( private http: HttpClient, private servicio: ServicioService ) { }

  ngOnInit() {
    return this.http.get(this.configUrl).pipe(
      map( (response) => this.arreglo(response) )
    ).subscribe( (data: Company[]) => {
          this.allItems = data;
          this.setPage(1);
      });
  }

  private arreglo(resp: object) {
    const datos = [];
    Object.keys(resp).forEach(key => {
      const dato = resp[key];
      dato.id = resp[key];
      dato.url = resp[key].url;
      dato.name = resp[key].name;
      dato.user = resp[key].user;
      dato.date = resp[key].date;
      dato.users = resp[key].users;
      dato.publications = resp[key].publications;
      dato.credits = resp[key].credits;
      datos.push(dato);
    });
    return datos;
  }

  setPage(page: number) {
      if (page < 1 || page > this.pager.totalPages) {
          return;
      }
      this.pager = this.servicio.getPager(this.allItems.length, page);
      this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }
}
