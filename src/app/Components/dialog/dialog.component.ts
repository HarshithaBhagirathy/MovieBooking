import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from 'src/app/data.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit {
  userForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private toupdateuser: DataService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<DialogComponent>
  ) {}

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      moviename: ['', Validators.required],
      bookedTickets: ['', Validators.required],
      movieData: ['', Validators.required],
      movieTime: ['', Validators.required],
    });

    if (this.editData) {
      this.userForm.controls['id'].setValue(this.editData.id);
      this.userForm.controls['name'].setValue(this.editData.name);
      this.userForm.controls['moviename'].setValue(this.editData.moviename);
      this.userForm.controls['bookedTickets'].setValue(
        this.editData.bookedTickets
      );
      this.userForm.controls['movieData'].setValue(this.editData.movieData);
      this.userForm.controls['movieTime'].setValue(this.editData.movieTime);
    }
  }

  changedata() {
    console.log(this.userForm.value);
    if (this.userForm.valid) {
      this.toupdateuser
        .rebookseat(this.editData.id, this.userForm.value)
        .subscribe((x) => {
          alert('updated Sucessfully');
          this.userForm.reset();
          this.dialogRef.close('save');
        });
    }
  }
}
