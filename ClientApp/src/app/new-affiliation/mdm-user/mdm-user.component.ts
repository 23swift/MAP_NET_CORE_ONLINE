import { Component, OnInit } from '@angular/core';
import { MdmUserService } from './mdm-user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, MatDialog } from '@angular/material';
import { BranchListService } from 'src/app/branch-list/branch-list.service';
import { DocumentListService } from 'src/app/services/document-list.service';
import { DocumentCheckListService } from 'src/app/document-check-list/document-check-list.service';
import { DeleteModalComponent } from 'src/app/modal/delete-modal/delete-modal.component';
import { BehaviorSubject, forkJoin } from 'rxjs';
import { DocumentChecklistFormModalComponent } from 'src/app/modal/document-checklist-form-modal/document-checklist-form-modal.component';
import { DocumentPerRequestFormModalComponent } from '../../modal/document-per-request-form-modal/document-per-request-form-modal.component';
import { HistoryModalComponent } from 'src/app/modal/history-modal/history-modal.component';
import { DropDownService } from 'src/app/services/drop-down.service';

@Component({
  selector: 'app-mdm-user',
  templateUrl: './mdm-user.component.html',
  styleUrls: ['./mdm-user.component.css'],
  providers: [MdmUserService, BranchListService, DocumentCheckListService]
})
export class MdmUserComponent implements OnInit {
  mode: string;
  title: string;
  subTitle: string;
  requestId: number;
  displayMode: boolean;
  userGroup: string;
  dataSource: any;
  obsDs = new BehaviorSubject<any>([]);
  dataSourceDocuments = this.obsDs.asObservable();
  obsAds = new BehaviorSubject<any>([]);
  dataSourceAdditional = this.obsAds.asObservable();
  documentList: any;
  headerModel: any;
  ownership: any;
  
  displayedColumns = ['documentName', 'dmiIndex', 'classification', 'documentStatus', 'dateSubmitted', 'targetDateOfSubmission', 'original', 'action'];

  constructor(private _route: ActivatedRoute,
    private _router: Router,
    private _snackBar: MatSnackBar,
    private _branchService: BranchListService,
    private _documentList: DocumentListService,
    private _docService: DocumentCheckListService,
    private _dialog: MatDialog,
    private _dropdownService: DropDownService,
    private _service: MdmUserService) {
    this.requestId = +this._route.snapshot.params['id'];

    forkJoin([
      this._dropdownService.getDropdown('OW'),
      this._service.getHeader(this.requestId),
      this._documentList.get()
    ]).subscribe(fjData => {
      this.ownership = fjData[0];
      fjData[1]['ownership'] = this.ownership.find(o => o.code == fjData[1].ownership).value;
      this.headerModel = fjData[1];
      this.documentList = fjData[2];
    });
  }

  ngOnInit() {
    this.mode = 'mdmUser';
    this.title = 'New Affiliation';
    this.subTitle = 'APPROVED WITH EXCEPTIONS';
    this.displayMode = true;
    this.userGroup = 'mdmUser';
    this.dataSource = this._branchService.getByNewAffiliationId(this.requestId);
    this.refresh();
  }

  getDocumentName(docId) {
    return this.documentList.length > 0 ? this.documentList.find(dl => dl.id === docId).description : '';
  }

  refresh() {
    this._docService.getByNewAffiliation(this.requestId).subscribe(d => {
      // const dmiIndexArray = ['MA', 'MIS','BRAS', 'BRAS', 'BIR', 'BRAS', 'ID'];
      // const documentStatusArray = ['Lacking', 'Incomplete', 'Complied', 'Waived', 'Not Applicable', 'Complied', 'Complied'];
      // d['items'].forEach((el, i) => {
      //   el['classification'] = true;
      //   el['dmiIndex'] = dmiIndexArray[i];
      //   el['documentStatus'] = documentStatusArray[i];
      // });
      
      this.obsDs.next(d['items']);
    });
  }

  update(document) {
    const dialog = this._dialog.open(DocumentChecklistFormModalComponent, {
      width: '90%',
      height: 'auto',
      data: {
        document: document,
        userGroup: 'mdm'
      }
    });

    dialog.afterClosed().subscribe(data => {
      this.refresh();
    });
  }

  delete(id) {
    const dialog = this._dialog.open(DeleteModalComponent, {
      width: '60%',
      data: {
        delete: this._docService.delete(id)
      }
    });

    dialog.afterClosed().subscribe(data => {
      this.refresh();
    });
  }

  addDocument() {
    const dialog = this._dialog.open(DocumentChecklistFormModalComponent, {
      width: '90%',
      height: 'auto',
      data: {
        document: {
          newAffiliationId: this.requestId
        },
        userGroup: 'mdmRl'
      }
    });

    dialog.afterClosed().subscribe(data => {
      this.refresh();
    });
  }

  openHistory() {
    this._dialog.open(HistoryModalComponent, {
      width: '60%',
      height: 'auto',
      data: {
        requestId: this.requestId
      }
    });
  }

  Submit() {
    const snackBarSub = this._snackBar.open('Welcome Letter Generated!', 'Success', {
      duration: 2000
    });

    snackBarSub.afterDismissed().subscribe(() => {
      this._router.navigateByUrl('/home/mdm');
    });
  }
}
