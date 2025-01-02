import { Component, inject, input, OnInit } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatDialog, MatDialogModule} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import {MatCheckboxChange, MatCheckboxModule} from '@angular/material/checkbox';
import { NewCardComponent } from '../../components/new-card/new-card.component';
import { BoardService } from '../../services/board.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-view-board',
  imports: [MatIconModule, MatButtonModule, MatDialogModule, CommonModule, MatCheckboxModule, FormsModule],
  templateUrl: './view-board.component.html',
  styleUrl: './view-board.component.css'
})
export class ViewBoardComponent implements OnInit{
  private matDialog = inject(MatDialog);
  boardIndex =input.required<string>();
  private boardService = inject(BoardService);
  boards = this.boardService.boards; 
  cards: Array<any> = [];
  constructor(){}

  ngOnInit(): void {
    const index = Number(this.boardIndex());
    const boardsValue = this.boards(); 
    if (!isNaN(index) && index >= 0 && index < boardsValue.length) {
      this.cards = boardsValue[index].cards;
    }
    console.log(this.cards)
    console.log(this.boards())
  }

  onCheckboxChange(cardIndex: number, taskIndex: number, event: MatCheckboxChange): void {
    const index = Number(this.boardIndex());
    this.cards[cardIndex].status[taskIndex] = event.checked;
    this.boardService.updateBoard(index, this.cards);
  }


   openDialog(){
     const dialogRef = this.matDialog.open(NewCardComponent, {
       width: "600px",
       data: {boardIndex: Number(this.boardIndex()), editMode: false, cardIndex: -1}
     });
     dialogRef.afterClosed().subscribe(result => {
       if (result !== undefined) {
         
       }
     });
   }

   editCardDialog(cardIndex: number){
    const dialogRef = this.matDialog.open(NewCardComponent, {
      width: "600px",
      data: {boardIndex: Number(this.boardIndex()), editMode: true, cardIndex: cardIndex}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        
      }
    });
   }

   deleteCard(cardIndex: number){
    const index = Number(this.boardIndex());
    this.boardService.deleteCard(index,cardIndex);
   }
}
