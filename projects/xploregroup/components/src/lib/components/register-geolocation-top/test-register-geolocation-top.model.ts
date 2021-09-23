import { CmsComponent } from "@spartacus/core";

export interface TestRegisterGeolocationTopModel extends CmsComponent {
    country?: string;
    content?: string;
}

export interface AfterContentInit {
    ngAfterContentInit(): void
  }