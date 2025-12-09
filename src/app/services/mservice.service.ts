import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment'
import { Params } from '@angular/router';
import { ListResponse, ResultResponse } from '../models/ListResponse';
import { Customer } from '../models/User';

//import { _event } from '../events/event';

@Injectable({
  providedIn: 'root'
})
export class mservice {

  private api_url = environment.api_url;

  constructor(private http: HttpClient) { }

  formatErrorMessage(error: any): string {
    //let errorMessage = error.title + "\n";
    let errorMessage = '';
    for (const key in error.errors) {
      if (error.errors.hasOwnProperty(key)) {
        //errorMessage += key + ": " + error.errors[key][0] + "<br>";
        errorMessage += error.errors[key][0] + "<br>";
      }
    }
    return errorMessage;
  }

  public get<T>(path: string, parameters: Params, authorize: boolean): Observable<any> {
    return this.http.get<ListResponse<any>>(
      `${this.api_url}${path}`,
      {
        params: parameters,
        headers: new HttpHeaders({
          'Authorization': 'Bearer '.concat(localStorage.getItem('jwt') || '')
        })
      }
    );
  }

  public put<T>(path: string, body: Record<string, any> = {}): Observable<any> {
    return this.http.put(`${this.api_url}${path}`, body);
  }

  public post<T>(path: string, parameters: HttpParams, authorize: boolean): Observable<any> {
    return this.http.post<ResultResponse>(
      `${this.api_url}${path}`, parameters,
      {
        headers: new HttpHeaders({
          'Authorization': 'Bearer '.concat(localStorage.getItem('jwt') || '')
        })
      }
    );
  }

  public delete<T>(path: string, id: string): Observable<any> {
    return this.http.delete<ResultResponse>(
      `${this.api_url}${path}?id=${id}`,
      {
        headers: new HttpHeaders({
          'Authorization': 'Bearer '.concat(localStorage.getItem('jwt') || '')
        })
      }
    );
    //return this.http.delete(`${this.api_url}${path}`);
  }

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('afile', file);

