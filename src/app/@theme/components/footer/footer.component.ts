import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">Created with ♥ by <b><a href="http://syndicatesera.com" target="_blank">Syndicates Era</a></b> 2018</span>
    <h6 style="text-align:center; "><a href="mailto:info@exam360.in"><b>info@exam360.in</b></a></h6>
  `,
})
export class FooterComponent {
}
