import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate, keyframes } from '@angular/animations';

@Component({
  selector: 'app-sorting-visualizer',
  templateUrl: './sorting-visualizer.component.html',
  styleUrls: ['./sorting-visualizer.component.css'],
  standalone: true,
  imports: [CommonModule],
  animations: [
    trigger('sortAnimation', [
      transition('* => *', [
        animate('500ms ease-out', keyframes([
          style({ transform: 'scale(1.1)', backgroundColor: 'orange', offset: 0.5 }),
          style({ transform: 'scale(1)', backgroundColor: 'lightgreen', offset: 1 }),
        ]))
      ])
    ])
  ]
})
export class SortingVisualizerComponent implements OnInit {
  @Input() algorithm: string = 'bubble'; // Default algorithm
  originalArray = [5, 2, 8, 3, 1, 6, 4]; // Store the original array
  array: number[] = [...this.originalArray]; // Copy of the array to be sorted
  comparingIndexes: number[] = []; // Indexes of the elements being compared
  swappingIndexes: number[] = []; // Indexes of the elements being swapped
  arrowPosition: number = -1; // Position of the arrow

  ngOnInit(): void {}

  async sort(): Promise<void> {
    switch (this.algorithm) {
      case 'bubble':
        await this.bubbleSort();
        break;
      case 'selection':
        await this.selectionSort();
        break;
      case 'insertion':
        await this.insertionSort();
        break;
      default:
        console.error('Unknown algorithm');
    }
  }

  async bubbleSort(): Promise<void> {
    this.arrowPosition = 0;
    const n = this.array.length;
  
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        this.comparingIndexes = [j, j + 1];
        await new Promise(resolve => setTimeout(resolve, 500));
        if (this.array[j] > this.array[j + 1]) {
          this.swappingIndexes = [j, j + 1];
          await this.swapAndAnimate(j, j + 1);
          this.swappingIndexes = [];
        }
        this.comparingIndexes = [];
        this.arrowPosition = j + 1;
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }
    this.arrowPosition = -1;
  }
  
  async selectionSort(): Promise<void> {
    this.arrowPosition = 0;
    const n = this.array.length;
  
    for (let i = 0; i < n - 1; i++) {
      let minIndex = i;
      for (let j = i + 1; j < n; j++) {
        this.comparingIndexes = [minIndex, j];
        await new Promise(resolve => setTimeout(resolve, 500));
        if (this.array[j] < this.array[minIndex]) {
          minIndex = j;
        }
      }
      if (minIndex !== i) {
        this.swappingIndexes = [i, minIndex];
        await this.swapAndAnimate(i, minIndex);
        this.swappingIndexes = [];
      }
      this.comparingIndexes = [];
      this.arrowPosition = i + 1;
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    this.arrowPosition = -1;
  }
  
  async insertionSort(): Promise<void> {
    this.arrowPosition = 0;
    const n = this.array.length;
  
    for (let i = 1; i < n; i++) {
      const key = this.array[i];
      let j = i - 1;
      while (j >= 0 && this.array[j] > key) {
        this.comparingIndexes = [j, i];
        await new Promise(resolve => setTimeout(resolve, 500));
        this.array[j + 1] = this.array[j];
        j--;
      }
      this.array[j + 1] = key;
      this.comparingIndexes = [];
      this.arrowPosition = i + 1;
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    this.arrowPosition = -1;
  }
  

  swapAndAnimate(i: number, j: number): Promise<void> {
    return new Promise((resolve) => {
      [this.array[i], this.array[j]] = [this.array[j], this.array[i]];
      this.triggerAnimation();

      setTimeout(() => {
        resolve();
      }, 500);
    });
  }

  triggerAnimation() {
    this.array = [...this.array];
  }

  reset() {
    this.array = [...this.originalArray];
  }
}



