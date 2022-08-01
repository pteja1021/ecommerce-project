import './card-styling.css'
function Card(props){
    const item=props['data']
    return (
        <div className='card-container'>
                <img className='card-image' src={item['image']} alt="bottles"/>
                <p className='card-heading'>{item['name']}</p>
                <p className="card-description">{item['description']}</p>
                <p className="card-price">Price: <span>{`$ ${item['price']}`}</span></p>
        </div>
    )
}
export default Card;