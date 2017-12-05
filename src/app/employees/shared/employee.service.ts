import {Injectable} from '@angular/core';
import {Employee} from './employee.model';
import {Headers, Http, RequestMethod, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class EmployeeService {

  selectedEmployee: Employee;

  constructor(private http: Http) {
  }

  postEmployee(emp: Employee) {

    var body: string = JSON.stringify(emp);
    var headerOptions = new Headers({'Content-Type': 'application/json'});
    var requestOptions = new RequestOptions({method: RequestMethod.Post, headers: headerOptions});
    return this.http.post('http://localhost:8080/api/employee', body, requestOptions).map(x => x.json());
  }

}


