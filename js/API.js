const d = document;
const $result = d.getElementById("result");
const $pagination = d.getElementById("pagination");
const key = "22076324-d0bd12ebb94d19a6da8914b5c";
const url = "https://pixabay.com/api/";
let imagenesPorPagina = 40;
let cantidadPaginas;
let currentPage = 1;

const limpiarHTML = () => {
	while ($result.firstChild) {
		$result.removeChild($result.firstChild);
	}
};
const limpiarPaginacion = () => {
	while ($pagination.firstChild) {
		$pagination.removeChild($pagination.firstChild);
	}
};

const cambiarPaginaActual = (e) => {
	if (e.target.classList.contains("pagination__link")) {
		const $link = e.target;
		currentPage = parseInt($link.getAttribute("data-page"));
		consultarAPI();
	}
};

function* generadorPaginacion() {
	for (let i = 1; i <= cantidadPaginas; i++) {
		yield i;
	}
}
const mostrarPaginacion = () => {
	limpiarPaginacion();
	const $template = d.getElementById("templatePagination").content;
	const iterador = generadorPaginacion();
	while (true) {
		const { value, done } = iterador.next();
		if (done) {
			return;
		}
		const $link = $template.querySelector(".pagination__link");
		$link.dataset.page = value;
		$link.textContent = value;
		if (value === currentPage) {
			$link.classList.add("pagination__link--active");
		} else {
			$link.classList.remove("pagination__link--active");
		}
		const $clone = $template.cloneNode(true);
		$pagination.appendChild($clone);
		$pagination.addEventListener("click", cambiarPaginaActual);
	}
};
const mostrarHTML = (hits) => {
	limpiarHTML();
	const $templateItem = d.getElementById("templateItem").content;
	const $fragment = d.createDocumentFragment();
	hits.forEach((imagen) => {
		const { webformatURL, tags } = imagen;
		$templateItem
			.querySelector(".main__img")
			.setAttribute("src", webformatURL);
		$templateItem.querySelector(".main__img").setAttribute("alt", tags);
		const clone = $templateItem.cloneNode(true);
		$fragment.appendChild(clone);
	});
	$result.appendChild($fragment);

	mostrarPaginacion();
};

const calcularPaginas = (imagenes) => {
	cantidadPaginas = Math.ceil(imagenes / imagenesPorPagina);
};
export const consultarAPI = () => {
	const busqueda = d.getElementById("busqueda").value;

	const requestURL = `${url}?key=${key}&q=${busqueda}&image_type=photo&lang=es&per_page=${imagenesPorPagina}&page=${currentPage}&safesearch=true`;

	fetch(requestURL)
		.then((res) => {
			if (res.ok) {
				return res.json();
			} else {
				return Promise.reject(res);
			}
		})
		.then((datos) => {
			const { hits, totalHits } = datos;
			calcularPaginas(totalHits);
			mostrarHTML(hits);
		})
		.catch((err) => {
			console.log(err);
		});
};
