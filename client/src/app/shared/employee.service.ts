import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { catchError,throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private fb:FormBuilder,private http:HttpClient) { }
  
  readonly baseUrl='http://localhost:3000/api/employees';

  employeeForm=this.fb.group({
  _id:[null],
  fullName:['',Validators.required],
  position:['',Validators.required],
  location:['',],
  salary:['',Validators.required],
  });

  postEmployee(){
    return this.http.post(this.baseUrl,this.employeeForm.value)
    .pipe(catchError(this.errorHandler));
  }
  
  private errorHandler(error:HttpErrorResponse){
    if (error.status==0){
      console.error('An error occurred:',error.error.message);
    }
      else{
        
      console.error(
        `Backend returned code ${error.status},`+
        `body was: ${error.error}`
      );
      }
    return throwError(()=>new Error('Something bad happened; please try again later.'))
  }

}

