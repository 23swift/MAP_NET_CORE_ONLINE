import { Injectable } from '@angular/core';
import{SnackBarComponent} from '../snack-bar/snack-bar.component';
import{LoadingSpinnerComponent}from '../loading-spinner/loading-spinner.component';
import {MatBottomSheet, MatBottomSheetConfig,MatSnackBar,MatSnackBarConfig} from '@angular/material';


const defaultConfig = new MatBottomSheetConfig();
const defaultConfigSanck= new  MatSnackBarConfig();
@Injectable()
export class MapWebNotificationService {

  constructor(private bottomSheet: MatBottomSheet,public snackBar: MatSnackBar) { }
  snackConfig:MatSnackBarConfig={
    announcementMessage:'success',
    duration:3000

  };
  config: MatBottomSheetConfig = {
    hasBackdrop: defaultConfig.hasBackdrop,
    disableClose: true,
    backdropClass: defaultConfig.backdropClass,
    direction: 'ltr',
    ariaLabel:'asdadd'
  };
  callBackMsg:string;
  _withError:boolean=false;
  openBottomSheet(): void {

    var bsRef= this.bottomSheet.open(LoadingSpinnerComponent,this.config);
    bsRef.afterDismissed().subscribe(result=>{
      if(this._withError){
        this.openSnackBarError();
      }else{this.openSnackBar();}


     });
   }
   dismissBottomSheet(withError:boolean=false): void {
    this._withError=withError;
    this.bottomSheet.dismiss();
   }
   openSnackBar() {
     this.snackConfig.data='Sucess!!!';
     this.snackConfig.panelClass=['snackSuccess'];
     // this.snackBar.open(msg,'Close',this.snackConfig);
     this.snackBar.openFromComponent(SnackBarComponent,
       this.snackConfig);
   }
   openSnackBarError() {
    this.snackConfig.data='Error Occured';
    this.snackConfig.panelClass=['snackError'];
    // this.snackBar.open(msg,'Close',this.snackConfig);
    this.snackBar.openFromComponent(SnackBarComponent,
      this.snackConfig);
  }

}
