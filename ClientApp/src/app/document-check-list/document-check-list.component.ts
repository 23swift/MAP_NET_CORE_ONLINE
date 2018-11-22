import { Component, OnInit, Input, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DocumentCheckListService, DocumentDisplayInfo } from './document-check-list.service';
import { MatDialog } from '@angular/material';
import { DocumentChecklistFormModalComponent } from '../modal/document-checklist-form-modal/document-checklist-form-modal.component';
import { DocumentPerRequestFormModalComponent } from '../modal/document-per-request-form-modal/document-per-request-form-modal.component';

@Component({
  selector: 'app-document-check-list',
  templateUrl: './document-check-list.component.html',
  styleUrls: ['./document-check-list.component.css'],
  providers: [DocumentCheckListService]
})
export class DocumentCheckListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[];
  mode: string;
  showAdd: boolean;
  dataSource;
  @Input() newAffiliationId: number;
  constructor(private _route: ActivatedRoute, private _router: Router, private _docService: DocumentCheckListService,
    private _dialog: MatDialog, private _changeDetectRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.displayedColumns = this._docService.getTableFields();
    // this.mode = this._route.snapshot.params['mode'];

    // if (this._router.url.indexOf('mdmUser') > -1 || this._router.url.indexOf('aoEncoder') > -1 ||
    //   this._router.url.indexOf('aoChecker') > -1) {
    //   this.showAdd = true;
    // }
  }

  ngAfterViewInit() {
    this._docService.getByNewAffiliation(this.newAffiliationId).subscribe(data => {
      this.dataSource = data['items'];
    });
  }

  private refresh() {
    this._docService.getByNewAffiliation(this.newAffiliationId).subscribe(data => {
      this.dataSource = data['items'];
      this._changeDetectRef.detectChanges();
    });
  }

  upload(document) {
    const dialog = this._dialog.open(DocumentChecklistFormModalComponent, {
      width: '90%',
      height: 'auto',
      data: {
        document: document
      }
    });

    dialog.afterClosed().subscribe(data => {
      this.refresh();
    });
  }

  delete(id) {
    if (confirm('Are you sure?')) {
      this._docService.delete(id).subscribe(data => {
        this.refresh();
      });
    }
  }

  downloadFile(id, documentName) {
    const document = this.getDocumentName(documentName);
    this._docService.getFile(id).subscribe(data => {
      const fileToDownload = this._docService.base64ToArrayBuffer(data);
      this._docService.saveByteArray(fileToDownload, document);
    });
  }

  addDocument() {
    const dialog = this._dialog.open(DocumentPerRequestFormModalComponent, {
      width: '50%',
      height: 'auto',
      data: {
        newAffiliationId: this.newAffiliationId
      }
    });

    dialog.afterClosed().subscribe(data => {
      this.refresh();
    });
  }

  getDocumentName(docId) {
    return this._docService.getDocumentName().find(d => d.id === +docId).description;
  }
}
