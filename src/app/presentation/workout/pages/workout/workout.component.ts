import { CommonModule } from '@angular/common';
import { Component, computed, effect, input, signal } from '@angular/core';

import { TruncatePipe } from '../../../../shared/pipes/truncate.pipe';
import { Exercise } from '../../../../domain/entities/exercise.entity';
import { FormatTimePipe } from '../../../../shared/pipes/format-time.pipe';
import { FormatPercentagePipe } from "../../../../shared/pipes/format-percentage.pipe";
import { ArrowButton } from "../../../../shared/atoms/arrow-button/arrow-button.component";
import { CircleButtonComponent } from '../../../../shared/atoms/circle-button/circle-button.component';


const mockExercises: Exercise[] = [
    {
        "bodyPart": "waist",
        "equipment": "body weight",
        "gifUrl": "assets/gif/0001.gif",
        "id": "0001",
        "name": "3/4 sit-up",
        "target": "abs",
        "secondaryMuscles": [
            "hip flexors",
            "lower back"
        ],
        "instructions": [
            "Lie flat on your back with your knees bent and feet flat on the ground.",
            "Place your hands behind your head with your elbows pointing outwards.",
            "Engaging your abs, slowly lift your upper body off the ground, curling forward until your torso is at a 45-degree angle.",
            "Pause for a moment at the top, then slowly lower your upper body back down to the starting position.",
            "Repeat for the desired number of repetitions."
        ]
    },
    {
        "bodyPart": "waist",
        "equipment": "body weight",
        "gifUrl": "assets/gif/0002.gif",
        "id": "0002",
        "name": "45° side bend",
        "target": "abs",
        "secondaryMuscles": [
            "obliques"
        ],
        "instructions": [
            "Stand with your feet shoulder-width apart and your arms extended straight down by your sides.",
            "Keeping your back straight and your core engaged, slowly bend your torso to one side, lowering your hand towards your knee.",
            "Pause for a moment at the bottom, then slowly return to the starting position.",
            "Repeat on the other side.",
            "Continue alternating sides for the desired number of repetitions."
        ]
    },
    {
        "bodyPart": "waist",
        "equipment": "body weight",
        "gifUrl": "assets/gif/0003.gif",
        "id": "0003",
        "name": "air bike",
        "target": "abs",
        "secondaryMuscles": [
            "hip flexors"
        ],
        "instructions": [
            "Lie flat on your back with your hands placed behind your head.",
            "Lift your legs off the ground and bend your knees at a 90-degree angle.",
            "Bring your right elbow towards your left knee while simultaneously straightening your right leg.",
            "Return to the starting position and repeat the movement on the opposite side, bringing your left elbow towards your right knee while straightening your left leg.",
            "Continue alternating sides in a pedaling motion for the desired number of repetitions."
        ]
    },
    {
        "bodyPart": "waist",
        "equipment": "body weight",
        "gifUrl": "assets/gif/0006.gif",
        "id": "0006",
        "name": "alternate heel touchers",
        "target": "abs",
        "secondaryMuscles": [
            "obliques"
        ],
        "instructions": [
            "Lie flat on your back with your knees bent and feet flat on the ground.",
            "Extend your arms straight out to the sides, parallel to the ground.",
            "Engaging your abs, lift your shoulders off the ground and reach your right hand towards your right heel.",
            "Return to the starting position and repeat on the left side, reaching your left hand towards your left heel.",
            "Continue alternating sides for the desired number of repetitions."
        ]
    },
    {
        "bodyPart": "back",
        "equipment": "cable",
        "gifUrl": "assets/gif/0007.gif",
        "id": "0007",
        "name": "alternate lateral pulldown",
        "target": "lats",
        "secondaryMuscles": [
            "biceps",
            "rhomboids"
        ],
        "instructions": [
            "Sit on the cable machine with your back straight and feet flat on the ground.",
            "Grasp the handles with an overhand grip, slightly wider than shoulder-width apart.",
            "Lean back slightly and pull the handles towards your chest, squeezing your shoulder blades together.",
            "Pause for a moment at the peak of the movement, then slowly release the handles back to the starting position.",
            "Repeat for the desired number of repetitions."
        ]
    },
    {
        "bodyPart": "chest",
        "equipment": "leverage machine",
        "gifUrl": "assets/gif/0009.gif",
        "id": "0009",
        "name": "assisted chest dip (kneeling)",
        "target": "pectorals",
        "secondaryMuscles": [
            "triceps",
            "shoulders"
        ],
        "instructions": [
            "Adjust the machine to your desired height and secure your knees on the pad.",
            "Grasp the handles with your palms facing down and your arms fully extended.",
            "Lower your body by bending your elbows until your upper arms are parallel to the floor.",
            "Pause for a moment, then push yourself back up to the starting position.",
            "Repeat for the desired number of repetitions."
        ]
    },
    {
        "bodyPart": "waist",
        "equipment": "assisted",
        "gifUrl": "assets/gif/0010.gif",
        "id": "0010",
        "name": "assisted hanging knee raise with throw down",
        "target": "abs",
        "secondaryMuscles": [
            "hip flexors",
            "lower back"
        ],
        "instructions": [
            "Hang from a pull-up bar with your arms fully extended and your palms facing away from you.",
            "Engage your core and lift your knees towards your chest, keeping your legs together.",
            "Once your knees are at chest level, explosively throw your legs down towards the ground, extending them fully.",
            "Allow your legs to swing back up and repeat the movement for the desired number of repetitions."
        ]
    }
];

