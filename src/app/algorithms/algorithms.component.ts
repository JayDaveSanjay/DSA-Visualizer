import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Copy all interfaces from your current app.component.ts
interface ArrayItem {
  value: number;
  state: 'default' | 'comparing' | 'swapping' | 'sorted';
}

interface AlgorithmInfo {
  name: string;
  description: string;
  timeComplexity: string;
  spaceComplexity: string;
  advantages: string[];
  disadvantages: string[];
  history: string;
  steps: string[];
}

@Component({
  selector: 'app-algorithms',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './algorithms.component.html',
  styleUrls: ['./algorithms.component.css']
})
export class AlgorithmsComponent implements OnInit {
  // Paste all texport class AppComponent implements OnInit {
    title = 'DSA Visualizer';
    array: ArrayItem[] = [];
    sortingInProgress = false;
    speed = 500; // milliseconds
    selectedAlgorithm: AlgorithmInfo | null = null;
    comparisonIndices: number[] = [];
    swapIndices: number[] = [];
    isPaused = false;
    sortingPromise: Promise<void> | null = null;
    currentStep = '';
    pivotIndex: number | null = null;
    partitionRange: [number, number] | null = null;
  
    algorithmInfos: AlgorithmInfo[] = [
      {
        name: 'Bubble Sort',
        description: 'Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.',
        timeComplexity: 'O(n²)',
        spaceComplexity: 'O(1)',
        advantages: [
          'Simple to understand and implement',
          'Requires no additional memory space'
        ],
        disadvantages: [
          'Not suitable for large data sets',
          'Poor time complexity compared to advanced algorithms'
        ],
        history: 'Bubble sort was first described by Edward H. Friend in 1956. Despite its simplicity, it is rarely used in practice for efficient sorting.',
        steps: [
          "Start with the first element",
          "Compare the current element with the next element",
          "If the current element is greater than the next element, swap them",
          "Move to the next element and repeat steps 2-3 until the end of the array",
          "Repeat steps 1-4 for each element in the array",
          "The array is sorted when no more swaps are needed"
        ]
      },
      {
        name: 'Quick Sort',
        description: 'Quick Sort is a divide-and-conquer algorithm that picks an element as a pivot and partitions the array around the picked pivot.',
        timeComplexity: 'Average: O(n log n), Worst: O(n²)',
        spaceComplexity: 'O(log n)',
        advantages: [
          'Generally faster in practice compared to other O(n log n) algorithms',
          'In-place sorting algorithm with low overhead'
        ],
        disadvantages: [
          'Worst-case time complexity of O(n²)',
          'Not stable (doesn\'t preserve the relative order of equal elements)'
        ],
        history: 'Quick Sort was developed by Tony Hoare in 1959 and published in 1961. It has been a commonly used algorithm for sorting since its publication.',
        steps: [
          "Choose a pivot element from the array",
          "Partition the array: move all elements smaller than the pivot to its left and all elements greater to its right",
          "Recursively apply steps 1-2 to the sub-array of elements with smaller values",
          "Recursively apply steps 1-2 to the sub-array of elements with greater values",
          "Combine the sorted sub-arrays and the pivot to get the final sorted array"
        ]
      },
      {
        name: 'Merge Sort',
        description: 'Merge Sort is an efficient, stable, divide-and-conquer algorithm that divides the unsorted list into n sublists, then repeatedly merges sublists to produce new sorted sublists until there is only one sublist remaining.',
        timeComplexity: 'O(n log n)',
        spaceComplexity: 'O(n)',
        advantages: [
          'Stable sorting algorithm',
          'Guaranteed O(n log n) time complexity regardless of input data'
        ],
        disadvantages: [
          'Requires additional memory space O(n)',
          'Slower for smaller tasks compared to simple algorithms like insertion sort'
        ],
        history: 'Merge Sort was invented by John von Neumann in 1945. It has since been a fundamental algorithm in computer science, often taught as an introduction to the divide-and-conquer technique.',
        steps: [
          "Divide the unsorted array into n sub-arrays, each containing one element (an array of one element is considered sorted)",
          "Repeatedly merge sub-arrays to produce new sorted sub-arrays until there is only one sub-array remaining. This will be the sorted array"
        ]
      }
    ];
  
