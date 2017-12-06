import {Component, OnInit} from '@angular/core';
import {EmployeeService} from '../shared/employee.service';
import {NgForm} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(private employeeService: EmployeeService, private  toastr: ToastrService) {
  }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();

    this.employeeService.selectedEmployee = {
      employeeId: null,
      firstName: '',
      lastName: '',
      empCode: '',
      position: '',
      office: ''
    };
  }

  onSubmit(form: NgForm) {
    if (form.value.employeeId == null) {
      this.employeeService
        .postEmployee(form.value)
        .subscribe(data => {
          this.resetForm(form);
          this.employeeService.getEmployeeList();
          this.toastr.success('New Record Added Successfully', 'Employee');
        });
    } else {
      // update

      this.employeeService
        .putEmployee(form.value)
        .subscribe(data => {
          this.resetForm(form);
          this.employeeService.getEmployeeList();
          this.toastr.info('Record Updated Successfully', 'Employee');
        });
    }
  }

}
