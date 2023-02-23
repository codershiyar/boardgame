
let SpeelIsBegonnen=  false;
let VeldMap= [];
let VeldIdes= [];
let VeldGrootte = document.getElementById("VeldGrootte");
UpdateLayout()
let TellerTijd = document.getElementById("TellerTijd");
let Interval;
let StandSpeler1=4;
let StandSpeler2=4;

function VeldenDeselecteren(ClassNaam){
    const AllToegestaanVelden = document.querySelectorAll('.'+ClassNaam);
    AllToegestaanVelden.forEach((element) => {
            element.classList.remove(ClassNaam);
    });
}

function Bewegen(){
    
}
function HandelVeldklik(GeselecteerdVakIsVan, CoordinateX,CoordinateY,Id){
    let Beurt = Number(document.getElementById("Beurt").innerText);
    if (GeselecteerdVakIsVan>0){
        
        if (GeselecteerdVakIsVan === Beurt){
            VeldenDeselecteren("ToegestaanVelden1")
            VeldenDeselecteren("ToegestaanVelden2")
            localStorage.setItem("CoordinateX",CoordinateX)
            localStorage.setItem("CoordinateY",CoordinateY-1 )

            let ToegestaanStappen1 = [Id-1,Id+10,Id+1,Id-10, Id-9,Id-11, Id+9,Id+11]
            ToegestaanStappen1.forEach(VeldId => {
                if(VeldIdes.includes(VeldId)){
                    document.getElementById(VeldId).classList.add("ToegestaanVelden1")
                }
            });

            let ToegestaanStappen2 = [Id-2,Id+2,Id+8,Id+12,Id+20,Id+19,Id+18,Id+21,Id+22,Id-20,Id-19,Id-18,Id-21,Id-22,Id-8,Id-12]
            ToegestaanStappen2.forEach(VeldId => {
                if(VeldIdes.includes(VeldId)){
                    document.getElementById(VeldId).classList.add("ToegestaanVelden2")
                }
            });
     
        }else{
            if(Beurt ==2){
                Speler2()
            }
            document.getElementById("Alert").innerHTML = "<span class='NietJeBeurt'> Het is niet je Beurt </span> <br> Het is Beurt speler <span id='Beurt'>" +Beurt + "</span>"
        }
    }else{

        let ToegestaanVelden1 = document.getElementsByClassName("ToegestaanVelden1").length
        let ToegestaanVelden2 = document.getElementsByClassName("ToegestaanVelden2").length;
        
        if(ToegestaanVelden1>0 || ToegestaanVelden1>2){

            let KanBewegen = false;
           for (let i = 0; i<ToegestaanVelden1; i++) {
   
             try {
    
                if(Id ==document.getElementsByClassName("ToegestaanVelden1")[i].id ){
                    KanBewegen = true;
                    OpslaanVeldInStapel(VeldMap)
                    VeldMap[CoordinateY-1][CoordinateX] = Beurt;
                    let NieuweId =""+ CoordinateY+ CoordinateX;
                    NieuweId = Number(NieuweId)
                    let ToegestaanStappen1 = [NieuweId-1,NieuweId+10,NieuweId+1,NieuweId-10, NieuweId-9,NieuweId-11, NieuweId+9,NieuweId+11]
                   
                    for (let index = 0; index < ToegestaanStappen1.length; index++) {
                        try {
                            var digits = ToegestaanStappen1[index].toString().split('').map(Number);
                            let Tegenstanderd = Beurt==2?1:2;
                            if(Tegenstanderd==Number(VeldMap[digits[0]-1][digits[1]])){
                                VeldMap[digits[0]-1][digits[1]] = Beurt;
                            }
                        } catch (error) {
                            console.log(error)
                        }
                      
                    }

                    VeldAanMaken(VeldMap)
                    Beurt = Beurt===2?1:2;
                    document.getElementById("Beurt").innerText =Beurt
                    if(Beurt==2){
                       setTimeout(() => { Speler2()}, 500);
                    }
                }
            } catch (error) {}
               
           }


           for (let i = 0; i<ToegestaanVelden2; i++) {

            try {
           
               if(Id == document.getElementsByClassName("ToegestaanVelden2")[i].id ){
                console.log("Punt 6 Aanval door" + Beurt, Id)
                   KanBewegen = true;
                   OpslaanVeldInStapel(VeldMap)
                   VeldMap[CoordinateY-1][CoordinateX] = Beurt;
                   VeldMap[localStorage.getItem("CoordinateY")][localStorage.getItem("CoordinateX")] = 0;
                   Beurt = Beurt===2?1:2;
                   VeldAanMaken(VeldMap)
                   document.getElementById("Beurt").innerText =Beurt
               }
           } catch (error) { 
            console.log("Punt 7 Aanval door" + Beurt, Id)
            console.log(error)
            console.log(document.getElementsByClassName("ToegestaanVelden2"))
        }
              
          }

           if(!KanBewegen){
            for (let i2 = 0; i2<ToegestaanVelden1; i2++) {
                VeldenDeselecteren("ToegestaanVelden1")
                VeldenDeselecteren("ToegestaanVelden2")
            }
           }else{
            
           }
        } 
    }

}

