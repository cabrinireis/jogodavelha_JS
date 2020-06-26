const jogo_da_velha = {

    jogadas: ['','','','','','','','',''],
    simbolos: {
        options:['X','O'],
        turn_index:0,
        change(){
            this.turn_index = (this.turn_index === 0 ? 1  : 0 );
        }
    },
        
        container_element: null,
        // gameover: false,
    winning_sequence: [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ],

    init: function(container) {
        this.container_element = container;
    },
    
   
    gameStart: function(){
        this.jogadas.fill('');
        this.draw();
        this.gameOver();
    },


    makeplay: function (position){
        if(this.gameOver === true){
            return false ;
        }else if(this.jogadas[position]=== ''){
            this.jogadas[position] = this.simbolos.options [this.simbolos.turn_index];
            this.draw();
            let winning_sequence_index =  this.check_winner (this.simbolos.options [this.simbolos.turn_index])
            if(winning_sequence_index >=0){
                var p = $('.jogada')
                var c = this.winning_sequence[winning_sequence_index]
                p[c[0]].setAttribute("class","winer")
                p[c[1]].setAttribute("class","winer")
                p[c[2]].setAttribute("class","winer")
                this.gameOver();
            }else{
                this.simbolos.change()
            }
            return true;
        }else{
            return false;
        }
    },

    gameOver: function(){
        this.gameOver = true;
        alert("GAME OVER")
    },

    check_winner: function (simbolo){
        for (i in this.winning_sequence ){
            if (this.jogadas [this.winning_sequence[i][0] ] == simbolo &&
                this.jogadas [this.winning_sequence[i][1] ] == simbolo &&
                this.jogadas [this.winning_sequence[i][2] ] == simbolo ){
                    console.log("O VENCEDOR É " + i);
                    return i;
            }
        };
        return -1;
    },

    draw: function (){
        let content = '';

        for (i in this.jogadas){
            x = Math.floor(Math.random() * (this.jogadas.length-1))
            content += '<div class="jogada" onclick="jogo_da_velha.makeplay('+i+');">' + this.jogadas[i] + '</div>';
        }
        this.container_element.innerHTML = content;

    },
};
