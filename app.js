
let SpeelIsBegonnen=  false;
let VeldMap= [];
let VeldGrootte = document.getElementById("VeldGrootte");
UpdateLayout()
let TellerTijd = document.getElementById("TellerTijd");
let Interval;
function HandelVeldklik(GeselecteerdVakIsVan, CoordinateX,CoordinateY,Id){
    // console.log("GeselecteerdVakIsVan: "+GeselecteerdVakIsVan)
    // console.log("CoordinateX: "+CoordinateX)
    // console.log("CoordinateY: "+CoordinateY)
    // console.log("VeldId: "+ Id)
    
    if (GeselecteerdVakIsVan>0){
        let Buurt = Number(document.getElementById("Buurt").innerText);
        if (GeselecteerdVakIsVan === Buurt){
            console.log(Buurt)
            try {
                document.getElementById(Id-1).classList.add("ToegestaanVelden1")
            } catch (error) {}
              
            try {
                document.getElementById(Id+10).classList.add("ToegestaanVelden1")
            } catch (error) {}
            try {
                document.getElementById(Id+1).classList.add("ToegestaanVelden1")
            } catch (error) {}
           
            // console.log(VeldMap)
        }else{
            document.getElementById("Alert").innerHTML = "<span class='NietJeBuurt'> Het is niet je buurt </span> <br> Het is buurt speler <span id='Buurt'>" +Buurt + "</span>"
        }
    }else{
        let ToegestaanVelden = document.getElementsByClassName("ToegestaanVelden1").length
        let Buurt = Number(document.getElementById("Buurt").innerText);
        if(ToegestaanVelden>0){
            let KanBewegen = false;
           for (let i = 0; i<ToegestaanVelden; i++) {
                if(Id ==document.getElementsByClassName("ToegestaanVelden1")[i].id ){
                    KanBewegen = true;
                    VeldMap[CoordinateY-1][CoordinateX] = Buurt;
                    VeldAanMaken(VeldMap)
                    Buurt = Buurt===2?1:2;
                    console.log("Buurt is van " +Buurt )
                     document.getElementById("Buurt").innerText =Buurt
                }
           }
           if(!KanBewegen){
            for (let i2 = 0; i2<ToegestaanVelden; i2++) {
                const AllToegestaanVelden1 = document.querySelectorAll('.ToegestaanVelden1');
                AllToegestaanVelden1.forEach((element) => {
                             element.classList.remove('ToegestaanVelden1');
                 });
            }
           }
        } 
        console.log("Op een lege veld gekliked")
    }
}

let SpeelBegonnenKnop = document.getElementById("SpeelBegonnenKnop");
SpeelBegonnenKnop.onclick = () =>{
    SpeelIsBegonnen=!SpeelIsBegonnen;

    if(SpeelBegonnenKnop.innerText.includes("Eind speel"))
        SpeelAfgelopen()
    else{
        TellerTijd.innerText = 100;
        console.log(Number(TellerTijd.innerText))
    Interval = setInterval(() => {
        Number(TellerTijd.innerText)> 0 ? TellerTijd.innerText = Number(TellerTijd.innerText)-1: SpeelAfgelopen();
    }, 1000);
    Startopstelling();
}
  
}

function Startopstelling() {
    SpeelBegonnenKnop.innerText = "Eind speel"
    SpeelBegonnenKnop.style.background = "rgb(240 81 94)";
    VeldAanMaken(VeldMapAanmaken())
    console.log("het spel is gestarted")
}
function  SpeelAfgelopen() {
    SpeelBegonnenKnop.innerText = "Begin speel"
    SpeelBegonnenKnop.style.background = "rgb(139 139 255)";
    let TotaalSpeler1 = document.getElementsByClassName("Speler1").length;
    let TotaalSpeler2 = document.getElementsByClassName("Speler2").length;
    console.log(TotaalSpeler1)
    console.log(TotaalSpeler2)
    document.getElementById("Alert").innerHTML = "Het spel is afgelopen." + (TotaalSpeler1==TotaalSpeler2? " Speel stand is gelijk" : TotaalSpeler1>TotaalSpeler2?  " Speler 1 heeft gewonen" : " Speler 2 heeft gewonen");
    clearInterval(Interval);
}



function VeldMapAanmaken(){
    let Grootte = Number(VeldGrootte.innerText)
    let Veld =  []
    localStorage.setItem("VeldGrootte",Grootte)
    for (let i1 = 0; i1<Grootte; i1++){
        let VeldRij = []
        for (let i2 = 0; i2<Grootte; i2++){
            if (i1 < 2)
                VeldRij.length >= Number(localStorage.getItem("VeldGrootte")) - 2 ? VeldRij.push(1): VeldRij.push(0)
            else if (i1 > Number(localStorage.getItem("VeldGrootte")) - 3)
                VeldRij.length === 0 || VeldRij.length === 1 ? VeldRij.push(2): VeldRij.push(0)
            else
                VeldRij.push(0)
        
        }
        Veld.push(VeldRij)
    }
    return Veld
}


function VeldAanMaken(Veld){
    VeldMap =Veld 
    console.log(VeldMap)
    let VeldInhoud =   ` <div class="alert alert-warning p-2" >
                        <span id="Alert">Het is buurt van Speler <span id="Buurt">1</span></span> 
                  </div>`
   
   Object.keys(Veld).map((Rij) => {
    VeldInhoud+= `<div>
            ${
                Veld[Rij].map((Item,Index) => {
                    let Vak =  Item >0 ? "Speler" : "LeegVeld";
                    Vak = Vak.includes("Speler")? Vak+Item: Vak;
                    let Coordinate = {X: Index, Y:Number(Rij)+1}
                    let Id = Coordinate.Y+ "" + Coordinate.X;
                   return  `
                   <button onclick="HandelVeldklik(${Item} , ${Coordinate.X} , ${Coordinate.Y} , ${Id})" 
                   id="${Id}" class="${Vak}"></button>`
                })
            }
        </div>` }
    )
    VeldInhoud+= `</section>`
       document.getElementById("Bord").innerHTML = VeldInhoud
}



function VerhogenVeldGrootte(){
   VeldGrootte.innerText = Number(VeldGrootte.innerText) + 1;
   UpdateLayout()
   VeldAanMaken(VeldMapAanmaken())
 
}
function VerlagenVeldGrootte(){
    VeldGrootte.innerText>6?   VeldGrootte.innerText = Number(VeldGrootte.innerText) -1:""
    UpdateLayout()
     VeldAanMaken(VeldMapAanmaken())

}
function UpdateLayout(){
    document.getElementById("App").style.width = (Number(VeldGrootte.innerText) * 65 ) + "px";
}




