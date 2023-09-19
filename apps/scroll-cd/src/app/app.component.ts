import { AsyncPipe, DOCUMENT, NgIf } from '@angular/common';
import { Component, Inject, NgZone, OnDestroy, OnInit } from '@angular/core';
import { distinctUntilChanged, fromEvent, map, Subject, takeUntil } from 'rxjs';

@Component({
  standalone: true,
  imports: [NgIf, AsyncPipe],
  selector: 'app-root',
  template: `
    <div>Top</div>
    <div>Middle</div>
    <div>Bottom</div>
    <button (click)="goToTop()" *ngIf="displayButton">Top</button>
  `,
  styles: [
    `
      :host {
        height: 1500px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        button {
          position: fixed;
          bottom: 1rem;
          left: 1rem;
          z-index: 1;
          padding: 1rem;
        }
      }
    `,
  ],
})
export class AppComponent implements OnInit, OnDestroy {
  displayButton = false;
  onDestroy$: Subject<void> = new Subject();

  constructor(
    @Inject(DOCUMENT)
    private document: { documentElement: { pageYOffset: number } },
    private readonly zone: NgZone
  ) {}

  ngOnInit(): void {
    this.zone.runOutsideAngular(() => {
      fromEvent(window, 'scroll')
        .pipe(
          map(
            () => window.scrollY || this.document.documentElement.pageYOffset
          ),
          map((pageYOffset: number) => pageYOffset > 50),
          distinctUntilChanged(),
          takeUntil(this.onDestroy$),
          map((value: boolean) =>
            this.zone.run(() => (this.displayButton = value))
          )
        )
        .subscribe();
    });
  }
  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  goToTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
}
