import { VerificationScreenComponent } from './new-affiliation/verification-screen/verification-screen.component';
import { RequestComponent } from './new-affiliation/request/request.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PosRequestComponent } from './pos-request/pos-request.component';
import { PosRequestStepperComponent } from './pos-request-stepper/pos-request-stepper.component';
import { BranchAffiliationComponent } from './branch-affiliation/branch-affiliation.component';
import { AdditionalFacilityComponent } from './additional-facility/additional-facility.component';
import { ExtentionComponent } from './extention/extention.component';
import { BranchFormComponent } from './forms/branch-form/branch-form.component';
import { AoEncoderComponent } from './new-affiliation/ao-encoder/ao-encoder.component';
import { MaefFormComponent } from './forms/maef-form/maef-form.component';
import { HomeScreenComponent } from './home-screen/home-screen.component';
import { BranchListComponent } from './branch-list/branch-list.component';
import { NewAffiliationSumComponent } from './new-affiliation-sum/new-affiliation-sum.component';
import { OcularInspectionFormComponent } from './forms/ocular-inspection-form/ocular-inspection-form.component';
import { BranchListAttachmentComponent } from './branch-list-attachment/branch-list-attachment.component';
import { AoCheckerComponent } from './new-affiliation/ao-checker/ao-checker.component';
import { AoCheckingComponent } from './ao-checking/ao-checking.component';
import { AwrFormComponent } from './forms/awr-form/awr-form.component';
import { RequestFormComponent } from './forms/request-form/request-form.component';
import { PosFormComponent } from './forms/pos-form/pos-form.component';
import { DocumentCheckListComponent } from './document-check-list/document-check-list.component';
import { DocumentCheckListFormComponent } from './forms/document-check-list-form/document-check-list-form.component';
import { AoCheckerDashboardComponent } from './dashboard/ao-checker-dashboard/ao-checker-dashboard.component';
import { AoEncoderDashboardComponent } from './dashboard/ao-encoder-dashboard/ao-encoder-dashboard.component';
import { ApproverDashboardComponent } from './dashboard/approver-dashboard/approver-dashboard.component';
import { MauEncoderDashboardComponent } from './dashboard/mau-encoder-dashboard/mau-encoder-dashboard.component';
import { MauOfficerDashboardComponent } from './dashboard/mau-officer-dashboard/mau-officer-dashboard.component';
import { MdcsUserDashboardComponent } from './dashboard/mdcs-user-dashboard/mdcs-user-dashboard.component';
import { MdmUserDashboardComponent } from './dashboard/mdm-user-dashboard/mdm-user-dashboard.component';
import { MqrDashboardComponent } from './dashboard/mqr-dashboard/mqr-dashboard.component';
import { PsServicingDashboardComponent } from './dashboard/ps-servicing-dashboard/ps-servicing-dashboard.component';
import { MauOfficerComponent } from './new-affiliation/mau-officer/mau-officer.component';
import { ApproverComponent } from './new-affiliation/approver/approver.component';
import { BranchInfoComponent } from './branch-info/branch-info.component';
import { BranchListAttachmentPOSComponent } from './branch-list-attachment-pos/branch-list-attachment-pos.component';
import { MidFormComponent } from './forms/mid-form/mid-form.component';
import { MidComponent } from './mid/mid.component';
import { MauEncoderComponent } from './new-affiliation/mau-encoder/mau-encoder.component';
import { MauCheckerComponent } from './new-affiliation/mau-checker/mau-checker.component';
import { MdmUserComponent } from './new-affiliation/mdm-user/mdm-user.component';
import { MdcsUserComponent } from './new-affiliation/mdcs-user/mdcs-user.component';
import { HistoryModalComponent } from './modal/history-modal/history-modal.component';
import { MidFormModalComponent } from './modal/mid-form-modal/mid-form-modal.component';
import { ParameterMaintenanceComponent } from './administration/parameter-maintenance/parameter-maintenance/parameter-maintenance.component';
import { DocumentChecklistMaintenanceComponent } from './administration/document-checklist/document-checklist-maintenance/document-checklist-maintenance/document-checklist-maintenance.component';

