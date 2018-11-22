import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort, MatDialog, MatDialogRef } from '@angular/material';
import { IdocumentListData } from "../../../../temp/interface/idocument-list-data";
import { DocumentChecklistConfigurationFormService } from '../document-checklist-configuration-form/document-checklist-configuration-form.service';
import { FormlyFieldConfig, FormlyFormOptions } from '../../../../../../node_modules/@ngx-formly/core';
import { FormGroup } from '../../../../../../node_modules/@angular/forms';
import { SelectionModel } from '../../../../../../node_modules/@angular/cdk/collections';

@Component({
  selector: 'app-document-checklist-configuration-form',
  templateUrl: './document-checklist-configuration-form.component.html',
  styleUrls: ['./document-checklist-configuration-form.component.css'],
  providers: [DocumentChecklistConfigurationFormService]
})
export class DocumentChecklistConfigurationFormComponent implements OnInit {

  @Input() displayMode: boolean = false;
  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};
  title: string;
  subTitle: string;
  mode: string;
  fields: FormlyFieldConfig[];

  dataSource = new MatTableDataSource<IdocumentListData>(this._service.Get().ElementData);
  displayedColumns: string[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  data = Object.assign(this._service.Get().ElementData);
  selection = new SelectionModel<IdocumentListData>(true, []);

  constructor(private _service: DocumentChecklistConfigurationFormService,
    private _matDialog: MatDialog,
    private _matDialogRef: MatDialogRef<DocumentChecklistConfigurationFormComponent>) {
  }

  ngOnInit() {
    this.displayedColumns = ['Select','Description', 'Code'];
    this.fields = this._service.GetDocumentConfigurationFields();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ? this.selection.clear() : this.dataSource.data.forEach(row => this.selection.select(row));
  }

  applySearch(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  cancel() {
    this._matDialogRef.close();
  }
  submit() {
    
  }
}
