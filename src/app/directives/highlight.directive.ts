import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core'; //renderer is used in case we want to render the dom in some other platform
                                            //mouse movements
@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostListener('mouseenter') onmouseenter() {
    this.renderer.addClass(this.el.nativeElement, 'highlight');
  }

  @HostListener('mouseleave') onmouseleave() {
    this.renderer.removeClass(this.el.nativeElement, 'highlight');
  }

}
