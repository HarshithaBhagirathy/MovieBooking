import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { findIndex } from 'rxjs';
import { NgForm } from '@angular/forms';
import { bookeduserdata, userdata } from 'src/app/utilities/userdata';

@Component({
  selector: 'app-ticketbooking',
  templateUrl: './ticketbooking.component.html',
  styleUrls: ['./ticketbooking.component.css'],
})
export class TicketbookingComponent implements OnInit {
  myuser = new bookeduserdata('', '', '', '', '');

  id = '';
  url = '';
  moviearray: any;
  movie: any;
  moviedate: string = '';
  movietime: string = '';
  t: string = '';

  checkTickets: string = '0';

  constructor(private movielist: DataService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.movielist.getMoviesData().subscribe((res) => {
      this.moviearray = res;
      let index = this.moviearray.findIndex(
        (movie: { id: string }) => movie.id == this.id
      );
      // console.log("har",index,this.moviearray[index].moviename);
      this.movie = this.moviearray[index];
      this.checkTickets = this.movie.NoOfTickets;
      console.log('avail tickets', this.checkTickets);
      console.log('final', this.movie);
    });
  }

  bookingform(myForm: NgForm, newid: any) {
    console.log('booking', myForm.value, myForm.value.username, newid);
    let t = this.movie.NoOfTickets - myForm.value.TotalTickets;
    console.log('display tickets', this.movie.NoOfTickets);
    console.log('buying tickets', myForm.value.TotalTickets);

    console.log('it is t', t);
    const newMovieDate = {
      moviename: this.movie.moviename,
      image: this.movie.image,
      description: this.movie.description,
      NoOfTickets: t,
      id: newid,
    };

    this.movielist.updateData(newid, newMovieDate).subscribe((x) => {
      console.log('updated sucessfully');
    });

    let k: any[] = [];
    // updating to users api
    let userdetails = {
      name: myForm.value.username,
      moviename: this.movie.moviename,
      bookedTickets: myForm.value.TotalTickets,
      movieData: myForm.value.MovieDateSelect,
      movieTime: myForm.value.MovieTime,
    };

    this.myuser = userdetails;
    console.log('2api', this.myuser);

    this.movielist.insertusersdata(this.myuser).subscribe((res) => {
      console.log('res2', res);
    });

    if (localStorage.getItem('bookedusers') === null) {
      k = [...k, userdetails];
      localStorage.setItem('bookedusers', JSON.stringify(k));
      console.log('local is empty');
    } else {
      let a: any = localStorage.getItem('bookedusers');
      let usersinlocal = JSON.parse(a);
      usersinlocal = [...usersinlocal, userdetails];
      localStorage.setItem('bookedusers', JSON.stringify(usersinlocal));
    }
  }
}
