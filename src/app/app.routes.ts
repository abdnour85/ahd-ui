import { Routes } from '@angular/router';
import { SiteLayoutComponent } from './_layout/site-layout/site-layout.component';
import { HomeComponent } from './home/home.component';
import { AppLayoutComponent } from './_layout/app-layout/app-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CustomersListComponent } from './customers/list/list.component';
import { CustomersAddComponent } from './customers/add/add.component';
import { CustomersSaveComponent } from './customers/save/save.component';
import { authGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { MissionsAddComponent } from './missions/add/missions-add.component';
import { MissionsListComponent } from './missions/list/missions-list.component';
import { MissionsSaveComponent } from './missions/save/missions-save.component';
import { ContractorsListComponent } from './contractors/list/list.component';
import { ContractorsAddComponent } from './contractors/add/add.component';
import { ContractorsSaveComponent } from './contractors/save/save.component';
import { ReportsMissionComponent } from './reports/mission/mission.component';
import { StockInvoicesListComponent } from './stockInvoices/list/list.component';
import { StockInvoicesAddComponent } from './stockInvoices/add/add.component';
import { StockInvoicesSaveComponent } from './stockInvoices/save/save.component';
import { ProductsListComponent } from './products/list/list.component';
import { ProductsAddComponent } from './products/add/add.component';
import { ProductsSaveComponent } from './products/save/save.component';
import { IservicesListComponent } from './iservices/list/list.component';
import { IservicesAddComponent } from './iservices/add/add.component';
import { IservicesSaveComponent } from './iservices/save/save.component';
import { MissionsUpdateTaskStateComponent } from './missions/update-task-state/update-task-state.component';
import { UsersListComponent } from './users/users-list/users-list.component';
import { UsersAddComponent } from './users/users-add/users-add.component';
import { UserRolesListComponent } from './userRoles/user-roles-list/user-roles-list.component';
import { MissionsFollowupSaveComponent } from './missions/missions-followup-save/missions-followup-save.component';
import { MissionsFollowupListComponent } from './missions/missions-followup-list/missions-followup-list.component';
import { MissionsViewComponent } from './missions/view/missions-view.component';
import { ReportsContractorProductsComponent } from './reports/contractor-products/products.component';
import { ReportsIndexComponent } from './reports/index/index.component';
import { ReportsContractorContractsComponent } from './reports/contractor-contracts/contracts.component';
import { ReportsMissionsComponent } from './reports/missions/missions.component';
import { ReportsStockInvoiceItemsComponent } from './reports/stock-invoice-items/stock-invoice-items.component';
import { ReportsConntractorServicesComponent } from './reports/conntractor-services/conntractor-services.component';
import { ReportsMissionsServicesComponent } from './reports/missions-services/missions-services.component';
import { MissionPaymentDistributionsComponent } from './missions/payment-distributions/payment-distributions.component';
import { AccountantMissionsListComponent } from './accountant/accountant-missions-list/missions-list.component';
import { AccountantReportsIndexComponent } from './accountant/reports/index/index.component';
import { ContractorBusinessStatementComponent } from './accountant/reports/contractor-business-statement/contractor-business-statement.component';
import { ReportsProductsComponent } from './reports/products/products.component';
import { MissionsAdjustmentsSaveComponent } from './missions/adjustments-save/adjustments-save.component';
import { PaymentDestributionsPopulateComponent } from './components/payment-distributions/payment-destributions-populate/populate.component';

export const routes: Routes = [
  {
    path: '',
    //component: SiteLayoutComponent,
    component: AppLayoutComponent,
    children: [
      { path: '', component: DashboardComponent, canActivate: [authGuard] },
    ],
  },
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
      { path: 'users-list', component: UsersListComponent, canActivate: [authGuard] },
      { path: 'users-add', component: UsersAddComponent, canActivate: [authGuard] },
      //{ path: 'users-save', component: CustomersSaveComponent, canActivate: [authGuard] },            
      { path: 'userRoles-list', component: UserRolesListComponent, canActivate: [authGuard] },
      { path: 'customers-list', component: CustomersListComponent, canActivate: [authGuard] },
      { path: 'customers-add', component: CustomersAddComponent, canActivate: [authGuard] },
      { path: 'customers-save', component: CustomersSaveComponent, canActivate: [authGuard] },
      { path: 'contractors-list', component: ContractorsListComponent, canActivate: [authGuard] },
      { path: 'contractors-add', component: ContractorsAddComponent, canActivate: [authGuard] },
      { path: 'contractors-save', component: ContractorsSaveComponent, canActivate: [authGuard] },
      { path: 'accountant-missions-list', component: AccountantMissionsListComponent, canActivate: [authGuard] },
      { path: 'mission-adjustments-save/:id', component: MissionsAdjustmentsSaveComponent, canActivate: [authGuard] },
      { path: 'accountant-mission-paymentDistributions', component: MissionPaymentDistributionsComponent, canActivate: [authGuard] },
      { path: 'accountant-reports', component: AccountantReportsIndexComponent, canActivate: [authGuard] },
      { path: 'missions-list', component: MissionsListComponent, canActivate: [authGuard] },
      { path: 'missions-add', component: MissionsAddComponent, canActivate: [authGuard] },
      { path: 'missions-save', component: MissionsSaveComponent, canActivate: [authGuard] },
      { path: 'missions-view', component: MissionsViewComponent, canActivate: [authGuard] },
      { path: 'missions-followup-save', component: MissionsFollowupSaveComponent, canActivate: [authGuard] },
      { path: 'missions-followup-list', component: MissionsFollowupListComponent, canActivate: [authGuard] },
      { path: 'missions-update-task-state', component: MissionsUpdateTaskStateComponent, canActivate: [authGuard] },
      { path: 'stockInvoices-list', component: StockInvoicesListComponent, canActivate: [authGuard] },
      { path: 'stockInvoices-add', component: StockInvoicesAddComponent, canActivate: [authGuard] },
      { path: 'stockInvoices-save', component: StockInvoicesSaveComponent, canActivate: [authGuard] },
      { path: 'products-list', component: ProductsListComponent, canActivate: [authGuard] },
      { path: 'products-add', component: ProductsAddComponent, canActivate: [authGuard] },
      { path: 'products-save', component: ProductsSaveComponent, canActivate: [authGuard] },
      { path: 'services-list', component: IservicesListComponent, canActivate: [authGuard] },
      { path: 'services-add', component: IservicesAddComponent, canActivate: [authGuard] },
      { path: 'services-save', component: IservicesSaveComponent, canActivate: [authGuard] },
      { path: 'reports', component: ReportsIndexComponent, canActivate: [authGuard] },
      { path: 'payment-distributions-populate', component: PaymentDestributionsPopulateComponent, canActivate: [authGuard] },
    ]
  },
  //no layout routes
  { path: 'login', component: LoginComponent },
  { path: 'reports-mission', component: ReportsMissionComponent },
  { path: 'reports-contractorProducts', component: ReportsContractorProductsComponent },
  { path: 'reports-contractorServices', component: ReportsConntractorServicesComponent },
  { path: 'reports-contractorContracts', component: ReportsContractorContractsComponent },
  { path: 'reports-missions', component: ReportsMissionsComponent },
  { path: 'reports-missions-services', component: ReportsMissionsServicesComponent },
  { path: 'reports-stock-invoice-items', component: ReportsStockInvoiceItemsComponent },
  { path: 'reports-contractor-business-statement', component: ContractorBusinessStatementComponent },
  { path: 'reports-products', component: ReportsProductsComponent }
  //reports-products
];

