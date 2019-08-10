import { Component, OnInit, Input, AfterViewInit, ElementRef, NgZone, OnDestroy } from '@angular/core';
import { take } from 'rxjs/internal/operators/take';

@Component({
  selector: 'animal-card',
  templateUrl: './card.component.html',
  host: { 'class': 'animal-card' },
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit, AfterViewInit, OnDestroy {

  // Card W : H portion
  cardPortion = 0.75;

  // Image W : H portion
  imgPortion = 1.15;
  @Input() data: Object;

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    window.addEventListener('orientationchange', this.redraw);
    window.addEventListener('resize', this.redraw)
  }

  // Render card width & height according to predefined portion
  renderCard(): void {
    const cardContainer = <HTMLDivElement> this.elementRef.nativeElement.querySelector('.card-container');
    // Render card height based on width
    const cardWidth = (<HTMLDivElement> cardContainer).offsetWidth;
    const cardHeight = cardWidth / this.cardPortion;
    cardContainer.style.height = `${cardHeight}px`;
    // Render img-wrapper height based on width: 1:1
    const imgContainer = <HTMLDivElement> this.elementRef.nativeElement.querySelector('.img-wrapper');
    const imgHeight = cardWidth / this.imgPortion;
    imgContainer.style.height = `${imgHeight}px`;
  }

  redraw = () => {
    setTimeout(() => {
      this.renderCard();
    }, 200);
  }
  ngAfterViewInit() {
    this.renderCard();
  }

  ngOnDestroy() {
    window.removeEventListener('orientationchange', this.redraw);
    window.removeEventListener('resize', this.redraw);

  }

}