function Speler2(){
    let VeldenVanSpeler2 = document.getElementsByClassName("Speler2"); 
    var MogelijkeBesmettingenPerElement = []  
    for (let index = 0; index < VeldenVanSpeler2.length; index++) {
        const element = VeldenVanSpeler2[index];
        let Id = element.id;
        let ToegestaanStappen = [Id-1,Id+10,Id+1,Id-10, Id-9,Id-11, Id+9,Id+11,Id-2,Id+2,Id+8,Id+12,Id+20,Id+19,Id+18,Id+21,Id+22,Id-20,Id-19,Id-18,Id-21,Id-22,Id-8,Id-12]
        let MogelijkeBesmettingen = 0;
        ToegestaanStappen.forEach(VeldId => {
            if(VeldIdes.includes(VeldId)){
                if( document.getElementById(VeldId).classList.contains("Speler1")){
                    MogelijkeBesmettingen++;
                }
            }
        });
        MogelijkeBesmettingenPerElement.push([Id,MogelijkeBesmettingen])
    }
    let Gevonden = false;
    MogelijkeBesmettingenPerElement.forEach(Element=>{
        if ((!Gevonden) && Element[1] ===  Math.max(...MogelijkeBesmettingenPerElement.map(o => o[1]))) {
            Gevonden=true;
            document.getElementById(Element[0]).click();
            setTimeout(() => { AanvalenSpeler1();  }, 500);
        }
    })

    
}
function KiesdebesteUitOptie(){
    const AllToegestaanVelden = document.querySelectorAll('.ToegestaanVelden1,.ToegestaanVelden2 ');
    let MogelijkeBesmettingenPerElement = []  
    for (let index = 0; index < AllToegestaanVelden.length; index++) {
        const element = AllToegestaanVelden[index];
        let Id = element.id;
        let ToegestaanStappen = [Id-1,Id+10,Id+1,Id-10, Id-9,Id-11, Id+9,Id+11,Id-2,Id+2,Id+8,Id+12,Id+20,Id+19,Id+18,Id+21,Id+22,Id-20,Id-19,Id-18,Id-21,Id-22,Id-8,Id-12]
        let MogelijkeBesmettingen = 0;
        ToegestaanStappen.forEach(VeldId => {
            if(VeldIdes.includes(VeldId)){
                if( document.getElementById(VeldId).classList.contains("Speler1")){
                    MogelijkeBesmettingen++;
                }
            }
        });
        MogelijkeBesmettingenPerElement.push([Id,MogelijkeBesmettingen])
       
    }
}
 
function AanvalenSpeler1(){
    const AllToegestaanVelden = document.querySelectorAll('.ToegestaanVelden1,.ToegestaanVelden2 ');
    let MogelijkeBesmettingenPerElement = []  
    for (let index = 0; index < AllToegestaanVelden.length; index++) {
        const element = AllToegestaanVelden[index];
        let Id = element.id;
        let ToegestaanStappen = [Id-1,Id+10,Id+1,Id-10, Id-9,Id-11, Id+9,Id+11,Id-2,Id+2,Id+8,Id+12,Id+20,Id+19,Id+18,Id+21,Id+22,Id-20,Id-19,Id-18,Id-21,Id-22,Id-8,Id-12]
        let MogelijkeBesmettingen = 0;
        ToegestaanStappen.forEach(VeldId => {
            if(VeldIdes.includes(VeldId)){
                if( document.getElementById(VeldId).classList.contains("Speler1") ){
                    MogelijkeBesmettingen++;
                }
            }
        });
        MogelijkeBesmettingenPerElement.push([Id,MogelijkeBesmettingen])
      
    }
    console.log(MogelijkeBesmettingenPerElement)
    // console.clear()
    let Gevonden = false;
    while(!Gevonden){

        let MaxMogelijkeBesmettingen = Math.max(...MogelijkeBesmettingenPerElement.map(o => o[1]))
        MogelijkeBesmettingenPerElement.forEach(Element=>{
            if (Element[1] ===  MaxMogelijkeBesmettingen) {
                if (!Gevonden) {
                    console.log(Element)
                    if((!document.getElementById(""+Element[0]).classList.contains("Speler1")) && (!document.getElementById(""+Element[0]).classList.contains("Speler2"))) {
                        console.log("Kan",Element)
                        if (!document.getElementById(Element[0]).classList.contains("Speler")) {
                            document.getElementById(Element[0]).click();
                            Gevonden =true;
                        }
                        
                    }else{
                        console.log("Kan niet, er is een speler1",Element)
                        MogelijkeBesmettingenPerElement = MogelijkeBesmettingenPerElement.filter(function(e) { return e !== Element })
                    }  
                }
            }
        })
  
    }
    
}