@Component({
    selector: 'app-workout',
    imports: [CommonModule, CircleButtonComponent, TruncatePipe, FormatTimePipe, ArrowButton, FormatPercentagePipe],
    templateUrl: './workout.component.html',
    styleUrls: ['./workout.component.scss']
})
export class WorkoutComponent {
    public exercises = signal<Exercise[]>(mockExercises);
    public hasNext = computed(() => this.currentIndex() < this.exercises().length - 1);
    public hasPrev = computed(() => this.currentIndex() > 0);
    public currentExercise = computed(() => this.exercises()[this.currentIndex()]);
    public currentIndex = signal(0);
    public isTraining = signal<boolean>(false);

    public readonly progressPercentage = computed(() => ((this.currentIndex() + 1) / this.exercises().length) * 100);

    private intervalId: any;
    readonly isRunning = signal(false);
    public countdown = input<number | undefined>();
    readonly time = signal(0);
    readonly displayTime = computed(() => { 
        const cd = this.countdown();
        return cd ? cd - this.time() : this.time();
    });

    constructor() {
        effect(() => {
            if (this.isRunning()) {
                this.startInterval();
            } else {
                this.clearInterval();
            }
        });

        // Si es countdown, preestablecer tiempo en 0.
        effect(() => {
            if (this.countdown()) {
                this.time.set(0);
            }
        });
    }

    private startInterval() {
        this.intervalId = setInterval(() => {
            const cd = this.countdown();
            this.time.update((t) => {
                if (cd && t >= cd) {
                    this.isRunning.set(false);
                    return t;
                }
                return t + 1;
            });
        }, 1000);
    }


    private clearInterval() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }


    public reset(): void {
        this.time.set(0);
        this.isRunning.set(false);
    }


    ngOnDestroy(): void {
        this.clearInterval();
    }


    public toggleTimer(): void {
        this.isRunning.update((r) => !r);
    }


    public nextExercise(): void {
        if (this.currentIndex() < this.exercises().length - 1) 
            this.currentIndex.update(i => i + 1);
    }


    public previousExercise(): void {
        if (this.currentIndex() > 0) 
            this.currentIndex.update(i => i - 1);
    }


    public markAsCompleted(): void {
        // alert(`Ejercicio completado: ${this.currentExercise().name}`);
        // this.nextExercise();
        this.isTraining.set(!this.isTraining());
    }

}