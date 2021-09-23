import { CmsComponent } from "@spartacus/core";
import { Media } from "@spartacus/storefront";

export interface TestRegisterGeolocationModel extends CmsComponent {
    country?: string;
    content?: string;
    logo?: Media;
}

export interface AfterContentInit {
    ngAfterContentInit(): void
  }