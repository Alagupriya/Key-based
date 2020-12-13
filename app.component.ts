import { Time } from '@angular/common';
import { Component ,OnInit} from '@angular/core';
import { FormControl, FormGroup,FormBuilder,Validators} from '@angular/forms';
import { Client } from 'src/client';
import { FileserviceService } from './fileservice.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Freshworks';

  city : {[index:string]: [number,number]}={};
  user: Client;
 /* form : FormGroup = new FormGroup ({
   name: new FormControl(''),
   value:new FormControl(''),
   min:new FormControl('')
  }); */

 /* rform : FormGroup = new FormGroup ({
   rname: new FormControl('')});

   dform : FormGroup = new FormGroup ({
     dname: new FormControl('')});*/
      hid=true;
     currenttime: Time;
        error="";
       num:number;
       r=0;
       form : FormGroup = new FormGroup ({});
       rform : FormGroup = new FormGroup ({});
       dform : FormGroup = new FormGroup ({});
       constructor(b : FormBuilder,private fileService: FileserviceService) {

         this.form = b.group({
           value : ['', [Validators.required, Validators.pattern("[0-9]*$")]],
           name:['',[Validators.required ,Validators.minLength(5), Validators.maxLength(1073741824),Validators.pattern('^[a-zA-Z ]*$')]],
           min:['', [Validators.pattern("[0-9]*$")]]
         });

         this.rform = b.group({
          rname:['',[Validators.required ,Validators.minLength(5), Validators.maxLength(1073741824),Validators.pattern('^[a-zA-Z ]*$')]]
        });

        this.dform = b.group({
          dname:['',[Validators.required ,Validators.minLength(5), Validators.maxLength(1073741824),Validators.pattern('^[a-zA-Z ]*$')]]
        });


       }
       //constructor() { }
	
	ngOnInit() { 
		this.fileService.getResultList().subscribe(sr => {Object.assign(this.city, sr);});
	}
      

       get f() {
        return this.form.controls;
      } 
      get rf() {
        return this.rform.controls;
      } 
      get df() {
        return this.dform.controls;
      } 
  
 submit():void
 {
  
   this.hid=false;
   let date: Date = new Date();
   date.getTime();
   this.num = parseInt(date.toTimeString()); 
   for(const key in this.city){
     console.log(`${key}  ${this.city[key][0]} ${this.city[key][1]}`)
     if(key==this.form.value["name"]){
        this.error=`key ${key}  already there in data store.`
     console.log(`${key}  ${this.city[key][0]} ${this.city[key][1]} already there`)
     return ;
     }
   } //

   if(this.form.value["min"]==''){
     this.num=0;
   }

   else{
   this.num= date.getHours()+date.getMinutes()+parseInt(this.form.value["min"]);
  } 

  this.city[this.form.value["name"]] = [this.form.value["value"],this.num];
    // this.fileService.Adduser(this.user);
  this.error=" key successfully inserted !!! ";
 
  //
  const writeJsonFile = require('write-json-file');
 
  (async () => {
      await writeJsonFile('results.json', {foo: true});
  })();
  //
 }

 read():void
 {
  this.hid=false;
   let date: Date = new Date();
   date.getTime();
   let b=0;
   let v=0;
   let k;
   for(const key in this.city)
   {
     if(key==this.rform.value["rname"] )
     {
       this.r=1;
         k=key;
         v=this.city[key][0];
        b=this.city[key][1];

       //console.log(`${key}  ${this.city[key][0]} ${this.city[key][1]} `)
     }
     
   }

   if(this.r==0)
   {
     this.error="Key not  found";
     console.log("not found");
   }
   if(this.r==1)
   {
     if(b!=0)
     {
       if(date.getHours()+date.getMinutes() > b)
       {
        this.error="key expired" ;
         console.log("expired");
       }
       else
       {
        this.error="key: "+k+" and its  value: " +v;
          console.log("1",k,v,b,date.getHours()+date.getMinutes());
       }
     }
     if(b==0){
      this.error="key: "+k+" and its value: " +v;
       console.log("2",k,v,b);
     }
     this.r=0;

   }
  // this.error='';
 }


 delete():void{
  this.hid=false;
  let  d=0;
   for(const key in this.city){
     if(key==this.dform.value["dname"])
     {
       d=1;
       delete this.city[this.dform.value["dname"]] ;
       this.error=`key ${key} has deleted`;
       console.log(`${key} deleted`); 
       //console.log(`  ${this.city[key][0]} ${this.city[key][1]} `)
       return ;
     
    //
   
   }
 }

   //if(d==0){
     console.log("not found");
     this.error="key expired or not found" ;
  
 

     
     
   
 }




 


}
