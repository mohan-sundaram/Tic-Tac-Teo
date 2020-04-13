import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  size: number = 3
  noOfMoves: number
  values: any[]
  players: Player[]
  gameStarted: boolean
  nextPlayerIndex: number

  constructor() { }

  ngOnInit() {
    this.initGame()
  }

  initGame() {
    this.players = [new Player(1, '😁', 'HU'), new Player(2, '🍔', 'AI')]
    this.values = [['T', 'I', 'C'], ['T', 'A', 'C'], ['T', 'E', 'O']]
  }

  startGame() {
    this.gameStarted = true
    this.nextPlayerIndex = 0
    this.noOfMoves = 0
    this.values = [['', '', ''], ['', '', ''], ['', '', '']]
  }

  cardClick(i: number, j: number, e: Event) {

    e.preventDefault()

    if (this.gameStarted && this.values[i][j] === '') {

      let currentPlayer = this.players[this.nextPlayerIndex]
      this.nextPlayerIndex = (this.nextPlayerIndex + 1) % this.players.length
      this.noOfMoves++

      this.values[i][j] = currentPlayer.value
      let won = this.checkWin(this.values, currentPlayer.value)

      if (won === true) {
        currentPlayer.score += 1
        console.log(currentPlayer)
        this.playerWon(currentPlayer)
      } else if (this.noOfMoves >= this.size * this.size) {
        console.log('no wins')
        this.playerWon(null)
      }

    }

  }

  // checkAI(playerIndex: number) {
  //   if (this.players[playerIndex].type === 'AI') {

  //   }
  // }

  // aiNextMove(tempBoard: any[], playerIndex:number) {
  //   let player = this.players[playerIndex]
  //   let next = this.nextEmptySpace(tempBoard)
  //   if(next == null) return 0
  //   tempBoard[next.row][next.col] = player.value
  //   let win = this.checkWin(tempBoard,player.value)
  //   if(win)
  // }

  // nextEmptySpace(values: any[]) {
  //   let temp =[];
  //   for (let i = 0; i < this.size; i++)
  //     for (let j = 0; j < this.size; j++)
  //       if (values[i][j] == "") temp.push({ row: i, col: j });
  //   return temp;
  // }

  checkWin(values: any[], value: string): boolean {

    // let rCross: boolean = true
    // let lCross: boolean = true

    // for (let i = 0 i < size i++) {
    //   let row: boolean = true
    //   let col: boolean = true
    //   for (let j = 0 j < size j++) {
    //     if (values[i][j] !== value) row = false
    //     if (values[j][i] !== value) col = false
    //   }
    //   if(row || col) return true
    //   if (values[i][i] !== value) rCross = false
    //   if (values[i][size - 1 - i] !== value) lCross = false
    // }
    
    // return rCross || lCross

    return ((values[0][0] === value && values[0][1] === value && values[0][2] === value)
      || (values[1][0] === value && values[1][1] === value && values[1][2] === value)
      || (values[2][0] === value && values[2][1] === value && values[2][2] === value)
      || (values[0][0] === value && values[1][0] === value && values[2][0] === value)
      || (values[0][1] === value && values[1][1] === value && values[2][1] === value)
      || (values[0][2] === value && values[1][2] === value && values[2][2] === value)
      || (values[0][0] === value && values[1][1] === value && values[2][2] === value)
      || (values[0][2] === value && values[1][1] === value && values[2][0] === value)
    )

  }

  playerWon(player: Player) {

    this.gameStarted = false

    if (player == null)
      this.values = [['', 'N', ''], ['', 'O', ''], ['W', 'I', 'N']]
    else
      this.values = [['', player.value, ''], ['', '', ''], ['W', 'O', 'N']]

  }

}

class Player {

  id: number
  value: string
  score: number
  type: string

  constructor(id: number, value: string, type: string) {
    this.id = id
    this.value = value
    this.score = 0
    this.type = type
  }

}