import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { bookeduserdata } from './utilities/userdata';



@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  constructor(private httpObj:HttpClient){}
  
    getMoviesData():Observable<any>
    { 
      return this.httpObj.get("https://633bb8d6f11701a65f674c9a.mockapi.io/tableData");
    }

    updateData(id:any,updateBody:any){
      const endpoint = 'https://633bb8d6f11701a65f674c9a.mockapi.io/tableData/'+id;
      return this.httpObj.put(endpoint,updateBody);
    }

    insertusersdata(obj:bookeduserdata):Observable<any>{
      const url = 'https://633bb8d6f11701a65f674c9a.mockapi.io/bookeduser';
      return this.httpObj.post(url,obj);
    }

    dispuserdata():Observable<any>{
      const disp = 'https://633bb8d6f11701a65f674c9a.mockapi.io/bookeduser';
      return this.httpObj.get(disp);
    }

    rebookseat(id:any,updateBody:any):Observable<any>{
      const url = 'https://633bb8d6f11701a65f674c9a.mockapi.io/bookeduser/'+id;
      return this.httpObj.put(url,updateBody);
    }


}
