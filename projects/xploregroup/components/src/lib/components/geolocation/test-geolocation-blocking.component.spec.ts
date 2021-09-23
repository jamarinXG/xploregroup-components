import { ChangeDetectionStrategy } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { ModalDismissReasons, NgbModal, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { LanguageService } from "@spartacus/core";
import { CmsComponentData } from "@spartacus/storefront";
import { TestGeolocationBlockingComponent } from "./test-geolocation-blocking";
import { StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { cases } from 'jasmine-parameterized';

export class MockNgbModalRef {
    result: Promise<any> = new Promise((resolve) => resolve('x'));
}

describe('GeolocationComponent', () => {

    let fixture: ComponentFixture<TestGeolocationBlockingComponent>;
    let component: TestGeolocationBlockingComponent;
    let modalService: NgbModal;
    let mockModalRef: MockNgbModalRef = new MockNgbModalRef();
    let languageService: LanguageService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
          declarations: [
            TestGeolocationBlockingComponent
          ],
          imports: [
            NgbModule,
            StoreModule.forRoot({}, {}),
          ],
          providers: [
            provideMockStore(),
            LanguageService,
            {
                provide: CmsComponentData
            }
          ]
        })
        .overrideComponent(TestGeolocationBlockingComponent, {
            set: { changeDetection: ChangeDetectionStrategy.Default }
        })
        .compileComponents();
      });

      beforeEach(() => {
        fixture = TestBed.createComponent(TestGeolocationBlockingComponent);
        component = fixture.debugElement.componentInstance;
        modalService = TestBed.get(NgbModal);
        languageService = fixture.debugElement.injector.get(LanguageService);
        fixture.detectChanges();
      });

    it('Should create GeolocationBlockingComponent', () => {
        expect(component).toBeDefined();
    });

    describe('Modal', () => {

        it('Should open modal on click', async(() => {
            spyOn(modalService, 'open').and.returnValue(mockModalRef as any);
            const btnModal = document.querySelector('.btn-open-modal') as HTMLButtonElement;
            btnModal.click();

            fixture.whenStable().then(() => {
                fixture.detectChanges();
                expect(modalService.open).toHaveBeenCalled();
            });
        }));

        it('Should close on click button', async(() => {
            spyOn(modalService, 'dismissAll');
            const btnModal = document.querySelector('.btn-open-modal') as HTMLButtonElement;
            btnModal.click();
            fixture.detectChanges();
            const btn = document.querySelector('.btn-close-modal') as HTMLButtonElement;
            btn.click();

            fixture.whenStable().then(() => {
                fixture.detectChanges();
                expect(modalService.dismissAll).toHaveBeenCalled();
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

    });

    describe('Dropdown selector', () => {

        it('Should call setLanguage() on select a dropdown option', async(() => {
            spyOn(component, 'setLanguage');
            fixture.detectChanges();
            const btnModal = document.querySelector('.btn-open-modal') as HTMLButtonElement;
            btnModal.click();

            fixture.whenStable().then(() => {
                fixture.detectChanges();
                const btn = document.querySelector('.button-dropdown') as HTMLButtonElement;
                btn.click();
                expect(component.setLanguage).toHaveBeenCalled();
            });
        }));

        cases([
            'en',
            'ja'
        ]).it('Should update country selected on call setLanguage()', (lang) => {
            const mySpy = spyOn(languageService , 'setActive');
            component.setLanguage(lang);
            fixture.detectChanges();

            expect(mySpy).toHaveBeenCalledTimes(1);
            expect(mySpy).toHaveBeenCalledWith(lang);
        });

    });
    
});