    const req = new HttpRequest('POST', `${this.api_url}/api/attachments/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  addMission(parameters: any): Observable<HttpEvent<any>> {
    return this.post('/missions/add', parameters, true)
  }

  deleteProduct(id: string): Observable<HttpEvent<any>> {
    return this.delete('/products/remove', id)
  }

  deleteIservice(id: string): Observable<HttpEvent<any>> {
    return this.delete('/services/remove', id)
  }

  deleteStockInvoice(id: string): Observable<HttpEvent<any>> {
    return this.delete('/stockInvoices/remove', id)
  }

  deleteMission(id: string): Observable<HttpEvent<any>> {
    return this.delete('/missions/remove', id)
  }

  deleteMissionServiceContract(id: string): Observable<HttpEvent<any>> {
    return this.delete('/MissionServiceContracts/remove', id)
  }

  deleteMissionService(id: string): Observable<HttpEvent<any>> {
    return this.delete('/MissionServices/remove', id)
  }

  deleteMissionProduct(id: string): Observable<HttpEvent<any>> {
    return this.delete('/MissionProducts/remove', id)
  }

  getIndices(parameters: any): Observable<ListResponse<any>> {
    return this.http.get<ListResponse<any>>(
      `${this.api_url}/indices/get`,
      { params: parameters }
    );
  }

  getStockInvoiceById(id: string): Observable<ListResponse<any>> {
    return this.http.get<ListResponse<any>>(
      `${this.api_url}/stockInvoices/getById`,
      { params: {id: id} }
    );
  }

  getIserviceById(id: string): Observable<ListResponse<any>> {
    return this.http.get<ListResponse<any>>(
      `${this.api_url}/services/getById`,
      { params: {id: id} }
    );
  }
  
  getProductById(id: string): Observable<ListResponse<any>> {
    return this.http.get<ListResponse<any>>(
      `${this.api_url}/products/getById`,
      { params: {id: id} }
    );
  }

  getProducts(parameters: any): Observable<ListResponse<any>> {
    return this.http.get<ListResponse<any>>(
      `${this.api_url}/products/get`,
      { params: parameters }
    );
  }

  getCustomerById(id: string): Observable<ListResponse<any>> {
    return this.http.get<ListResponse<any>>(
      `${this.api_url}/customers/getById`,
      { params: { id: id } }
    );
  }

  getContractorById(id: string): Observable<ListResponse<any>> {
    return this.http.get<ListResponse<any>>(
      `${this.api_url}/contractors/getById`,
      { params: { id: id } }
    );
  }

  getMissionById(id: string): Observable<ListResponse<any>> {
    return this.http.get<ListResponse<any>>(
      `${this.api_url}/missions/getById`,
      { params: { id: id } }
    );
  }

  GetMissionPaymentDistributions(id: string): Observable<ListResponse<any>> {
    return this.http.get<ListResponse<any>>(
      `${this.api_url}/missions/GetPaymentDistributions`,
      { params: { id: id } }
    );
  }

  getMissionsStockByContractor(parameters: any): Observable<ListResponse<any>> {
    return this.http.get<ListResponse<any>>(
      `${this.api_url}/missions/GetStockByContractor`,
      { params: parameters }
    );
  }

  getMissionsServicesByContractor(parameters: any): Observable<ListResponse<any>> {
    return this.http.get<ListResponse<any>>(
      `${this.api_url}/missions/GetServicesByContractor`,
      { params: parameters }
    );
  }
  
  getPaymentDistributionsByContractorAndDate(parameters: any): Observable<ListResponse<any>> {
    return this.http.get<ListResponse<any>>(
      `${this.api_url}/PaymentDistributions/ByContractorAndDate`,
      { params: parameters }
    );
  }

  getStockInvoiceItems(parameters: any): Observable<ListResponse<any>> {
    return this.http.get<ListResponse<any>>(
      `${this.api_url}/stockInvoices/GetItems`,
      { params: parameters }
    );
  }

  getMissionsContractsByContractor(parameters: any): Observable<ListResponse<any>> {
    return this.http.get<ListResponse<any>>(
      `${this.api_url}/missions/getContractsByContractor`,
      { params: parameters }
    );
  }

  getMissionsLite(parameters: any): Observable<ListResponse<any>> {
    return this.http.get<ListResponse<any>>(
      `${this.api_url}/missions/getLite`,
      { params: parameters }
    );
  }

  getAnimalById(id: string): Observable<ListResponse<any>> {
    return this.http.get<ListResponse<any>>(
      `${this.api_url}/animals/getById`,
      { params: { id: id } }
    );
  }

  getAppointmentBookingById(id: string): Observable<ListResponse<any>> {
    return this.http.get<ListResponse<any>>(
      `${this.api_url}/appointmentBookings/getById`,
      { params: { id: id } }
    );
  }

  getAppointmentBookings(parameters: any): Observable<ListResponse<any>> {
    return this.http.get<ListResponse<any>>(
      `${this.api_url}/appointmentBookings/get`,
      { params: parameters }
    );
  }

  getAnimals(parameters: any): Observable<ListResponse<any>> {
    return this.http.get<ListResponse<any>>(
      `${this.api_url}/animals/get`,
      { params: parameters }
    );
  }

  getPhysicalExaminations(parameters: any): Observable<ListResponse<any>> {
    return this.http.get<ListResponse<any>>(
      `${this.api_url}/PhysicalExaminations/get`,
      { params: parameters }
    );
  }

  getAnimalFollowups(parameters: any): Observable<ListResponse<any>> {
    return this.http.get<ListResponse<any>>(
      `${this.api_url}/AnimalFollowups/get`,
      { params: parameters }
    );
  }

  getMedicalExaminationResults(parameters: any): Observable<ListResponse<any>> {
    return this.http.get<ListResponse<any>>(
      `${this.api_url}/MedicalExaminationResults/get`,
      { params: parameters }
    );
  }

  getCustomers(parameters: any): Observable<ListResponse<any>> {
    return this.http.get<ListResponse<any>>(
      `${this.api_url}/customers/get`,
      { params: parameters }
    );
  }

  getContractors(parameters: any): Observable<ListResponse<any>> {
    return this.http.get<ListResponse<any>>(
      `${this.api_url}/contractors/get`,
      { params: parameters }
    );
  }

  GetMissionsBySerialNos(parameters: any): Observable<ListResponse<any>> {
    return this.http.get<ListResponse<any>>(
      `${this.api_url}/missions/GetBySerialNos`,
      { params: parameters }
    );
  }

  getMissions(parameters: any): Observable<ListResponse<any>> {
    return this.http.get<ListResponse<any>>(
      `${this.api_url}/missions/get`,
      { params: parameters }
    );
  }

  getFollowupMissions(parameters: any): Observable<ListResponse<any>> {
    return this.http.get<ListResponse<any>>(
      `${this.api_url}/missions/GetFollowup`,
      { params: parameters }
    );
  }

  
  getMissionsBySwatNo(parameters: any): Observable<ListResponse<any>> {
    return this.http.get<ListResponse<any>>(
      `${this.api_url}/missions/GetBySwatNo`,
      { params: parameters }
    );
  }

  getIservices(parameters: any): Observable<ListResponse<any>> {
    return this.http.get<ListResponse<any>>(
      `${this.api_url}/services/get`,
      { params: parameters }
    );
  }

  getMissionsCount(parameters: any): Observable<number> {
    return this.http.get<number>(
      `${this.api_url}/missions/getCount`,
      { params: parameters }
    );
  }

  getFollowupMissionsCount(parameters: any): Observable<number> {
    return this.http.get<number>(
      `${this.api_url}/missions/GetFollowupCount`,
      { params: parameters }
    );
  }

  getProductsCount(parameters: any): Observable<number> {
    return this.http.get<number>(
      `${this.api_url}/products/getCount`,
      { params: parameters }
    );
  }

  getIservicesCount(parameters: any): Observable<number> {
    return this.http.get<number>(
      `${this.api_url}/services/getCount`,
      { params: parameters }
    );
  }

  getTreatmentPrescriptions(parameters: any): Observable<ListResponse<any>> {
    return this.http.get<ListResponse<any>>(
      `${this.api_url}/TreatmentPrescriptions/get`,
      { params: parameters }
    );
  }

  getCustomersAutoComplete(term?: string): Observable<Customer[]> {
    //return this.get('/clinics/getAutoComplete', {name: term, status: '1', page: 1, pageSize: 20}, true)
    return this.get('/customers/get', { name: term, status: '1', page: 1, pageSize: 20 }, true)
  }

  UpdateCheckedUserRoles(user_id:string, parameters: any): Observable<HttpEvent<any>> {
    return this.put(`/UserRoles/UpdateCheckedUserRoles/${user_id}`, parameters)
  }

  saveCustomer(parameters: any): Observable<HttpEvent<any>> {
    return this.put('/customers/save', parameters)
  }

  saveProduct(parameters: any): Observable<HttpEvent<any>> {
    return this.put('/products/save', parameters)
  }

  saveIservice(parameters: any): Observable<HttpEvent<any>> {
    return this.put('/services/save', parameters)
  }

  saveStockInvoice(parameters: any): Observable<HttpEvent<any>> {
    return this.put('/stockInvoices/save', parameters)
  }

  saveContractor(parameters: any): Observable<HttpEvent<any>> {
    return this.put('/contractors/save', parameters)
  }

  saveMission(parameters: any, updateDate: boolean): Observable<HttpEvent<any>> {
    return this.put(`/missions/save?updateDate=${updateDate}`, parameters)
  }

  saveFollowupMission(parameters: any, updateDate: boolean=false): Observable<HttpEvent<any>> {
    return this.put(`/missions/saveFollowup?updateDate=${updateDate}`, parameters)
  }

  saveMissions(parameters: any): Observable<HttpEvent<any>> {
    return this.put('/missions/saveAll', parameters)
  }

  saveAnimal(parameters: any): Observable<HttpEvent<any>> {
    return this.put('/animals/save', parameters)
  }

  saveAnimals(parameters: any): Observable<HttpEvent<any>> {
    return this.put('/animals/saveAll', parameters)
  }

  saveAppointmentBooking(parameters: any): Observable<HttpEvent<any>> {
    return this.put('/appointmentBookings/save', parameters)
  }

  addStockInvoice(parameters: any): Observable<HttpEvent<any>> {
    return this.post('/stockInvoices/add', parameters, true)
  }

  addProduct(parameters: any): Observable<HttpEvent<any>> {
    return this.post('/products/add', parameters, true)
  }

  addIservice(parameters: any): Observable<HttpEvent<any>> {
    return this.post('/services/add', parameters, true)
  }

  addCustomer(parameters: any): Observable<HttpEvent<any>> {
    return this.post('/customers/add', parameters, true)
  }

  addContractor(parameters: any): Observable<HttpEvent<any>> {
    return this.post('/contractors/add', parameters, true)
  }

  addUser(parameters: any): Observable<HttpEvent<any>> {
    return this.post('/users/add', parameters, true)
  }

  addAppointmentBooking(parameters: any): Observable<HttpEvent<any>> {
    return this.post('/appointmentBookings/add', parameters, true)
  }

  addPhysicalExamination(parameters: any): Observable<HttpEvent<any>> {
    return this.post('/PhysicalExaminations/add', parameters, true)
  }

  addAnimalFollowup(parameters: any): Observable<HttpEvent<any>> {
    return this.post('/AnimalFollowups/add', parameters, true)
  }

  addMedicalExaminationResult(parameters: any): Observable<HttpEvent<any>> {
    return this.post('/MedicalExaminationResults/add', parameters, true)
  }

  addTreatmentPrescriptionsRange(parameters: any): Observable<HttpEvent<any>> {
    return this.post('/TreatmentPrescriptions/addRange', parameters, true)
  }

  getStockInvoices(parameters: any): Observable<ListResponse<any>> {
    return this.http.get<ListResponse<any>>(
      `${this.api_url}/stockInvoices/`,
      { params: parameters }
    );
  }

  getUsers(parameters: any): Observable<HttpEvent<any>> {
    return this.get('/users/get', parameters, true)
  }

  getStages(parameters: any): Observable<HttpEvent<any>> {
    return this.get('/stages/get', parameters, true)
  }

  GetUsersByRole(parameters: any): Observable<HttpEvent<any>> {
    return this.get('/users/GetByRole', parameters, true)
  }

  getNoteOnUsers(parameters: any): Observable<HttpEvent<any>> {
    return this.get('/users/getNoteOnUsers', parameters, true)
  }

  addNewSubscription(parameters: any): Observable<HttpEvent<any>> {
    return this.post('/subscriptions/add', parameters, true)
  }

  sendSms(parameters: any): Observable<HttpEvent<any>> {
    return this.post('/sms/send', parameters, true)
  }

  saveNoteOnUser(parameters: any): Observable<HttpEvent<any>> {
    return this.post('/users/SaveNoteOnUser', parameters, true)
  }

  getSmss(parameters: any): Observable<HttpEvent<any>> {
    return this.get('/sms/get', parameters, true)
  }

  getAreas(parameters: any): Observable<HttpEvent<any>> {
    return this.get('/areas/get', parameters, true)
  }

  vouchers_pay(payment: any): Observable<HttpEvent<ResultResponse>> {
    return this.post<ResultResponse>('/vouchers/pay', payment, true)
  }

  getUserRoles(parameters: any): Observable<HttpEvent<any>> {
    return this.get('/userRoles/get', parameters, true)
  }

  getCheckedUserRoles(parameters: any): Observable<HttpEvent<any>> {
    return this.get('/userRoles/GetChecked', parameters, true)
  }

  getVouchers(parameters: any): Observable<HttpEvent<any>> {
    return this.get('/vouchers/get', parameters, true)
  }

  getServices(parameters: any): Observable<HttpEvent<any>> {
    return this.get('/services/get', parameters, true)
  }

  getSubscribers(parameters: any): Observable<HttpEvent<any>> {
    return this.get('/subscribers/get', parameters, true)
  }

  getSubscriptions(parameters: any): Observable<HttpEvent<any>> {
    return this.get('/subscriptions/get', parameters, true)
  }

  getSubscriptionPppoes(parameters: any): Observable<HttpEvent<any>> {
    return this.get('/subscriptions/get_pppoes', parameters, true)
  }

  getCutoffList(parameters: any): Observable<HttpEvent<any>> {
    return this.get('/subscriptions/getCutoffList', parameters, true)
  }

  getIpAddress(): Observable<HttpEvent<any>> {
    const req = new HttpRequest('GET', `http://api.ipify.org/?format=json`, { format: 'json' }, {
      responseType: 'json'
    });

    return this.http.request(req);
  }

  getUserInfo(): Observable<HttpEvent<any>> {
    const req = new HttpRequest('POST', `${this.api_url}/auth/user-info`, {}, {
      responseType: 'json'
    });

    return this.http.request(req);
  }

  saveEvent(parameters: any): Observable<HttpEvent<any>> {
    const req = new HttpRequest('POST', `${this.api_url}/api/Events/save`, parameters, {
      responseType: 'json'
    });

    return this.http.request(req);
  }
}


/*import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MserviceService {

  constructor() { }
}*/
