export interface userdata{
    
        name: string,
        moviename: string,
        bookedTickets: Number,
        movieData: string,
        movieTime: string,
        
       
}


export class bookeduserdata{
   constructor( public name: string,
      public  moviename: string,
      public  bookedTickets: string,
      public  movieData: string,
      public  movieTime: string
      ){}
}