import {
  Component,
  ElementRef,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  OnDestroy,
  signal,
  output,
  inject
} from '@angular/core';
import {
  Overlay,
  OverlayRef,
  OverlayModule,
} from '@angular/cdk/overlay';
import { PortalModule, TemplatePortal } from '@angular/cdk/portal';
import { ExerciseDbApiService } from '../../../../../infrastructure/api/exercise-db-api.service';


@Component({
  selector: 'app-search-by-muscle',
  templateUrl: './search-by-muscle.component.html',
  styleUrls: ['./search-by-muscle.component.scss'], 
  imports: [
    OverlayModule,
    PortalModule
]
})
export class SearchByMuscleComponent implements OnDestroy {
  @ViewChild('dropdownTrigger') trigger!: ElementRef;
  @ViewChild('dropdownMenu') menuTemplate!: TemplateRef<any>;

  private exerciseService = inject(ExerciseDbApiService);
  public bodyPartSelected = output<string>();
  public bodyParts = signal<string[]>([]);
  public isOpen = signal<boolean>(false);
  public searchTerm = signal<string>('');

  private overlayRef!: OverlayRef;

  constructor(
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef
  ) {}

  
  ngOnInit() {
    // this.exerciseService.getAllExercises().subscribe((parts) => {
    //   console.log(parts);
    // });
    this.exerciseService.getBodyParts().subscribe((parts: string[]) => {
      this.bodyParts.set(parts);
    });
  }

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

  public selectMuscle(group: string): void {
    this.searchTerm.set(group);
    this.isOpen.set(false);    
    this.bodyPartSelected.emit(group);
  }

  ngOnDestroy(): void {
    if (this.overlayRef) {
      this.overlayRef.dispose();
    }
  }
}