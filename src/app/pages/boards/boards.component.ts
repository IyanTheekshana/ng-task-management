import { Component, Inject, inject, OnInit, signal } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { NewTaskComponent } from '../../components/new-task/new-task.component';
import { BoardService } from '../../services/board.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-boards',
  imports: [MatIconModule, MatButtonModule, MatDialogModule, CommonModule, RouterModule],
  templateUrl: './boards.component.html',
  styleUrl: './boards.component.css'
})
export class BoardsComponent implements OnInit{

  private matDialog = inject(MatDialog);
  private boardService = inject(BoardService);
  private router = Inject(Router);
  boards = this.boardService.boards; // Access the readonly signal

  ngOnInit(): void {
    console.log(this.boards())
  }

  openDialog(){
    const dialogRef = this.matDialog.open(NewTaskComponent, {
      width: "650px",
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
       
      }
    });
  }

  deleteBoard(index: number): void {
    this.boardService.deleteBoard(index); 
  }
}
