function Card({ name, imageUrl }) {
	return (
		<div className="poke" style={{
			maxWidth: "20rem"
		}}>
			<img src={imageUrl} alt={name} style={{
				maxWidth: "20rem"
			}}/>
			{/* <span style={{
				justifyContent: "center"
			}}>{name}</span> */}
		</div>
	)
}

export default Card;