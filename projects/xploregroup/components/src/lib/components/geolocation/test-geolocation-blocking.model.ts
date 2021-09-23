import { CmsComponent } from "@spartacus/core";

export interface TestGeolocationBlockingModel extends CmsComponent {
    country?: string;
    countryLanguageDropDownData?: string;
}

export interface AfterContentInit {
    ngAfterContentInit(): void
  }