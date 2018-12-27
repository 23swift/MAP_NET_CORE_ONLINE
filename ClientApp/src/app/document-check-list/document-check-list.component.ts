import { Component, OnInit, Input, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DocumentCheckListService, DocumentDisplayInfo } from './document-check-list.service';
import { MatDialog } from '@angular/material';
import { DocumentChecklistFormModalComponent } from '../modal/document-checklist-form-modal/document-checklist-form-modal.component';
import { DocumentPerRequestFormModalComponent } from '../modal/document-per-request-form-modal/document-per-request-form-modal.component';
import { DeleteModalComponent } from '../modal/delete-modal/delete-modal.component';
import { DocumentListService } from '../services/document-list.service';

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
  documentList = [];
  @Input() newAffiliationId: number;
  @Input() displayMode?: boolean;
  constructor(private _route: ActivatedRoute, private _router: Router, private _docService: DocumentCheckListService,
    private _dialog: MatDialog, private _changeDetectRef: ChangeDetectorRef, private _documentList: DocumentListService) { 
      this._documentList.get().subscribe(dl => {
        this.documentList = dl;
      });
    }

  ngOnInit() {
    this.displayedColumns = this._docService.getTableFields();
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

  update(document) {
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
    return this.documentList.find(dl => dl.id === docId).description;
  }
}
