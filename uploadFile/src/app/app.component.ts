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
    for (i = 0, f = files[i]; i != files.length; ++i) { // 
      var reader = new FileReader(); // 
      var name = f.name;
      console.log(name);
      reader.onload = function (e: any) { //  
        var data = e.target.result;

        var workbook = XLSX.read(data, { type: 'binary' });

        /* DO SOMETHING WITH workbook HERE */
        var sheet_name_list = workbook.SheetNames;
        console.log(sheet_name_list);
        sheet_name_list.forEach(function (y) { /* iterate through sheets */
          var worksheet = workbook.Sheets[y];
          console.log(y); // SHEET1
          // XLSX.utils.sheet_to_json(worksheet);
          console.log(worksheet); // WHOLE CONTENT
          var item;
          var beginLine;
          for (let z in worksheet) {
            var colNum;
            var rowNum;
            /* all keys that do not begin with "!" correspond to cell addresses */
            // console.log(z); // A1
            if (z[0] === '!') {
            }
            if (z === '!ref') {
              item = z;
              console.log(worksheet[z]);// A1:D4
              var wholeLength = worksheet[z].split(":");
              let startAlpha = wholeLength[0][0];
              let startNum = +wholeLength[0].substring(1);
              beginLine = startNum + 1;
              let endAlpha = wholeLength[1][0];
              let endNum = +wholeLength[1].substring(1);
              colNum = endAlpha.charCodeAt(0) - startAlpha.charCodeAt(0) + 1;
              rowNum = endNum - startNum;
              console.log(colNum, rowNum);
            }

            // newArry.push(worksheet[z].v);
            // console.log(y + "!" + z + "=" + JSON.stringify(worksheet[z].v));
          }

          // beginLine = +(worksheet[item][1])+1;
          for (let j = beginLine; j < rowNum + beginLine; j++) {
            let newobj = [];
            for (let i = 0; i < colNum; i++) {
              var a = worksheet[item].charCodeAt(0);
              var b = String.fromCharCode(a + i);
              let newItem = b + j;
              // console.log(b, newItem);
              if (worksheet[newItem]===undefined) {
                newobj.push('');
              }
              else {
                newobj.push(worksheet[newItem].v);
                console.log(worksheet[newItem].v);
              }
              
            }
            console.log(newobj);
            newArry.push(newobj); //newArry.push([...newobj]); if {}, newArry.push({...newobj});
            console.log(newArry);

          }

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
