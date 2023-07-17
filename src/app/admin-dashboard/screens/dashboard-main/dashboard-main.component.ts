import { Component } from '@angular/core';
import { ICommunities } from '../../interfaces/communities.interfaces';

@Component({
  selector: 'app-dashboard-main',
  templateUrl: './dashboard-main.component.html',
  styleUrls: ['./dashboard-main.component.css'],
})
export class DashboardMainComponent {
  value: string | undefined;

  communities: ICommunities[] = [
    {
      name: 'Angular',
      description:
        'Angular is a platform for building mobile and desktop web applications.',
      color: '#dd0031',
      createdAt: new Date(),
    },
    {
      name: 'React',
      description:
        'React is a JavaScript library for building user interfaces.',
      color: '#61dafb',
      createdAt: new Date(),
    },
    {
      name: 'Vue',
      description:
        'Vue is a progressive framework for building user interfaces.',
      color: '#42b883',
      createdAt: new Date(),
    },
    {
      name: 'Svelte',
      description: 'Cybernetically enhanced web apps.',
      color: '#ff3e00',
      createdAt: new Date(),
    },
    {
      name: 'Ember',
      description:
        'Ember.js is a JavaScript framework for building web applications.',
      color: '#f23819',
      createdAt: new Date(),
    },
  ];

  constructor() {}

  onKey() {
    console.log(this.value);
  }
}
