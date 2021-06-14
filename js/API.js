const d = document;
const $result = d.getElementById("result");
const key = "22076324-d0bd12ebb94d19a6da8914b5c";
const url = "https://pixabay.com/api/";

const limpiarHTML = () => {
	while ($result.firstChild) {
		$result.removeChild($result.firstChild);
	}
};
const mostrarHTML = (datos) => {
	limpiarHTML();
	const { hits } = datos;
	const $templateItem = d.getElementById("templateItem").content;
	const $fragment = d.createDocumentFragment();
	console.log(datos, $templateItem);
	console.log(hits);
	hits.forEach((imagen) => {
		const { webformatURL, tags } = imagen;
		$templateItem
			.querySelector(".main__img")
			.setAttribute("src", webformatURL);
		$templateItem.querySelector(".main__img").setAttribute("alt", tags);
		const clone = $templateItem.cloneNode(true);
		$fragment.appendChild(clone);
	});
	console.log($fragment);
	$result.appendChild($fragment);
};
export const consultarAPI = (category) => {
	const requestURL = `${url}?key=${key}&q=${category}&image_type=photo&lang=es`;

	fetch(requestURL)
		.then((res) => {
			if (res.ok) {
				return res.json();
			} else {
				return Promise.reject(res);
			}
		})
		.then((datos) => mostrarHTML(datos))
		.catch((err) => {
			console.log(err);
		});
};