    ngOnInit() {
      this.generateRandomArray();
    }
  
    generateRandomArray() {
      this.array = Array.from({length: 20}, () => ({
        value: Math.floor(Math.random() * 100) + 1,
        state: 'default'
      }));
    }
  
    selectAlgorithm(name: string) {
      this.selectedAlgorithm = this.algorithmInfos.find(algo => algo.name === name) || null;
    }
  
    async startSorting(algorithm: string) {
      if (this.sortingInProgress) return;
      this.sortingInProgress = true;
      this.isPaused = false;
      
      switch (algorithm) {
        case 'Bubble Sort':
          this.sortingPromise = this.bubbleSort();
          break;
        case 'Quick Sort':
          this.sortingPromise = this.quickSort();
          break;
        case 'Merge Sort':
          this.sortingPromise = this.mergeSort();
          break;
      }
  
      await this.sortingPromise;
      this.sortingPromise = null;
      this.sortingInProgress = false;
    }
  
    pauseSorting() {
      this.isPaused = true;
    }
  
    resumeSorting() {
      this.isPaused = false;
    }
  
    async bubbleSort() {
      this.selectAlgorithm('Bubble Sort');
      const n = this.array.length;
      for (let i = 0; i < n - 1; i++) {
        this.currentStep = this.selectedAlgorithm!.steps[0];
        for (let j = 0; j < n - i - 1; j++) {
          if (this.isPaused) await this.waitForResume();
          this.currentStep = this.selectedAlgorithm!.steps[1];
          this.comparisonIndices = [j, j + 1];
          this.array[j].state = this.array[j + 1].state = 'comparing';
          await this.delay(this.speed);
  
          if (this.array[j].value > this.array[j + 1].value) {
            if (this.isPaused) await this.waitForResume();
            this.currentStep = this.selectedAlgorithm!.steps[2];
            this.swapIndices = [j, j + 1];
            this.array[j].state = this.array[j + 1].state = 'swapping';
            await this.delay(this.speed);
            [this.array[j], this.array[j + 1]] = [this.array[j + 1], this.array[j]];
          }
  
          this.array[j].state = this.array[j + 1].state = 'default';
          this.comparisonIndices = [];
          this.swapIndices = [];
        }
        this.currentStep = this.selectedAlgorithm!.steps[3];
        this.array[n - i - 1].state = 'sorted';
      }
      this.currentStep = this.selectedAlgorithm!.steps[5];
      this.array[0].state = 'sorted';
    }
  
    async quickSort() {
      this.selectAlgorithm('Quick Sort');
      await this.quickSortHelper(0, this.array.length - 1);
      this.array.forEach(item => item.state = 'sorted');
      this.currentStep = "Quick Sort completed";
      this.pivotIndex = null;
      this.partitionRange = null;
    }
  
    private async quickSortHelper(low: number, high: number) {
      if (low < high) {
        this.partitionRange = [low, high];
        this.currentStep = `Partitioning sub-array from index ${low} to ${high}`;
        await this.delay(this.speed);
  
        const pi = await this.partition(low, high);
        
        this.currentStep = `Recursively sorting left sub-array (indexes ${low} to ${pi - 1})`;
        await this.delay(this.speed);
        await this.quickSortHelper(low, pi - 1);
  
        this.currentStep = `Recursively sorting right sub-array (indexes ${pi + 1} to ${high})`;
        await this.delay(this.speed);
        await this.quickSortHelper(pi + 1, high);
      }
    }
  