import { BuMaintenanceComponent } from './administration/bu-maintenance/bu-maintenance/bu-maintenance.component';
import { BuMaintenanceFormComponent } from './administration/bu-maintenance/bu-maintenance-form/bu-maintenance-form.component';
import { AoMaintenanceComponent } from './administration/ao-maintenance/ao-maintenance/ao-maintenance.component';
import { ServiceFeeContractComponent } from './administration/service-fee-contract/service-fee-contract/service-fee-contract.component';
import { ServiceFeeContractFormComponent } from './administration/service-fee-contract/service-fee-contract-form/service-fee-contract-form.component';
import { PsServicingComponent } from './new-affiliation/ps-servicing/ps-servicing.component';
import { BranchListAttachmentPOSRequestComponent } from './branch-list-attachment-posrequest/branch-list-attachment-posrequest.component';
import { DocumentChecklistConfigurationComponent } from './administration/document-checklist/document-checklist-configuration/document-checklist-configuration/document-checklist-configuration.component';
import { DocumentCheckListFormRequestLevelComponent } from './forms/document-check-list-form-request-level/document-check-list-form-request-level.component';
import { MqrUserComponent } from './new-affiliation/mqr-user/mqr-user.component';
import { DefaultMidMaintenanceComponent } from './administration/default-mid-maintenance/default-mid-maintenance/default-mid-maintenance.component';
import { MidRequestComponent } from './mid-request/mid-request.component';
import { DebitTidComponent } from './debit-tid/debit-tid.component';
import { CustomerProfileComponent } from './customer-profile/customer-profile.component';
import { FmLeAoEncoderComponent } from './file-maintenance/legal-entity/fm-le-ao-encoder/fm-le-ao-encoder.component';
import { FmBrAoEncoderComponent } from './file-maintenance/branch/fm-br-ao-encoder/fm-br-ao-encoder.component';
import { FmMidAoEncoderComponent } from './file-maintenance/mid/fm-mid-ao-encoder/fm-mid-ao-encoder.component';
import { MdcsEncoderDashboardComponent } from './dashboard/mdcs-encoder-dashboard/mdcs-encoder-dashboard.component';
import { MdcsCheckerDashboardComponent } from './dashboard/mdcs-checker-dashboard/mdcs-checker-dashboard.component';
import { CustomerProfileListComponent } from './customer-profile-list/customer-profile-list.component';
import { MdcsEncoderComponent } from './new-affiliation/mdcs-encoder/mdcs-encoder.component';
import { MdcsCheckerComponent } from './new-affiliation/mdcs-checker/mdcs-checker.component';
import { MamVerificationScreenFormComponent } from './forms/mam-verification-screen-form/mam-verification-screen-form.component';
import { PosTerminalBrandListComponent } from './pos-terminal-brand-list/pos-terminal-brand-list.component';
import { PosListContainerComponent } from './pos-list-container/pos-list-container.component';
import { PosListComponent } from './pos-list/pos-list.component';



