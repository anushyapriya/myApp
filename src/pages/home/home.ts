import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Geolocation } from '@ionic-native/geolocation';
import xml2js from "xml2js";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  selectedProduct : any;
  jsonFormat:any;
  showResults:boolean= false;
  
  results = [];
  constructor(public navCtrl: NavController,private barcodeScanner: BarcodeScanner,
    private geolocation: Geolocation) {
      
    
    
  }

  scan(){
    this.results=[];
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      this.selectedProduct = JSON.stringify(barcodeData);
      if(barcodeData.format ==='CODE_39'){
      this.results=[
        {title:"Name",icon:"person",text:barcodeData.text},
        {title:"Address",icon:"home",text:"D.no 74-6/2-1B, plot no 132, Chennai , Tamilnaidu-600303"},
        {title:"Phone Number",icon:"call",text:"+91-999999999"},    
        
        
      ];
      this.geolocation.getCurrentPosition().then((resp) => {
        console.log(resp);
        var location = resp.coords.latitude.toString()+", "+resp.coords.longitude.toString();
      
        this.results.push({title:"Location",icon:"locate",text:location});
       }).catch((error) => {
         console.log('Error getting location', error);
       });
      this.showResults = true;
      }
     /*  var parseString = xml2js.parseString;
      
      parseString(barcodeData, function (err, result) {
          console.log(result);
          this.jsonFormat = result;
          this.selectedProduct = JSON.stringify(this.jsonFormat);
          this.showResults = true;
      });
       */
      
     }).catch(err => {
         console.log('Error', err);
     });
  }
  
   
}