    private async partition(low: number, high: number): Promise<number> {
      const pivot = this.array[high].value;
      this.pivotIndex = high;
      this.currentStep = `Chosen pivot: ${pivot} (index ${high})`;
      await this.delay(this.speed);
  
      let i = low - 1;
      
      for (let j = low; j < high; j++) {
        if (this.isPaused) await this.waitForResume();
        
        this.currentStep = `Comparing element ${this.array[j].value} at index ${j} with pivot ${pivot}`;
        this.comparisonIndices = [j, high];
        this.array[j].state = this.array[high].state = 'comparing';
        await this.delay(this.speed);
  
        if (this.array[j].value < pivot) {
          i++;
          if (this.isPaused) await this.waitForResume();
          
          if (i !== j) {
            this.currentStep = `Swapping elements: ${this.array[i].value} (index ${i}) with ${this.array[j].value} (index ${j})`;
            this.swapIndices = [i, j];
            this.array[i].state = this.array[j].state = 'swapping';
            await this.delay(this.speed);
            [this.array[i], this.array[j]] = [this.array[j], this.array[i]];
          } else {
            this.currentStep = `Element ${this.array[j].value} at index ${j} is already in the correct position`;
            await this.delay(this.speed);
          }
        } else {
          this.currentStep = `Element ${this.array[j].value} at index ${j} is greater than or equal to pivot, no swap needed`;
          await this.delay(this.speed);
        }
  
        this.array[j].state = this.array[high].state = 'default';
        this.comparisonIndices = [];
        this.swapIndices = [];
      }
  
      if (this.isPaused) await this.waitForResume();
      
      this.currentStep = `Placing pivot ${pivot} in its correct position`;
      this.swapIndices = [i + 1, high];
      this.array[i + 1].state = this.array[high].state = 'swapping';
      await this.delay(this.speed);
      [this.array[i + 1], this.array[high]] = [this.array[high], this.array[i + 1]];
      this.array[i + 1].state = 'sorted';
      this.swapIndices = [];
      this.pivotIndex = i + 1;
  
      this.currentStep = `Partition complete. Pivot ${pivot} is now at index ${i + 1}`;
      await this.delay(this.speed);
  
      return i + 1;
    }
  
    async mergeSort() {
      this.selectAlgorithm('Merge Sort');
      await this.mergeSortHelper(0, this.array.length - 1);
      this.array.forEach(item => item.state = 'sorted');
      this.currentStep = "Merge Sort completed";
    }
  
    private async mergeSortHelper(left: number, right: number) {
      if (left < right) {
        this.currentStep = this.selectedAlgorithm!.steps[0];
        const mid = Math.floor((left + right) / 2);
        await this.mergeSortHelper(left, mid);
        await this.mergeSortHelper(mid + 1, right);
        this.currentStep = this.selectedAlgorithm!.steps[1];
        await this.merge(left, mid, right);
      }
    }
  
    private async merge(left: number, mid: number, right: number) {
      const n1 = mid - left + 1;
      const n2 = right - mid;
      const L = this.array.slice(left, mid + 1);
      const R = this.array.slice(mid + 1, right + 1);
      
      let i = 0, j = 0, k = left;
      while (i < n1 && j < n2) {
        if (this.isPaused) await this.waitForResume();
        this.comparisonIndices = [left + i, mid + 1 + j];
        this.array[left + i].state = this.array[mid + 1 + j].state = 'comparing';
        await this.delay(this.speed);
  
        if (L[i].value <= R[j].value) {
          this.array[k] = L[i];
          i++;
        } else {
          this.array[k] = R[j];
          j++;
        }
        if (this.isPaused) await this.waitForResume();
        this.swapIndices = [k];
        this.array[k].state = 'swapping';
        await this.delay(this.speed);
        this.array[k].state = 'default';
        k++;
        this.comparisonIndices = [];
        this.swapIndices = [];
      }
      
      while (i < n1) {
        if (this.isPaused) await this.waitForResume();
        this.swapIndices = [k];
        this.array[k] = L[i];
        this.array[k].state = 'swapping';
        await this.delay(this.speed);
        this.array[k].state = 'default';
        i++;
        k++;
        this.swapIndices = [];
      }
      
      while (j < n2) {
        if (this.isPaused) await this.waitForResume();
        this.swapIndices = [k];
        this.array[k] = R[j];
        this.array[k].state = 'swapping';
        await this.delay(this.speed);
        this.array[k].state = 'default';
        j++;
        k++;
        this.swapIndices = [];
      }
    }
  
    private async waitForResume(): Promise<void> {
      return new Promise<void>(resolve => {
        const checkPaused = () => {
          if (!this.isPaused) {
            resolve();
          } else {
            setTimeout(checkPaused, 100);
          }
        };
        checkPaused();
      });
    }
  
    private delay(ms: number): Promise<void> {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
  }