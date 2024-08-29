import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface DataStructure {
  name: string;
  description: string;
  timeComplexities: { operation: string; complexity: string }[];
  spaceComplexity: string;
  advantages: string[];
  disadvantages: string[];
  realWorldApplications: string[];
}

@Component({
  selector: 'app-data-structures',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './data-structures.component.html',
  styleUrls: ['./data-structures.component.css']
})
export class DataStructuresComponent {
  dataStructures: DataStructure[] = [
    {
      name: 'Stack',
      description: 'A stack is a linear data structure that follows the Last-In-First-Out (LIFO) principle.',
      timeComplexities: [
        { operation: 'Push', complexity: 'O(1)' },
        { operation: 'Pop', complexity: 'O(1)' },
        { operation: 'Peek', complexity: 'O(1)' },
      ],
      spaceComplexity: 'O(n)',
      advantages: [
        'Simple and easy to implement',
        'Efficient for last-in-first-out operations',
      ],
      disadvantages: [
        'Limited access to elements (only top element is directly accessible)',
        'Fixed size in array implementation (can lead to stack overflow)',
      ],
      realWorldApplications: [
        'Function call stack in programming languages',
        'Undo mechanism in text editors',
        'Expression evaluation and syntax parsing',
      ]
    },
    {
      name: 'Queue',
      description: 'A queue is a linear data structure that follows the First-In-First-Out (FIFO) principle.',
      timeComplexities: [
        { operation: 'Enqueue', complexity: 'O(1)' },
        { operation: 'Dequeue', complexity: 'O(1)' },
        { operation: 'Peek', complexity: 'O(1)' },
      ],
      spaceComplexity: 'O(n)',
      advantages: [
        'Efficient for first-in-first-out operations',
        'Useful for managing asynchronous requests',
      ],
      disadvantages: [
        'Limited access to elements (only front element is directly accessible)',
        'Can be inefficient for searching specific elements',
      ],
      realWorldApplications: [
        'Task scheduling in operating systems',
        'Breadth-First Search in graphs',
        'Print job spooling',
      ]
    },
    {
      name: 'Linked List',
      description: 'A linked list is a linear data structure where elements are stored in nodes, and each node points to the next node in the sequence.',
      timeComplexities: [
        { operation: 'Insertion', complexity: 'O(1) or O(n)' },
        { operation: 'Deletion', complexity: 'O(1) or O(n)' },
        { operation: 'Search', complexity: 'O(n)' },
      ],
      spaceComplexity: 'O(n)',
      advantages: [
        'Dynamic size',
        'Efficient insertion and deletion at any position',
      ],
      disadvantages: [
        'Random access is not allowed',
        'Extra memory space for pointer is required',
      ],
      realWorldApplications: [
        'Implementation of other data structures like stacks and queues',
        'Music playlist management',
        'Browser history',
      ]
    },
  ];

  selectedDataStructure: DataStructure | null = null;
  
  // Stack
  stack: number[] = [];
  maxStackSize = 10;
  
  // Queue
  queue: number[] = [];
  maxQueueSize = 10;
  
  // Linked List
  linkedList: number[] = [];
  
  newElement: number | null = null;

  selectDataStructure(name: string) {
    this.selectedDataStructure = this.dataStructures.find(ds => ds.name === name) || null;
    this.resetDataStructures();
  }

  resetDataStructures() {
    this.stack = [];
    this.queue = [];
    this.linkedList = [];
    this.newElement = null;
  }

  // Stack operations
  pushToStack() {
    if (this.newElement !== null && this.stack.length < this.maxStackSize) {
      this.stack.push(this.newElement);
      this.newElement = null;
    }
  }

  popFromStack() {
    if (this.stack.length > 0) {
      this.stack.pop();
    }
  }

  // Queue operations
  enqueue() {
    if (this.newElement !== null && this.queue.length < this.maxQueueSize) {
      this.queue.push(this.newElement);
      this.newElement = null;
    }
  }

  dequeue() {
    if (this.queue.length > 0) {
      this.queue.shift();
    }
  }

  // Linked List operations
  addToLinkedList() {
    if (this.newElement !== null) {
      this.linkedList.push(this.newElement);
      this.newElement = null;
    }
  }

  removeFromLinkedList(index: number) {
    this.linkedList.splice(index, 1);
  }
}