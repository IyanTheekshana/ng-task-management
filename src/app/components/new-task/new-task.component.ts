import { Component, inject } from '@angular/core';
import { MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { BoardService } from '../../services/board.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-new-task',
  imports: [MatDialogModule, MatButtonModule, MatInputModule, FormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css'
})
export class NewTaskComponent {
  title: string = "";
  private boardService = inject(BoardService);
  private router = inject(Router);

  constructor(private dialogRef: MatDialogRef<NewTaskComponent>){}
  close(){
    this.dialogRef.close()
  }

  createBoard(){
    this.boardService.createBoard(this.title);
    this.dialogRef.close()
  }
}