let SpeelBegonnenKnop = document.getElementById("SpeelBegonnenKnop");
SpeelBegonnenKnop.onclick = () =>{
    SpeelIsBegonnen=!SpeelIsBegonnen;

    if(SpeelBegonnenKnop.innerText.includes("Eind speel"))
        SpeelAfgelopen()
    else{
        TellerTijd.innerText = 100;
    Interval = setInterval(() => {
        Number(TellerTijd.innerText)> 0 ? TellerTijd.innerText = Number(TellerTijd.innerText)-1: SpeelAfgelopen();
    }, 1000);
    Startopstelling();
}
  
}

function Startopstelling() {
    SpeelBegonnenKnop.innerText = "Eind speel"
    SpeelBegonnenKnop.style.background = "rgb(240 81 94)";
    VeldAanMaken(NieuweMapAanmaken())
}
function  SpeelAfgelopen() {
    SpeelBegonnenKnop.innerText = "Begin speel"
    SpeelBegonnenKnop.style.background = "rgb(139 139 255)";
    clearInterval(Interval);
    PrintGewonnenSpeler()
}

function PrintGewonnenSpeler(){
    document.getElementById("Alert").innerHTML = "Het spel is afgelopen." + (StandSpeler1==StandSpeler2? " Speel stand is gelijk" : StandSpeler1>StandSpeler2?  " Speler 1 heeft gewonen" : " Speler 2 heeft gewonen");
}

function NieuweMapAanmaken(){
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

function UpdateStand(){
    StandSpeler1= document.getElementsByClassName("Speler1").length;
    StandSpeler2=document.getElementsByClassName("Speler2").length;
    document.getElementById("StandSpeler1").innerText = StandSpeler1;
    document.getElementById("StandSpeler2").innerText = StandSpeler2;
    if (StandSpeler1 == 0 || StandSpeler2 == 0 ) {
        SpeelAfgelopen()
    }
}

function OpslaanVeldInStapel(Waarde){
    fetch("https://localhost:7102/stapel", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
          body:JSON.stringify({"Waarde": JSON.stringify(Waarde)}) 
    }).then(Request=> Request.text()).then(Antwoord=>{
        // console.log("Gestuurd: "+ Antwoord)
    })
}


function VeldAanMaken(Veld){

   
    if(StandSpeler1==0 || StandSpeler2==0){
       SpeelAfgelopen()
    }
    VeldMap =Veld 
    VeldIdes = []
    let VeldInhoud =   ` 
    <div class="alert alert-warning p-2" >
                        <span id="Alert">Het is Beurt van Speler <span id="Beurt">1</span></span> 
                        <div style=" text-align: right;">  <img id="Terug" title="terug" src="public/left-arrow.png" width="40"/></div>
    </div>`
   
   Object.keys(Veld).map((Rij) => {
    VeldInhoud+= `<div>
            ${
                Veld[Rij].map((Item,Index) => {
                    let Vak =  Item >0 ? "Speler" : "LeegVeld";
                    Vak = Vak.includes("Speler")? Vak+Item: Vak;
                    let Coordinate = {X: Index, Y:Number(Rij)+1}
                    let Id = Coordinate.Y+ "" + Coordinate.X;
                    VeldIdes.push(Number(Id))
                   return  `
                   <button onclick="HandelVeldklik(${Item} , ${Coordinate.X} , ${Coordinate.Y} , ${Id})" 
                   id="${Id}" class="${Vak}"></button>`
                })
            }
        </div>` }
    )
    VeldInhoud+= `</section>`
       document.getElementById("Bord").innerHTML = VeldInhoud;
       UpdateStand()

       document.getElementById("Terug").onclick = ()=>{
        fetch("https://localhost:7102/stapel").then(Request=> Request.text()).then(Antwoord=>{
            Antwoord = JSON.parse(Antwoord);
            VeldAanMaken(JSON.parse(Antwoord.Waarde))
            console.log("Terug:" + JSON.parse(Antwoord.Waarde))
        }).catch(error=>{
           NieuweMapAanmaken()
        })

    }   
    UpdateStand()
}



function VerhogenVeldGrootte(){
   VeldGrootte.innerText = Number(VeldGrootte.innerText) + 1;
   UpdateLayout()
   VeldAanMaken(NieuweMapAanmaken())
 
}
function VerlagenVeldGrootte(){
    VeldGrootte.innerText>6?   VeldGrootte.innerText = Number(VeldGrootte.innerText) -1:""
    UpdateLayout()
    VeldAanMaken(NieuweMapAanmaken())

}
function UpdateLayout(){
    document.getElementById("App").style.width = (Number(VeldGrootte.innerText) * 65 ) + "px";
}




