import { Component } from '@angular/core';
import { ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { LanguageService } from '@spartacus/core';
import { CmsComponentData } from '@spartacus/storefront';
import { TestGeolocationBlockingModel } from './test-geolocation-blocking.model';

@Component({
  selector: 'app-geolocation-blocking',
  templateUrl: './test-geolocation-blocking.component.html'
})

export class TestGeolocationBlockingComponent {

  closeResult = '';
  countryList: Array<{code: string, text: string}> = [{code: "ja", text: "Japonés"}, {code: "en", text: "Inglés"}, {code: "de", text: "Holandés"}, {code: "zh", text: "Chino"}];
  countrySelected:string = '';
  language: boolean = false;

  constructor(
    public component: CmsComponentData<TestGeolocationBlockingModel>,
    private modalService: NgbModal,
    public languageService: LanguageService) {}

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

  setLanguage(country: string) {
    this.countrySelected = country;
    this.languageService.setActive(country);
    this.modalService.dismissAll();
  }

}

