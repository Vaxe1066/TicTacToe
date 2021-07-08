
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
    //let array = [[], [], []];
    //let array = [],
      //  cols = 3;

    //init the grid matrix
    //for ( let i = 0; i < cols; i++ ) {
      //  array[i] = []; 
    //}

    let array = new Array(3);

    for (let i = 0; i < array.length; i++) {
        array[i] = new Array(3);
    }

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

    //let countTest = 0;
    const _checkArryPopulation = (array) =>{
        let countTest = 0;
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

        let arr_val = ["x", "o"];

        for(let i=0; i<arr_val.length; ++i){
            let val = arr_val[i];
            if(array[0][0]==val && array[0][1]==val && array[0][2]==val ||
               array[1][0]==val && array[1][1]==val && array[1][2]==val ||
               array[2][0]==val && array[2][1]==val && array[2][2]==val ||

               array[0][0]==val && array[1][0]==val && array[2][0]==val ||
               array[0][1]==val && array[1][1]==val && array[2][1]==val ||
               array[0][2]==val && array[1][2]==val && array[2][2]==val ||

               array[0][0]==val && array[1][1]==val && array[2][2]==val ||
               array[0][2]==val && array[1][1]==val && array[2][0]==val){
                   return "win";
               }
            else if (count==9) {
                return "tie"
            }
        }
    }



    const _resetFnc = () =>{
        array = [[], [], []];
        //let array = new Array(3);

        /*for (let i = 0; i < array.length; i++) {
            array[i] = new Array(3);
        }*/

    

        for (let i=0; i<=2; ++i){
            for(let j=0; j<=2; ++j){
                let idx = `${i+1}${j+1}`;
                const boxId = document.querySelector("#box_" + idx );
                boxId.textContent=array[i][j];
                
            }
        }
        count=0;

        return array;
    }


    const reset = () =>{
        const resetButton = document.querySelector(".js-reset-img");
        resetButton.addEventListener("click", ()=> {
            array = _resetFnc();

        })

        return array;

        
    }

    
    const clickTest = () =>{
        const allBoxes = document.querySelectorAll(".js-g-box")
        let test=1;
        allBoxes.forEach(box =>{
            box.addEventListener("click", ()=>{
                const boxIDName = box.id;
                //let idx = Number(box.id.replace(/\D+/g, ''));
                if(test!=1){
                    array = _resetFnc();
                    //game.clickTest();
                    console.log(count);
                    let text = _clickContentChange(boxIDName, count);
                    _appendToArray(array, boxIDName, text);
                    test=1;
                    count+=1;
                }
                else{
                    console.log(count);
                    let text = _clickContentChange(boxIDName, count);
                    _appendToArray(array, boxIDName, text);
                    let res = _checkWin(array);
                    if (res=="win"){
                        if (text=="x"){
                            alert("Player 1 Wins");
                            test=0;
                        }
                        else if(text=="o"){
                            alert("Player 2 Wins");
                            test=0;
                        }
                    }
                    else if(res=="tie"){
                        alert("Its a Tie");
                        test=0;
                    }
                    console.log(array);
                    ++count;
                }
            })
            array = reset();
        })
    
    }


    return {
        clickTest,
        reset
    }

})();

game.clickTest();
//game.reset();