const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeScreenComponent },
  { path: 'pos/:mode', component: PosRequestComponent },
  {
    path: 'posStep/:mode', component: PosRequestStepperComponent,
    children: [
      { path: '', component: BranchListAttachmentPOSRequestComponent, outlet: 'branchPOSRequest' },
      { path: 'POS/:id?', component: PosFormComponent, outlet: 'branchPOSRequest' },
      { path: '', component: MidRequestComponent, outlet: 'midRequest' },
      { path: 'mid/:id?', component: MidFormComponent, outlet: 'midRequest' },
      { path: '', component: DocumentCheckListComponent, outlet: 'documentChecklist' },
      { path: 'dcl/:docMode/:id', component: DocumentCheckListFormComponent, outlet: 'documentCheckList' },
    ]
  },
  {
    path: 'ba/:mode', component: BranchAffiliationComponent,
    children: [
      // {
      //   path: '', component: CustomerProfileListComponent, outlet: 'customerProfile', children: [
      //     { path: 'custProfile/:id?', component: CustomerProfileComponent, outlet: 'customerProfile' },
      //   ]
      // },

      // { path: '', redirectTo: 'branchList', pathMatch: 'full' }
      { path: '', component: BranchListComponent, outlet: 'branch' },
      {
        path: 'branch/:mode/:id', component: BranchFormComponent, outlet: 'branch', children: [
          { path: '', component: MidComponent, outlet: 'mid' }
        ]
      },
      {
        path: 'branch/:mode', component: BranchFormComponent, outlet: 'branch', children: [
          { path: '', component: MidComponent, outlet: 'mid' }
        ]
      },
      { path: '', component: CustomerProfileListComponent, outlet: 'customerProfile' },
      { path: 'custProfile/:id?', component: CustomerProfileComponent, outlet: 'customerProfile' },
      { path: '', component: BranchListAttachmentComponent, outlet: 'branchOIF' },
      { path: 'OIF/:id?', component: OcularInspectionFormComponent, outlet: 'branchOIF' },
      { path: '', component: BranchListAttachmentPOSComponent, outlet: 'branchPOS' },
      { path: 'POS/:id?', component: PosFormComponent, outlet: 'branchPOS' },
      { path: 'MID/:form', component: MidComponent, outlet: 'mid' },
      { path: '', component: DocumentCheckListComponent, outlet: 'documentCheckList' },
      { path: 'dcl/:docMode/:id', component: DocumentCheckListFormComponent, outlet: 'documentCheckList' },
    ]
  },
  {
    path: 'additionalFacility/:mode', component: AdditionalFacilityComponent,
    children: [
      { path: '', component: BranchListAttachmentPOSRequestComponent, outlet: 'branchPOSRequest' },
      { path: 'POS/:id?', component: PosFormComponent, outlet: 'branchPOSRequest' },
      { path: '', component: MidRequestComponent, outlet: 'midRequest' },
      { path: 'mid/:id?', component: MidFormComponent, outlet: 'midRequest' },
      { path: '', component: DocumentCheckListComponent, outlet: 'documentChecklist' },
      { path: 'dcl/:docMode/:id', component: DocumentCheckListFormComponent, outlet: 'documentCheckList' },
    ]
  },
  { path: 'ext/:mode', component: ExtentionComponent },
  { path: 'maef', component: MaefFormComponent },
  { path: 'na/approver/:mode/:id', component: ApproverComponent },
  { path: 'branch/:mode', component: BranchFormComponent },
  { path: 'branchinfo', component: BranchInfoComponent },
  { path: 'branchOIF', component: OcularInspectionFormComponent },
  { path: 'na/aoEncoder/new', component: AoEncoderComponent },
  { path: 'na/aoEncoder/:id', component: AoEncoderComponent },
  { path: 'na/aoChecker/:id', component: AoCheckerComponent },
  { path: 'na/mdcsEncoder/:id', component: MdcsEncoderComponent },
  { path: 'na/mdcsChecker/:id', component: MdcsCheckerComponent },
  {
    path: 'na/aoEncoder/:mode', component: AoEncoderComponent,
    children: [
      { path: '', component: BranchListComponent, outlet: 'branch' },
      {
        path: 'branch/:mode/:id', component: BranchFormComponent, outlet: 'branch', children: [
          { path: '', component: MidComponent, outlet: 'mid' }
        ]
      },
      {
        path: 'branch/:mode', component: BranchFormComponent, outlet: 'branch', children: [
          { path: '', component: MidComponent, outlet: 'mid', data: { showAction: true } }
        ]
      },
      { path: '', component: BranchListAttachmentComponent, outlet: 'branchOIF' },
      { path: 'OIF/:id?', component: OcularInspectionFormComponent, outlet: 'branchOIF' },
      { path: '', component: BranchListAttachmentPOSComponent, outlet: 'branchPOS' },
      {
        path: 'POS/:id?', component: PosListContainerComponent, outlet: 'branchPOS', children: [
          {
            path: '', component: PosListComponent, outlet: 'listContainer', data: { showAdd: true }, children: [
              { path: '', component: MidComponent, outlet: 'mid', data: { showAction: true } }
            ]
          }
        ]
      },
      { path: 'MID/:form', component: MidComponent, outlet: 'mid', data: { showAction: false } },
      { path: '', component: DocumentCheckListComponent, outlet: 'documentCheckList' },
      { path: 'dcl/:docMode/:id', component: DocumentCheckListFormComponent, outlet: 'documentCheckList' },
      { path: 'dcl/addDocument', component: DocumentCheckListFormRequestLevelComponent, outlet: 'documentCheckList' }
    ]
  },
  { path: 'newAffSum', component: NewAffiliationSumComponent },
  { path: 'home/:userGroup', component: HomeScreenComponent },
  { path: 'oif', component: OcularInspectionFormComponent },
  { path: 'oifForm', component: OcularInspectionFormComponent },
  { path: 'aoDashboard', component: AoCheckerDashboardComponent },

  // {
  //   path: 'aoChecking', component: AoCheckingComponent,
  //   children: [
  //     // { path: '', redirectTo: 'branchList', pathMatch: 'full' }
  //     {
  //       path: '', component: BranchListComponent,
  //       // data: { detailsRoute: '[{ outlets: {branch: ["branch/update/",1] } }]' },
  //       outlet: 'branch'
  //     },
  //     {
  //       path: 'branch/:mode/:id', component: BranchFormComponent,
  //       outlet: 'branch'

  //     },
  //     {
  //       path: 'branch/:mode', component: BranchFormComponent,
  //       outlet: 'branch'
  //     },
  //     {
  //       path: '', component: BranchListAttachmentComponent,
  //       data: { detailsRoute: 'branch/update/' },
  //       outlet: 'branchOIF'
  //     },
  //     {
  //       path: 'OIF/:id', component: OcularInspectionFormComponent,
  //       outlet: 'branchOIF'
  //     },
  //   ]
  // },

  { path: 'awr', component: AwrFormComponent },
  { path: 'requestForm', component: RequestFormComponent },
  { path: 'posForm', component: PosFormComponent },
  { path: 'newAffSum', component: NewAffiliationSumComponent },
  { path: 'home/:userGroup', component: HomeScreenComponent },
  { path: 'oif', component: OcularInspectionFormComponent },
  { path: 'oifForm', component: OcularInspectionFormComponent },
  ////////////// DASHBOARD ///////////////////
  { path: 'aoCheckerDashboard', component: AoCheckerDashboardComponent },
  { path: 'aoEncoderDashboard', component: AoEncoderDashboardComponent },
  { path: 'apprDashboard', component: ApproverDashboardComponent },
  { path: 'mauEncoderDashboard', component: MauEncoderDashboardComponent },
  { path: 'mauOfficerDashboard', component: MauOfficerDashboardComponent },
  { path: 'mdcsEncoderDashboard', component: MdcsEncoderDashboardComponent },
  { path: 'mdcsCheckerDashboard', component: MdcsCheckerDashboardComponent },
  { path: 'mdcsUserDashboard', component: MdcsUserDashboardComponent },
  { path: 'mdmUserDashboard', component: MdmUserDashboardComponent },
  { path: 'mqrDashboard', component: MqrDashboardComponent },
  { path: 'pssDashboard', component: PsServicingDashboardComponent },
  ///////////////////////////////////////////
  {
    path: 'na/aoChecker', component: AoCheckerComponent,
    children: [
      { path: '', component: BranchListComponent, outlet: 'branch' },
      {
        path: 'branch/:mode/:id', component: BranchFormComponent, outlet: 'branch', children: [
          { path: '', component: MidComponent, outlet: 'mid' }
        ]
      },
      {
        path: 'branch/:mode', component: BranchFormComponent, outlet: 'branch', children: [
          { path: '', component: MidComponent, outlet: 'mid', data: { showAction: true } }
        ]
      },
      { path: '', component: BranchListAttachmentComponent, outlet: 'branchOIF' },
      { path: 'OIF/:id?', component: OcularInspectionFormComponent, outlet: 'branchOIF' },
      { path: '', component: BranchListAttachmentPOSComponent, outlet: 'branchPOS' },
      {
        path: 'POS/:id?', component: PosListContainerComponent, outlet: 'branchPOS', children: [
          {
            path: '', component: PosListComponent, outlet: 'listContainer', data: { showAdd: false }, children: [
              { path: '', component: MidComponent, outlet: 'mid', data: { showAction: true } }
            ]
          }
        ]
      },
      { path: 'MID/:form', component: MidComponent, outlet: 'mid' },
      { path: '', component: DocumentCheckListComponent, outlet: 'documentCheckList' },
      { path: 'dcl/:docMode/:id', component: DocumentCheckListFormComponent, outlet: 'documentCheckList' },
    ]
  },
  {
    path: 'na/mauEncoder', component: MauEncoderComponent,
    children: [
      { path: '', component: BranchListComponent, outlet: 'branch' },
      { path: 'branch/:mode/:id', component: BranchFormComponent, outlet: 'branch' },
      { path: 'branch/:mode', component: BranchFormComponent, outlet: 'branch' }
    ]
  },
  {
    path: 'na/mauChecker', component: MauCheckerComponent,
    children: [
      { path: '', component: BranchListComponent, outlet: 'branch' },
      { path: 'branch/:mode/:id', component: BranchFormComponent, outlet: 'branch' },
      { path: 'branch/:mode', component: BranchFormComponent, outlet: 'branch' }
    ]
  },
  { path: 'na/mauOfficer/:id', component: MauOfficerComponent }, // 1
  { path: 'na/mauEncoder/:id', component: MauOfficerComponent }, //story7
  { path: 'na/mdcsUser', component: MdcsUserComponent },
  {
    path: 'na/mdmUser', component: MdmUserComponent, children: [
      { path: '', component: DocumentCheckListComponent, outlet: 'docForm' },
      { path: 'docForm', component: DocumentCheckListFormRequestLevelComponent, outlet: 'docForm' }
    ]
  },
  { path: 'na/mdcsEncoder/:mode', component: MdcsEncoderComponent },
  { path: 'na/mdcsChecker/:mode', component: MdcsCheckerComponent },
  // { path: 'na/mdcsUser', component: MdcsUserComponent },
  { path: 'na/psServicing', component: PsServicingComponent },
  { path: 'aoChecking', component: AoCheckingComponent },
  { path: 'posForm', component: PosFormComponent },
  { path: 'newAffSum', component: NewAffiliationSumComponent },
  { path: 'home/:userGroup', component: HomeScreenComponent },
  { path: 'oif', component: OcularInspectionFormComponent },
  {
    path: 'na/mqrUser', component: MqrUserComponent,
    children: [
      { path: 'MID/:form', component: MidComponent, outlet: 'mid' }
    ]
  },
  { path: 'fm/legalEntity/aoEncoder', component: FmLeAoEncoderComponent },
  { path: 'fm/branch/aoEncoder', component: FmBrAoEncoderComponent },
  { path: 'fm/mid/aoEncoder', component: FmMidAoEncoderComponent },
  ////////////////////// Data Management start-> /////////////////////////
  // { path: 'dm/ao', component: AoMaintenanceComponent },
  // { path: 'dm/ao/:mode', component: AoMaintenanceFormComponent },
  // { path: 'dm/ao/:mode/:id', component: AoMaintenanceFormComponent },
  // { path: 'dm/bu', component: BuMaintenanceComponent },
  // { path: 'dm/bu/:mode', component: BuMaintenanceFormComponent },
  // { path: 'dm/bu/:mode/:id', component: BuMaintenanceFormComponent },
  /////////////////////  <-end  Data Management  /////////////////////////


  ///////////////////// FOR TESTING PURPOSES ///////////////////////
  { path: 'awr', component: AwrFormComponent },
  { path: 'requestForm', component: RequestFormComponent },
  { path: 'dcl', component: DocumentCheckListComponent },
  { path: 'branchlist', component: BranchListComponent },
  { path: 'midForm', component: MidFormModalComponent },
  { path: 'mid', component: MidComponent },
  { path: 'historyModal', component: HistoryModalComponent },
  { path: 'paramMaintenance', component: ParameterMaintenanceComponent },
  { path: 'dclMaintenance', component: DocumentChecklistMaintenanceComponent },
  { path: 'dclConfiguration', component: DocumentChecklistConfigurationComponent },
  { path: 'buMaintenance', component: BuMaintenanceComponent },
  { path: 'aoMaintenance', component: AoMaintenanceComponent },
  { path: 'sfcc', component: ServiceFeeContractComponent },
  { path: 'request/:mode/:id', component: RequestComponent },
  { path: 'request', component: RequestComponent },
  { path: 'branchForm', component: BranchFormComponent },
  { path: 'defaultMIDMaintenance', component: DefaultMidMaintenanceComponent },
  { path: 'debitTid', component: DebitTidComponent },
  { path: 'custProfile', component: CustomerProfileComponent },
  { path: 'mam', component: MamVerificationScreenFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
