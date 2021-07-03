
//let array = [["x","o","x"],["x","x","o"], ["o","x","o"]]

/* below is the module to display the grid contents to the grid */

const displayController = ( function(array) {

    const _idxArray = (i,j) =>{
        let idx = `${i+1}${j+1}`;
        const boxId = document.querySelector("#box_" + idx ) 
        if(boxId){
            boxId.textContent = array[i][j];
        }
    }

    const ammendDOM = (array) => {
        for(let i=0; i<=2; ++i){
            for(let j=0; j<=2; ++j){
                _idxArray(i,j);
            }

        }
    }

    return {
        ammendDOM
    }

})();


//displayController.ammendDOM(array);



/* module for the game */

const game = (function() {

    let count = 0;
    let array = [[], [], []];

    const _clickContentChange = (idName, count)  =>{
        const boxID = document.querySelector("#"+idName);
        if( !(boxID.textContent=="x" || boxID.textContent=="o")){
            if (count%2==0){
                boxID.textContent = "x"
            }
            else {
                boxID.textContent = "o"
            }
        }
        
        return boxID.textContent
    }   

    const _appendToArray = (array, idName, text) => {
        let idx = idName.replace(/\D+/g, '');
        let row = idx.slice(0,1) - 1;
        let col = idx.slice(1) -1;
        array[row][col] = text;
    }

    let countTest = 0;
    const _checkArryPopulation = (array) =>{
        //let countTest = 0;
        for (let i=0; i<=2; ++i){
            for(let j=0; j<=2; ++j){
                if(array[i][j]=="x" || array[i][j]=="o"){
                    ++countTest;
                }
            }
        }

        return countTest;
    }

    const _checkWin = (array) =>{
        const count = _checkArryPopulation(array);
        if( ( (array[0][0]==array[0][1]&&array[0][1]==array[0][2])) && (array[0].length==3)||
            ( (array[1][0]==array[1][1]&&array[1][1]==array[1][2]))  && (array[1].length==3) ||
            ( (array[2][0]==array[2][1]&&array[2][1]==array[2][2]) && (array[2].length==3)) ||

            ( (array[0][0]==array[1][0]&&array[1][0]==array[2][0]) && (array[0][0]!==undefined && array[1][0]!==undefined && array[2][0]!==undefined)) ||
            ( (array[0][1]==array[1][1]&&array[1][1]==array[2][1]) && (array[0][1]!==undefined && array[1][1]!==undefined && array[2][1]!==undefined)) ||
            ( (array[0][2]==array[1][2]&&array[1][2]==array[2][2]) && (array[0][2]!==undefined && array[1][2]!==undefined && array[2][2]!==undefined)) ||
            ( (array[0][0]==array[1][1]&&array[1][1]==array[2][2]) && (array[0][0]!==undefined && array[1][1]!==undefined && array[2][2]!==undefined))
            
            ){
            return ("win");
        }
        else if (array[0].length==3 && array[1].length==3 && array[2].length==3){
            return ("tie");
        }
    }


    const reset = () =>{
        const resetButton = document.querySelector(".js-reset-img");
        resetButton.addEventListener("click", ()=> {
            array = [[], [], []];
            for (let i=0; i<=2; ++i){
                for(let j=0; j<=2; ++j){
                    let idx = `${i+1}${j+1}`;
                    const boxId = document.querySelector("#box_" + idx );
                    boxId.textContent=array[i][j];
                    
                }
            }
            count=0;

        })

        
    }

    
    const clickTest = () =>{
        const allBoxes = document.querySelectorAll(".js-g-box")
        allBoxes.forEach(box =>{
            box.addEventListener("click", ()=>{
                const boxIDName = box.id;
                //let idx = Number(box.id.replace(/\D+/g, ''));
                console.log(boxIDName);
                let text = _clickContentChange(boxIDName, count);
                _appendToArray(array, boxIDName, text);
                let res = _checkWin(array);
                if (res=="win"){
                    if (text=="x"){
                        alert("Player 1 Wins")
                    }
                    else if(text=="o"){
                        alert("Player 2 Wins")
                    }
                }
                else if(res=="tie"){
                    alert("Its a Tie");
                }
                console.log(array);
                ++count;
            })
            reset();
        })
    
    }


    return {
        clickTest,
        reset
    }

})();

game.clickTest();
game.reset();