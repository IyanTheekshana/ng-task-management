import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BoardService{

  constructor() {
    const savedBoards = localStorage.getItem("boards");
    if (savedBoards) {
        this.boardsSignal.set(JSON.parse(savedBoards));
    }
   }


  private boardsSignal = signal<Array<any>>([]);

  boards = this.boardsSignal.asReadonly();
  

  public createBoard(title: string){

    const savedBoards = localStorage.getItem("boards");
    if (savedBoards) {
      this.boardsSignal.set(JSON.parse(savedBoards));
    }

    const newBoardObj = { title: title, cards: [] };
    this.boardsSignal.update((boards) => [...boards, newBoardObj]);

    // Persist to localStorage
    localStorage.setItem("boards", JSON.stringify(this.boardsSignal()));
  }

  public createTask(index: number, task: { title: string; checklist: Array<string>; status: Array<boolean> }) {
    this.boardsSignal.update((boards) => {
      // Ensure the index is valid
      if (boards[index]) {
        boards[index].cards.push({
          title: task.title,
          checklist: task.checklist,
          status: task.status,
        });
      }
      return boards; // Return the updated boards array
    });

    // Persist to localStorage
    localStorage.setItem("boards", JSON.stringify(this.boardsSignal()));
  }
  

    // Delete a board by index
  public deleteBoard(index: number): void {
      this.boardsSignal.update((boards) => boards.filter((_, i) => i !== index));
          // Persist to localStorage
    localStorage.setItem("boards", JSON.stringify(this.boardsSignal()));
  }

  public updateBoard(index: number, updatedCards: Array<any>): void {
      this.boardsSignal.update((boards) => {
        if (boards[index]) {
          boards[index].cards = updatedCards;
        }
        return boards;
      });

      // Persist to localStorage
      localStorage.setItem("boards", JSON.stringify(this.boardsSignal()));
  }

  public updateCard(boardIndex: number, cardIndex: number, updatedCard: any): void {
    this.boardsSignal.update((boards) => {
        if (boards[boardIndex] && boards[boardIndex].cards[cardIndex]) {
            boards[boardIndex].cards[cardIndex] = updatedCard;
        }
        return boards;
    });

    // Persist to localStorage
    localStorage.setItem("boards", JSON.stringify(this.boardsSignal()));
  }

  public deleteCard(boardIndex: number, cardIndex: number): void {
    this.boardsSignal.update((boards) => {
        if (boards[boardIndex] && boards[boardIndex].cards[cardIndex]) {
            boards[boardIndex].cards.splice(cardIndex, 1); // Remove the card at the specified index
        }
        return boards;
    });

    // Persist to localStorage
    localStorage.setItem("boards", JSON.stringify(this.boardsSignal()));
}


}


let board = {
  title: "",
  cards:[{title:"", checklist:["task1", "task2"], status: [true, false]}]
}