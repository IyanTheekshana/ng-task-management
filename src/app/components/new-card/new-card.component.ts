import { Component, inject, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { BoardService } from '../../services/board.service';
@Component({
  selector: 'app-new-card',
  imports: [MatIconModule, MatDialogModule, MatButtonModule, MatInputModule, FormsModule, CommonModule],
  templateUrl: './new-card.component.html',
  styleUrl: './new-card.component.css'
})
export class NewCardComponent implements OnInit{


  title: string = "";
  taskLoop: any= [false];
  tasks: Array<string> = [""];
  private boardService = inject(BoardService);
  boards = this.boardService.boards; // Access the readonly signal
  currentCard: any;

  constructor(private dialogRef: MatDialogRef<NewCardComponent>, @Inject(MAT_DIALOG_DATA) public data: {boardIndex:number, editMode: boolean, cardIndex: number}){}

  ngOnInit(): void {
    const index = this.data.boardIndex;
    const boardsValue = this.boards(); // Access the value of the signal
    if (!isNaN(index) && index >= 0 && index < boardsValue.length) {
      let cards = boardsValue[index].cards;
      this.currentCard = cards[this.data.cardIndex];
      this.title = this.currentCard.title;
      this.tasks.splice(0, this.tasks.length);
      this.tasks.push(...this.currentCard.checklist);
      this.taskLoop.splice(0, this.taskLoop.length);
      this.taskLoop.push(...this.currentCard.status);
    }
  }


  close(){
    this.dialogRef.close()
  }

  createTask() {
    if(!this.data.editMode){
      this.boardService.createTask(this.data.boardIndex,{
        title: this.title,
        checklist: this.tasks,
        status: this.taskLoop,
      } )
    }else{
      this.boardService.updateCard(this.data.boardIndex, this.data.cardIndex,{
        title: this.title,
        checklist: this.tasks,
        status: this.taskLoop,
      } )
    }
    this.dialogRef.close();
  }
  addTask() {
    this.tasks.push("");
    this.taskLoop.push(false);

  }
  deleteTask(index:number){
    this.tasks.splice(index,1);
    this.taskLoop.splice(index,1);
  }


   checkEmptyElement(): boolean{
    if(this.tasks.length == 0){
      return false;
    }
    if (this.tasks.some(task => task.trim() === '')) {
      return false;
    } else {
       return true
    }
  }
}
