import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: []
})
export class MenuComponent{
  public toggle = true;
  constructor() { }

  clickEvent(){
    this.toggle = !this.toggle;
 }
}