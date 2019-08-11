import { Component, OnInit, Input, AfterViewInit, ElementRef, NgZone, OnDestroy } from '@angular/core';
import { take } from 'rxjs/internal/operators/take';
import { AnimalService } from '../../services/animal.service';

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

  // Round image W : H portion
  roundImgPortion = 1;
  @Input() data: Object;

  constructor(private elementRef: ElementRef,
              private animalService: AnimalService) { }

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
    // Render inner-round-img-wrapper width based on height: 1:1
    const roundImgContainer = <HTMLDivElement> this.elementRef.nativeElement.querySelector('.inner-round-img-wrapper');
    const roundImgH = roundImgContainer.offsetHeight;
    const roundImgWidth = roundImgH / this.roundImgPortion;
    roundImgContainer.style.width = `${roundImgWidth}px`;
  }

  // Store data in localStorage and sessionStorage on click
  storeData(): void {
    this.animalService.storeAnimal(this.data);
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
