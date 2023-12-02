import "./card.css";

interface CardProps {
    preco: number,
    nome: string,
    urlFoto: string
}

export function Card({ preco, urlFoto, nome } : CardProps){
    return(
        <div className="card">
            <img src={urlFoto}/>
            <a className="card-title">{nome}</a>
            <a className="card-price"><b>R$ {preco}</b></a>
        </div>
    )
}