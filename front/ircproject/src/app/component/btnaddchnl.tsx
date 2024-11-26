"use client"

export default function ButtonAddChannel() {
    function onModalAddChannel() {
        const myModal = document.querySelector('#ModalNewChannel')
            myModal ?
            myModal.style.display = "flex" : null
      }
    return (
        <button onClick={onModalAddChannel}>Create channel +</button>
    )
}