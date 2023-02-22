import React, { Component,useState } from 'react';
import './custom.css';

function  App(){
    let [SpeelIsBegonnen,SetSpeelIsBegonnen] = useState(false)
    let [VeldGrootte,SetVeldGrootte] = useState(7)
    let [TellerTijd,SetTellerTijd] = useState(100)
    let [Buurt,SetBuurt] = useState(1)
    let [VeldMap,SetVeldMap] = useState([])
    let IntervalRef =  React.createRef();
    function Startopstelling() {
        console.log("het spel op de startopstelling zet")
    }
    function  SpeelAfgelopen() {
        alert( "het spel is afgelopen.")
        clearInterval(IntervalRef.current);
        IntervalRef.current = null;
    }
   function HandleKlik (GeselecteerdVakIsVan, Coordinate,Id){
        if (GeselecteerdVakIsVan>0){
            if (GeselecteerdVakIsVan === Buurt){
               SetBuurt( GeselecteerdVakIsVan===2?1:2 )
                document.getElementById(Id).classList.add("GeselecteerdVak")
            }else{
                console.log("Het is geen buurt van je")
            }
        }else{
            console.log("Op een lege veld gekliked")
        }
    }
   function BordVeld(VeldGrootte){
       console.log("rer")
        let Veld = [];
        localStorage.setItem("VeldGrootte",VeldGrootte)
        for (let i1 = 0; i1<VeldGrootte; i1++){
            let VeldRij = []
            for (let i2 = 0; i2<VeldGrootte; i2++){
                if (i1 < 2)
                    VeldRij.length >= Number(localStorage.getItem("VeldGrootte")) - 2 ? VeldRij.push(1): VeldRij.push(0)
                else if (i1 > Number(localStorage.getItem("VeldGrootte")) - 3)
                    VeldRij.length === 0 || VeldRij.length === 1 ? VeldRij.push(2): VeldRij.push(0)
                else
                    VeldRij.push(0)
            }
            Veld.push(VeldRij)
        }

        return( <section id={"Bord"}>
            <div className={"alert alert-light p-1"}>Buurt van   {"Speler "+ Buurt}</div>
            {Object.keys(Veld).map(Rij => {
                return (<div key={Rij}>
                    {
                        Veld[Rij].map((Item,Index) => {
                            let Vak =  Item >0 ? "Speler" : "LeegVeld";
                            Vak = Vak.includes("Speler")? Vak+Item: Vak;
                            let Coordinate = {X: Index+1, Y:Number(Rij)+1}
                            let Id = Coordinate.Y+ "" + Coordinate.X;

                            return <button onClick={ ()=>{
                                HandleKlik(Item,Coordinate,Id);
                            }} key={Id} id={Id} className={Vak}></button>
                        })
                    }
                < /div>)
            })
            }
        </section>)
    }
    
    
    function handleStartStopKnop(){
        SetSpeelIsBegonnen(!SpeelIsBegonnen);
        if (!SpeelIsBegonnen){
            Startopstelling ()
            IntervalRef.current = setInterval(() => {
                TellerTijd> 0 ? SetTellerTijd(--TellerTijd): SpeelAfgelopen();
            }, 1000);
        }else{
           SpeelAfgelopen();
        }
    }

    return (
        <section id={"App"} style={{width: (VeldGrootte * 56 ) + "px"}}>
            <header>
                <div id={"TimerBox"}>
                    <span>Veld Grootte: {VeldGrootte}</span>
                    <button onClick={() => VeldGrootte>6 ? SetVeldGrootte(VeldGrootte - 1) : ""}>-</button>
                    <button onClick={() =>SetVeldGrootte(VeldGrootte + 1)}>+</button>
                </div>
                <div id={"TimerBox"}>
                    <img src={"timer.png"} width={60}/>
                    <span key={"1"}>{TellerTijd}</span>
                </div>

            </header>
            <main>
                <button id={"SpeelBegonnenKnop"} onClick={() =>{ handleStartStopKnop() } }>
                    {SpeelIsBegonnen? "Eind speel" : "Begin speel"}
                </button>
                {SpeelIsBegonnen ? BordVeld(VeldGrootte): ""}
            </main>
        </section>
    );
    
}
export default App;



