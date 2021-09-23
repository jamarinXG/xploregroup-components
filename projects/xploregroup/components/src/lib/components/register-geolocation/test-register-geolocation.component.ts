import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CmsComponentData } from '@spartacus/storefront';
import { TestRegisterGeolocationModel } from './test-register-geolocation.model';

@Component({
  selector: 'app-register-geolocation',
  templateUrl: './test-register-geolocation.component.html'
})
export class TestRegisterGeolocationComponent {

  closeResult = '';

  constructor(
    public component: CmsComponentData<TestRegisterGeolocationModel>,
    private modalService: NgbModal
  ) { }

  openModal(content: any) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
       this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  dismiss(reason?: any) {
    this.modalService.dismissAll(reason);
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  changeLocation(country: string | undefined) {
    this.modalService.dismissAll();
    alert('Se ha cambiado su localización a ' + country);
  }

}
