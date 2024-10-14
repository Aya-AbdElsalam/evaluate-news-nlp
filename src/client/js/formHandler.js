import { checkForName } from "./nameChecker";

function handleSubmit(event) {
  event.preventDefault();
  const formText = document.getElementById("name").value;
  const isValid = checkForName(formText);
  console.log(isValid);
  if (!isValid) return;
}

function init() {
  const form = document.getElementById("urlForm");
  form ? form.addEventListener("submit", handleSubmit) : "";
}

init();

export { handleSubmit, init };
