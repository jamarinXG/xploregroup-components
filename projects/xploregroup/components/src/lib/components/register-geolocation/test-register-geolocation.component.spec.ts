import { ChangeDetectionStrategy } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalDismissReasons, NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CmsComponentData } from '@spartacus/storefront';
import { TestRegisterGeolocationComponent } from './test-register-geolocation.component';

export class MockNgbModalRef {
  result: Promise<any> = new Promise((resolve) => resolve('x'));
}

describe('RegisterGeolocationComponent', () => {


  let fixture: ComponentFixture<TestRegisterGeolocationComponent>;
  let component: TestRegisterGeolocationComponent;
  let modalService: NgbModal;
  let mockModalRef: MockNgbModalRef = new MockNgbModalRef();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        TestRegisterGeolocationComponent 
      ],
      imports: [
        NgbModule
      ],
      providers: [
        CmsComponentData
      ]
    })
    .overrideComponent(TestRegisterGeolocationComponent, {
      set: { changeDetection: ChangeDetectionStrategy.Default }
  })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestRegisterGeolocationComponent);
    component = fixture.debugElement.componentInstance;
    modalService = TestBed.get(NgbModal);
    fixture.detectChanges();
  });

  it('Should create RegisterGeolocationComponent', () => {
    expect(component).toBeTruthy();
  });

  it('Should open modal on click', async(() => {
    spyOn(modalService, 'open').and.returnValue(mockModalRef as any);
    const btnModal = document.querySelector('.btn-open-modal') as HTMLButtonElement;
    btnModal.click();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(modalService.open).toHaveBeenCalled();
    });
  }));

  it('Should update closeResult when modal closed', async(() => {
    spyOn(modalService, 'open').and.returnValue(mockModalRef as any);
    mockModalRef.result = new Promise((resolve, reject) => resolve('x'));
    component.openModal('modal');
    fixture.detectChanges();

    fixture.whenStable().then(() => {
        expect(component.closeResult).toBe('Closed with: x');
    });
  }));

  it('Should update closeResult when modal dismissed by pressing ESC', async(() => {
    spyOn(modalService, 'open').and.returnValue(mockModalRef as any);
    mockModalRef.result = new Promise((resolve, reject) => reject(ModalDismissReasons.ESC));
    component.openModal('modal');
    fixture.detectChanges();

    fixture.whenStable().then(() => {
        expect(component.closeResult).toBe('Dismissed by pressing ESC');
    });
  }));

  it('Should update closeResult when modal dismissed by clicking on backdrop', async(() => {
      spyOn(modalService, 'open').and.returnValue(mockModalRef as any);
      mockModalRef.result = new Promise((resolve, reject) => reject(ModalDismissReasons.BACKDROP_CLICK));
      component.openModal('modal');
      fixture.detectChanges();

      fixture.whenStable().then(() => {
          expect(component.closeResult).toBe('Dismissed by clicking on backdrop');
      });
  }));

  it('Should call method changeLocation()', async(() => {
    spyOn(component, 'changeLocation');
    fixture.detectChanges();
    const btnModal = document.querySelector('.btn-open-modal') as HTMLButtonElement;
    btnModal.click();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const btn = document.querySelector('.btn-change-location') as HTMLButtonElement;
      btn.click();
      expect(component.changeLocation).toHaveBeenCalled();
    });
  })); 

});
