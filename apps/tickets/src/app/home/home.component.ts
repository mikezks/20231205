import { loadRemoteModule } from '@angular-architects/module-federation';
import { Component, ViewContainerRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  vc = inject(ViewContainerRef);

  constructor() {
    setTimeout(() => this.load(), 5_000);
  }

  load(): void {
    loadRemoteModule(
      'checkin',
      './Component'
    ).then(esm => {
      const checkinCmp = esm.default;
      const compRef = this.vc.createComponent(checkinCmp);
      const comp = compRef.instance as any;
      console.log(comp.title);
      comp.title = 'new info';
      console.log(comp.title);
    })
  }
}
