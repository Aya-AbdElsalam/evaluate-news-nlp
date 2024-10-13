function checkForName(inputText) {
  const expression =
    /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;
  const regex = new RegExp(expression);

  if (!inputText) {
    alert("Please enter a URL.");
    return;
  }

  if (!inputText.match(regex)) {
    alert("Please enter a valid URL.");
    return;
  }
  const serverURL = "http://localhost:9000/api";
  document.getElementById("results").innerHTML = ``;
  fetch(serverURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url: inputText }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      document.getElementById("results").innerHTML = `
          <p>Language
: ${data.results.response.language.toUpperCase()}</p>
          <p>language Is Reliable: ${
            data.results.response.languageIsReliable == false ? "No" : "Yes"
          }</p>
          <p>Text: ${inputText}</p>
      `;
    })
    .catch((error) => {
      alert("Error processing the request.");
    });
}

export { checkForName };
