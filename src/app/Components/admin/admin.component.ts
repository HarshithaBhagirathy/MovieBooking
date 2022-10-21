import { Component, OnInit, Inject } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { bookeduserdata } from 'src/app/utilities/userdata';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'name',
    'moviename',
    'bookedTickets',
    'movieData',
    'movieTime',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  allusers: bookeduserdata[] = [];
  constructor(private movielist: DataService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.movielist.dispuserdata().subscribe(
      (x) => {
        this.allusers = x;
        console.log('allusers', this.allusers);
        this.dataSource = new MatTableDataSource(x);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (err) => console.log(err)
    );
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog(row: any) {
    this.dialog
      .open(DialogComponent, {
        width: '50%',
        data: row,
      })
      .afterClosed()
      .subscribe((val) => {
        this.movielist.dispuserdata().subscribe(
          (x) => {
            this.allusers = x;
            // after updating to disp new table values
            this.dataSource = new MatTableDataSource(x);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          },
          (err) => console.log(err)
        );
      });
  }
}
