const prompt=require('prompt-sync')();
const ROWS=3;
const COLS=3;
const SYMBOLS_COUNT={
    A:2,
    B:4,
    C:6,
    D:8
}
const SYMBOLS_VALUES={
    A:5,
    B:4,
    C:3,
    D:2
}
const deposit = () =>{

    while(true){
    const depositAmount=prompt("enter the money to deposit: ")
    const numberdepositAmount=parseFloat(depositAmount);
    if(isNaN(numberdepositAmount) || numberdepositAmount<=0){
        console.log("Invalid amount,try again. ");
    }
    else{
        return numberdepositAmount;
    }
}
};

const getnumberOfLines = () =>{
    while(true){
        const numberLines=prompt("enter the number of lines to bet on (1-3): ")
        const Lines=parseFloat(numberLines);
        if(isNaN(Lines) || Lines<=0 || Lines>3){
            console.log("Invalid Number of lines,try again. ");
        }
        else{
            return Lines;
        }
    }

};

const getBet = (balance,Lines) =>{
    while(true){
        const bet=prompt("enter the total bet: ")
        const numberBet=parseFloat(bet);
        if(isNaN(numberBet) || numberBet<=0 || numberBet>(balance/Lines)){
            console.log("Invalid Bet,try again. ");
        }
        else{
            return numberBet;
        }
    }

};
const spin=() => {
    const symbols=[];
    for(const [symbol,count] of Object.entries(SYMBOLS_COUNT)){
        for(let i=0;i<count;i++){
            symbols.push(symbol);
        }
    }

//     console.log(symbols);

    const reels=[];
    for(let i=0;i<COLS;i++){
        reels.push([]);
        const reelsymbols=[...symbols];
        for(let j=0;j<ROWS;j++){
            const randomindex=Math.floor(Math.random() * reelsymbols.length );
            const selectedsymbol=reelsymbols[randomindex];
            reels[i].push(selectedsymbol);
            reelsymbols.splice(randomindex,1);
        }
        
    }
    return reels;
 }
 const transpose = (reels) =>{
    const rows=[]
    for(let i=0;i<ROWS;i++){
        rows.push([])
        for(let j=0;j<COLS;j++){
            rows[i].push(reels[j][i]);
        }
    }
    return rows;
       
 };

 const print=(rows) =>{
    for(const i of rows){
        let s="";
        for(const[j,symbol] of i.entries()){
            s+=symbol;
            if (j!=rows.length-1){
                s+="|";
            }
        
        }
        console.log(s);

    }
 };
 const getwinnings=(rows,bet,numberLines) =>{
    let winnings=0;
    for(let row=0;row<numberLines;row++){
       const symbols = rows[row];
       let allsame=true;
       for(const symbol of symbols){
        if (symbol!=symbols[0]){
            allsame=false;
            break;
        }
       }
    if (allsame){
        winnings+=bet * SYMBOLS_VALUES[symbols[0]];

    }
    }
    return winnings;
 };

 const game=() =>{
let balance=deposit();
while(true){
    console.log("You have a balance of Rs."+balance);
    const numberLines=getnumberOfLines();
    const bet=getBet(balance,numberLines);
    balance-=bet * numberLines;
    const reels=spin();
    const rows=transpose(reels);
    console.log(reels);
    // console.log(rows);
    print(rows);
    const winnings=getwinnings(rows,bet,numberLines);
    balance+=winnings;
    console.log("You won Rs."+winnings.toString());
    if (balance<=0){
        console.log("You don't have enough money.Better luck next time.");
    }
    const playAgain=prompt("Do you want to play again? (y/n) ");
    if (playAgain!="y"){
        break;
    }

}
 };
 game();
