function Card({ name, imageUrl }) {
	return (
		<div className="poke" style={{
			maxWidth: "10rem"
		}}>
			<img src={imageUrl} alt={name} style={{
				maxWidth: "10rem"
			}}/>
			<span style={{
				justifyContent: "center"
			}}>{name}</span>
		</div>
	)
}

export default Card;