import { useEffect, useState } from "react"
import Card from "./Card"

// Fisher-Yates shuffle https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
	let currentIndex = array.length,
		randomIndex;

	// While there remain elements to shuffle.
	while (currentIndex > 0) {
		// Pick a remaining element.
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		// And swap it with the current element.
		[array[currentIndex], array[randomIndex]] = [
			array[randomIndex],
			array[currentIndex],
		];
	}

	return array;
}

function CardList() {
	const [cards, setCards] = useState([]);
	useEffect(() => {
		const newCards = [];
		fetch("https://pokeapi.co/api/v2/pokemon?limit=10000").then((data) =>
			data.json().then((json) => {
				const pokemons = shuffle(json.results).slice(0, 39);

				const requests = [];
				for (let pokemon of pokemons) {
					const request = fetch(pokemon.url).then((dat) =>
						dat.json().then((po) => {
							const name = pokemon.name;
							const imageUrl =
								po.sprites.other["official-artwork"].front_default || po.sprites.other["dream_world"].front_default;
							newCards.push([name.toUpperCase(), imageUrl]);
						})
					);
					requests.push(
						request
					);
				}
				Promise.all(requests).then(() => {
					setCards(newCards);
				}) 
			})
		);
		
	}, [])

	return (
		<div style={{
			display: "flex",
			justifyContent: "center",
			alignContent: "center",
			flexDirection: "row",
			flexWrap: "wrap"
		}}>
			{cards.map(card => {
				return (
					<Card name={card[0]} imageUrl={card[1]} />
				)
			})}
		</div>		
	)
}

export default CardList;