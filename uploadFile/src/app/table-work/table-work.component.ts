import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-table-work',
  templateUrl: './table-work.component.html',
  styleUrls: ['./table-work.component.scss']
})
export class TableWorkComponent implements OnInit {

  array = [{ 'key': 'a', 'v': true, 'isSelected': false }, { 'key': 'b', 'v': true, 'isSelected': false }, { 'key': 'c', 'v': false, 'isSelected': false }];
  // isSelected: boolean = false;

  tableData;
  tableHead = ['name','age','gender','middle'];
  isSorted: boolean=false;

  @Input() set childTable(value: []) {
    console.log(value);
    this.tableData = value;
    console.log(this.tableData);
  }

  constructor() { }

  ngOnInit() {
    console.log(this.array);
  }

  fn(event) {
    console.log(event);
  }
  selectAll(index) {
    if (index !== undefined) {
      console.log(index);
      this.array[index].isSelected = true;
      console.log(this.array);
    }
  }
  DeselectAll(index) {
    if (index !== undefined) {
      console.log(index);
      this.array[index].isSelected = false;
      console.log(this.array);
    }
  }

  sort(index){
    this.isSorted = !this.isSorted;
    if(index === 0){
      this.tableData.sort((array1, array2)=>{
        let nameA = array1[0].toLowerCase();
        let nameB = array2[0].toLowerCase();
        if(this.isSorted){
          if(nameA<nameB){
            return -1;
          }
          if(nameA>nameB){
            return 1;
          }
          return 0;
        }else{
          if(nameA<nameB){
            return 1;
          }
          if(nameA>nameB){
            return -1;
          }
          return 0;
        }
        
      });
    }
    if(index === 1){
      this.tableData.sort((array1, array2)=>{
        if(this.isSorted){
          return array1[1]-array2[1];
        }else{
          return array2[1]-array1[1];
        }
        
      })
    }
    if(index === 3){
      this.tableData.sort((array1, array2)=>{
        let dateA:any = new Date(array1[3]);
        let dateB:any = new Date(array2[3])
        if(this.isSorted){
          return dateA - dateB;
        }else{
          return dateB - dateA;
        }
      })
    }
  }
}
