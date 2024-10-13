const { checkForName } = require('../nameChecker');
describe('checkForName', () => {
  test('should alert when no input is provided', () => {
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
    checkForName('');
    expect(alertMock).toHaveBeenCalledWith('Please enter a URL.');
    alertMock.mockRestore();
  });
});
