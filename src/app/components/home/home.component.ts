import { Component, OnInit } from '@angular/core';
import { student } from 'src/app/models/student.model';
import { StudentService } from 'src/app/services/student.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { last } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  student = new student()
  studentForm : FormGroup
  
  
studentList = new Array<student>()

  /*dni: string;
  lastName: string;
  firstName: string;
  email: string;*/

  id2: number;
  dni2: string;
  lastName2: string;
  firstName2: string;
  email2: string;

  dni3: string;
  lastName3: string;
  firstName3: string;
  email3: string;

  constructor(private studentService: StudentService, private modalService: NgbModal){}

  ngOnInit(): void {
    this.studentForm = new FormGroup({
      'dni': new FormControl(this.student.dni, Validators.required),
      'lastName': new FormControl(this.student.lastName, Validators.required),
      'firstName': new FormControl(this.student.firstName, Validators.required),
      'email': new FormControl(this.student.email, Validators.required)
    })
    this.getAll();
  }
  get dni() {return this.studentForm.get('dni')}
  get lastName() {return this.studentForm.get('lastName')} 
  get firstName() {return this.studentForm.get('firstName')}
  get email () {return this.studentForm.get('email')}

  getAll() {
    this.studentService.getAll().subscribe(response => {
      this.studentList = response
      /*this.dni = ''
      this.lastName = ''
      this.firstName = ''
      this.email = ''*/
      document.getElementsByTagName('input')[0].focus()
    }, error => {
      console.error(error)
      alert('Error: ' + error.error.message)
    })
  }

  add() {
    //if (this.dni.trim() !== '' && this.lastName.trim() !== '') {
      
      this.student.dni = this.dni?.value
      this.student.lastName = this.lastName?.value
      this.student.firstName = this.firstName?.value
      this.student.email = this.email?.value
      this.student.cohort = 0
      this.student.status = 'activo'
      this.student.gender = 'masculino'
      this.student.adress = 'abc123'
      this.student.phone = '000' 

    this.studentService.save(this.student).subscribe( () => {
      location.reload()
    }, error => {
      console.error(error)
      alert('Error: ' + error.error.message)
      document.getElementsByTagName('input')[0].focus()
    });
    
  }

  delete(id: number) {
    this.studentService.delete(id).subscribe(() => {
      location.reload()
    }, error => {
      console.error(error)
      alert('Error: ' + error.error.message)
    })
  }

  view(ver: any, estudiante: student) {
    this.id2 = estudiante.id
    this.dni2 = estudiante.dni
    this.lastName2 = estudiante.lastName
    this.firstName2 = estudiante.firstName
    this.email2 = estudiante.email

    this.dni3 = estudiante.dni
    this.lastName3 = estudiante.lastName
    this.firstName3 = estudiante.firstName
    this.email3 = estudiante.email
    
    this.modalService.open(ver).result.then(() => {
      if(this.dni2.trim() !== '' && this.lastName2.trim() !== '' && this.firstName2.trim() !== '' && this.email2.trim() !== '' && 
      (this.dni2.trim() !== this.dni3.trim() || this.lastName2.trim() !== this.lastName3.trim() || this.firstName2.trim() !== this.firstName3.trim() || this.email2.trim() !== this.email3.trim())) {
        let s = new student()
        s.id = this.id2
        s.dni = this.dni2
        s.lastName = this.lastName2
        s.firstName = this.firstName2
        s.email = this.email2
        s.cohort = 0
        s.status = 'activo'
        s.gender = 'masculino'
        s.adress = 'abc123'
        s.phone = '000' 

        this.studentService.update(s).subscribe(() => {
          location.reload()
        }, error => {
          console.error(error)
          alert('Error: ' + error.error.message)
        })
      }
    })
  }
}