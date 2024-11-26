import FormulaireLogin from "./component/formulaire";

export default function login() {
    return (
        <main>
            <section>
                <div style={{backgroundColor:"whitesmoke", borderStyle:"solid", height:"auto", width:"30vw", borderColor:"black", borderWidth:"0.2vh", borderRadius:"1vh", alignItems:"center", justifyContent:"center"}} className="flex flex-col">
                <h2>CONNEXION</h2>
                    <FormulaireLogin/>
                </div>
            </section>
        </main>
    )
}