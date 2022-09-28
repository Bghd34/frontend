import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { Intern } from '../../core/models/intern';
import { BubbleConfig } from './configs/bubble-config';
import { plainToClass } from 'class-transformer';

@Directive({
  selector: '[appInitials]'
})
export class InitialsDirective implements OnInit{
  @Input() public initial!: string;

  @Input() config: any;

  private nativeElement: HTMLElement;


  constructor(
    private renderer: Renderer2,
    elementRef: ElementRef
  ) {
    this.nativeElement = elementRef.nativeElement;

     /** // Sets styles as a Map
      * this.stylesMap
     .set('height', '2em')
     .set('width', '2em')
     .set('background-color', 'rgba(127, 127, 127, 0.7)')
     .set('font-weight', 'bold')
     .set('border-radius', '50%')
     .set('vertical-align', 'middle')
     .set('text-align', 'center');
      */


  }
  ngOnInit(): void {

    const config: BubbleConfig = new BubbleConfig().desserlialize(this.config);
    for(const property in config) {
      this.renderer.setStyle(this.nativeElement, property, this.config[property])
    }

    const initials: string = this.initial;

    this.nativeElement.innerText = initials;
  }

}
