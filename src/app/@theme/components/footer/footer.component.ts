import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">Created with ♥ by <b><a href="http://syndicatesera.com" target="_blank">Syndicates Era</a></b> 2018</span>
  `,
})
export class FooterComponent {
}
