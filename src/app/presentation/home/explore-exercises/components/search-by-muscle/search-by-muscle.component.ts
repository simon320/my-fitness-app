import {
  Component,
  ElementRef,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  OnDestroy,
} from '@angular/core';
import {
  Overlay,
  OverlayRef,
  FlexibleConnectedPositionStrategy,
  OverlayModule,
} from '@angular/cdk/overlay';
import { PortalModule, TemplatePortal } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-by-muscle',
  templateUrl: './search-by-muscle.component.html',
  styleUrls: ['./search-by-muscle.component.scss'], 
  imports: [
    CommonModule,
    OverlayModule,
    PortalModule
  ]
})
export class SearchByMuscleComponent implements OnDestroy {
  @ViewChild('dropdownTrigger') trigger!: ElementRef;
  @ViewChild('dropdownMenu') menuTemplate!: TemplateRef<any>;

  private overlayRef!: OverlayRef;

  constructor(
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef
  ) {}

  toggleDropdown() {
    if (this.overlayRef && this.overlayRef.hasAttached()) {
      this.overlayRef.detach();
    } else {
      const positionStrategy = this.overlay
        .position()
        .flexibleConnectedTo(this.trigger)
        .withPositions([
          {
            originX: 'start',
            originY: 'bottom',
            overlayX: 'start',
            overlayY: 'top',
            offsetY: 4,
          },
        ])
        .withFlexibleDimensions(false)
        .withPush(false);

      this.overlayRef = this.overlay.create({
        positionStrategy,
        hasBackdrop: true,
        backdropClass: 'cdk-overlay-transparent-backdrop',
        scrollStrategy: this.overlay.scrollStrategies.reposition(),
      });

      this.overlayRef.backdropClick().subscribe(() => this.overlayRef.detach());

      const portal = new TemplatePortal(this.menuTemplate, this.viewContainerRef);
      this.overlayRef.attach(portal);
    }
  }

  ngOnDestroy(): void {
    if (this.overlayRef) {
      this.overlayRef.dispose();
    }
  }
}