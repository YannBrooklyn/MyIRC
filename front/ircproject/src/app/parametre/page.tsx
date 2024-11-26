import Formulairepar from "./component/formulairepar";

export default function Parametre() {
    return(
        <main>
            <section>
                <div style={{backgroundColor:"whitesmoke", borderStyle:"solid", height:"auto", width:"30vw", borderColor:"black", borderWidth:"0.2vh", borderRadius:"1vh", alignItems:"center", justifyContent:"center"}} className="flex flex-col">
                    <h2 style={{fontSize:"3vh", fontWeight:"bold"}}>PARAMETRES</h2>
                    <Formulairepar/>
                </div>
            </section>
        </main>
    )
}