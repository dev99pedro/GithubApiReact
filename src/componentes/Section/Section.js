import { useState } from "react"
import Input from "../Input/Input"
import './Section.css'
import Button from "../Button/Button"
import './SectionMedia.css'
import IMAGES from "../../IMAGES/"


//VER SE ROLA USANDO O USEFFECT



const Section = () => {
    const [user, setUser] = useState('')

    const [erro, setErro] = useState('')
    const [show, setShow] = useState('')
    const [showRep, setShowRep] = useState([])
    const [verificarRepoUsuario, setverificarRepoUsuario] = useState(true)

    function add(e) {
        setUser(e.target.value)
    }




    async function getApi() {
        const response = await fetch(`https://api.github.com/users/${user}`)
        const data = await response.json()
        setShow(data)
    }





    async function getApiRepo() {
        const response = await fetch(`https://api.github.com/users/${user}/repos`)
        const data = await response.json()
        setShowRep(data)

        if (user.length === 0 || user.length === '' || data.message === 'Not Found') {
            setverificarRepoUsuario(true)
            setShowRep(false)
            setErro('Usuário não encontrado')
        } else {
            setverificarRepoUsuario(false)
            setErro('')
        }
    }



    function clicar() {
        getApi()
        getApiRepo()
    }



    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            clicar()
        }
    }



    return (
        <div className="container-fluid">
            <div className="container">
                <img className="logo" src={IMAGES.LogoGit}></img>
                <div className="container-input">
                    <Input lidarEvento={handleKeyDown} changeInput={add} />
                    <Button buttonStyle={show ? 'btn-secundario' : 'btn-primario '} handleClick={clicar}>
                        Buscar
                    </Button>
                </div>
                <div className="container-perfil">
                    <img src={show.avatar_url} />
                    <div className="container-perfil-dados">
                        <h1 className="dado-login">{show.login}</h1>
                        <p className="dado-bio">{show.bio}</p>
                    </div>
                </div>

                {verificarRepoUsuario || showRep === false ? '' : <div className="repositorios">
                    {showRep.map((element, index) => {

                        return (
                            <div key={index} className="repositorios-resultado">
                                <a href={element.html_url} target="_blank">
                                    <p className="titulo-repositorios">{element.name}</p>
                                </a>
                            </div>
                        )
                    })}
                </div>}
                <div className="div-erro">
                    <h1 className="erro">{erro}</h1>
                    {erro.length > 0 ? <img src={IMAGES.Emoji} height="auto" /> : ''}
                </div>
            </div>
        </div>


    )
}


export default Section
