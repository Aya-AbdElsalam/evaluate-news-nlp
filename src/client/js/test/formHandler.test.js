import { init } from "../formHandler";
jest.mock("../nameChecker");
describe("handleSubmit", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <form id="urlForm">
        <input id="name" type="text" name="url" placeholder="Enter URL" required>
        <button id="submitButton" type="submit">Submit</button>
      </form>
    `;
    init();
  });

  test("should prevent default form submission behavior", () => {
    const input = document.getElementById("name");
    input.value = "http://aya.com";
    const event = new Event("submit", { bubbles: true });
    const preventDefaultMock = jest.fn();
    event.preventDefault = preventDefaultMock;
    const form = document.getElementById("urlForm");
    form.dispatchEvent(event);
    expect(preventDefaultMock).toHaveBeenCalled();
  });
});
