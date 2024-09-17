import { Component } from '@angular/core';
import { Course } from '../model/course';
import { CourseService } from '../services/course.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent {
  courselist: Course[] = [];
  filteredCourselist: Course[] = [];
  filterValue: string = "";
  sortColumn: string = "";

  constructor(private courseservice : CourseService) {}

  ngOnInit() {
    this.courseservice.getCourses().subscribe(data => {
      this.courselist = data;
      this.filteredCourselist = data;
    })
  }

  applyFilter(): void {
    this.filteredCourselist = this.courselist.filter((course) => {
      return course.code.toLowerCase().includes(this.filterValue.toLowerCase()) ||
             course.coursename.toLowerCase().includes(this.filterValue.toLowerCase()) ||
             course.progression.toLowerCase().includes(this.filterValue.toLowerCase());
    });
  }

  sortData(column: string): void {
      if (column === "code") {
        this.filteredCourselist.sort((a, b) => a.code.localeCompare(b.code));
      }

      if (column === "coursename") {
        this.filteredCourselist.sort((a, b) => a.coursename.localeCompare(b.coursename));
      }

      if (column === "progression") {
        this.filteredCourselist.sort((a, b) => a.progression.localeCompare(b.progression));
      }
  }
}
