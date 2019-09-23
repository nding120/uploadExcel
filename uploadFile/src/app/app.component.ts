import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as XLSX from 'ts-xlsx';

interface FileReaderEventTarget extends EventTarget {
  result: string
}

interface FileReaderEvent extends Event {
  target: FileReaderEventTarget;
  getMessage(): string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'uploadFile';
  uploaderContent: BehaviorSubject<string> = new BehaviorSubject('please drop file in');

  constructor() { }

  // xlsxUploadedParent(result: UploadResult) {
  //   this.uploaderContent.next(JSON.stringify(result));
  // }




  handleFile(e) { // 
    var files = e.target.files; // 
    var i, f;
    var newArry = [];//
    var newobj = [];//
    for (i = 0, f = files[i]; i != files.length; ++i) { // 
      var reader = new FileReader(); // 
      var name = f.name;
      console.log(name);
      reader.onload = function (e: any) { //  
        var data = e.target.result;

        var workbook = XLSX.read(data, { type: 'binary' });

        /* DO SOMETHING WITH workbook HERE */
        var sheet_name_list = workbook.SheetNames;
        sheet_name_list.forEach(function (y) { /* iterate through sheets */
          var worksheet = workbook.Sheets[y];
          console.log(y);
          XLSX.utils.sheet_to_json(worksheet);
          console.log(worksheet);
          for (let z in worksheet) {
            /* all keys that do not begin with "!" correspond to cell addresses */
            console.log(z); // A1
            // if (z === "!ref" || z === "A1" || z === "B1" || z === "C1" || z === "D1") continue;
            // for (let i = 0; i < 4; i++) {
            // newobj.push(JSON.stringify(worksheet[z].v));
            // }
            // newArry.push(newobj);
            if (z[0] === '!') {
              console.log(z[0]); continue;
            }
            newArry.push(worksheet[z].v);
            // console.log(y + "!" + z + "=" + JSON.stringify(worksheet[z].v));

          }
          console.log(newArry);
        });


        // var first_sheet_name = workbook.SheetNames[0];
        // var address_of_cell = 'A1';

        // /* Get worksheet */
        // var worksheet = workbook.Sheets[first_sheet_name];

        // /* Find desired cell */
        // var desired_cell = worksheet[address_of_cell];

        // /* Get the value */
        // var desired_value = desired_cell.v;

        // // /* Get the value */
        // // var desired_value = desired_cell.v;
        // // console.log(desired_value);




      };
      reader.readAsBinaryString(f);
    }


  }

}
