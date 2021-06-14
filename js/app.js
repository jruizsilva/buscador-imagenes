import { consultarAPI } from "./API.js";

const d = document;

const $formulario = d.getElementById("formulario");

$formulario.addEventListener("submit", (e) => {
	e.preventDefault();
	const category = $formulario.category.value;

	consultarAPI(category);
});
