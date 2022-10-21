import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-moviecards',
  templateUrl: './moviecards.component.html',
  styleUrls: ['./moviecards.component.css']
})
export class MoviecardsComponent implements OnInit {
 
  allmovies:any[]= [];

  constructor(private movielist:DataService, private router:Router,private ActivatedRoute:ActivatedRoute) { }
  ngOnInit() {
    this.movielist.getMoviesData().subscribe( res => {
      this.allmovies =res;
      console.log("res",res);
    },
    err => { console.log("err occured:", err)
    }
    )
  }
  // routing
  register(id:string){
    console.log(id);
    this.router.navigate(['bookticket',id]);
  }
 
 
  }
