import Image from "next/image";
import Chatbox from "./component/chatbox";
import ButtonAddChannel from "./component/btnaddchnl";
import ModalAddChannel from "./component/modaladdchl";
import SomeChannels from "./component/somechannels";

export default function Home() {

 
  
  return (
    <main className="flex flex-col gap-2" style={{width: "95%"}}>
      <section style={{borderStyle:"solid", borderColor:"#000000", borderWidth:"0.2vh", height:"30vh"}}>
        <div className="flex justify-between">
          <h2>My channels</h2>
          <ButtonAddChannel/>
          <ModalAddChannel/>
        </div>
      </section>
      <Chatbox/>
      <section style={{borderStyle:"solid", borderColor:"#000000", borderWidth:"0.2vh", height:"30vh"}}>
        <div className="flex justify-between">
          <h2>Some channels</h2>
          <SomeChannels/>
        </div>
      </section>

      
    </main>
  );
}
