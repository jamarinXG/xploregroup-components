import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { CmsComponentData } from '@spartacus/storefront';
import { TestRegisterGeolocationTopModel } from './test-register-geolocation-top.model';

@Component({
  selector: 'app-register-geolocation-top',
  templateUrl: './test-register-geolocation-top.component.html',
  animations: [
    trigger('hideMsg', [
      state('hide', style({
        opacity: 0
    })),
    state('show', style({
        opacity: 1
    })),
      transition('* => *', animate(300))
  ]),
]
})
export class TestRegisterGeolocationTopComponent {

  hide = false;

  constructor(
    public component: CmsComponentData<TestRegisterGeolocationTopModel>
  ) { }

  get stateName() {
    return this.hide ? 'hide' : 'show';
  }

  closeMsg() {
    this.hide = !this.hide;
  }

  changeLocation(country: string | undefined) {
    this.closeMsg();
    alert('Se ha cambiado su localización a ' + country);
  }
}
