import { Component, OnInit } from '@angular/core';
import { MdmUserService } from './mdm-user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-mdm-user',
  templateUrl: './mdm-user.component.html',
  styleUrls: ['./mdm-user.component.css'],
  providers: [MdmUserService]
})
export class MdmUserComponent implements OnInit {
  mode: string;
  title: string;
  subTitle: string;
  requestId: number;
  constructor(private _route: ActivatedRoute,
    private _router: Router,
    private _snackBar: MatSnackBar) {
    this.requestId = +this._route.snapshot.params['id'];
  }

  ngOnInit() {
    this.mode = 'mdmUser';
    this.title = 'New Affiliation';
    this.subTitle = 'APPROVED';
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
