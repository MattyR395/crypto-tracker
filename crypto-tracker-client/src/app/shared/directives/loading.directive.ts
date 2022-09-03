import { ComponentRef, Directive, ElementRef, HostBinding, Input, OnChanges, OnInit, Renderer2, SimpleChanges, ViewContainerRef } from '@angular/core';
import { LoadingIndicatorComponent } from '../components/loading-indicator/loading-indicator.component';

@Directive({
  selector: '[appLoading]',
  host: {
    '[style.position]': '"relative"'
  }
})
export class LoadingDirective implements OnInit, OnChanges {

  @HostBinding('style.min-height')
  hostMinHeight: string = '20rem';
  
  @Input() appLoading: boolean = false;

  loadingIndicatorRef!: ComponentRef<LoadingIndicatorComponent>;

  constructor(private viewContainerRef: ViewContainerRef, private renderer: Renderer2, private el: ElementRef) { }

  ngOnInit(): void {

    // Insert the loading indicator component. 
    this.loadingIndicatorRef = this.viewContainerRef.createComponent<LoadingIndicatorComponent>(LoadingIndicatorComponent);

    // Move the loading indicator inside the host element.
    this.renderer.appendChild(this.el.nativeElement, this.loadingIndicatorRef.location.nativeElement);

    this.setVisibility();
  }

  setVisibility(): void {
    // Show or hide the loading spinner based on the input.
    this.renderer.setStyle(
      this.loadingIndicatorRef.location.nativeElement,
      'opacity',
      this.appLoading ? '1' : '0'
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['appLoading'] && this.loadingIndicatorRef) {
      this.setVisibility();
    }
  }

}
