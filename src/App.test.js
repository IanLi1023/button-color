import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import {logRoles} from '@testing-library/dom';
import { replaceCamelCaseWithSpaces } from './App'

test('button has correct initial color', () => {
  const { container } = render(<App />);
  logRoles(container)

  // find an element with a role button and text 'Change to blue'
  const colorButton = screen.getByRole('button', {name: 'Change to blue'});
  // expect the background color to be red
  expect(colorButton).toHaveStyle({backgroundColor: 'red'});
});

test('initial condition', () => {
  render(<App />);
  const colorButton = screen.getByRole('button', {name: 'Change to blue'})
  expect(colorButton).toBeEnabled()

  const checkBox = screen.getByRole('checkbox');
  expect(checkBox).not.toBeChecked()
})

test("Checkbox disables button on first click and enables on second click", () => {
  render(<App />)
  const checkBox = screen.getByRole('checkbox')
  const colorButton = screen.getByRole('button')

  fireEvent.click(checkBox);
  expect(colorButton).toBeDisabled();

  fireEvent.click(checkBox)
  expect(colorButton).toBeEnabled();
})

test('Disable button has gray background and reverts to red', () => {
  render(<App/>)
  const checkbox = screen.getByRole('checkbox')
  const colorButton = screen.getByRole('button', {name: 'Change to blue'})

  fireEvent.click(checkbox)
  expect(colorButton).toHaveStyle('background-color: gray')
})

test('Clicked disabled button has gray background and reverts to blue', () => {
  render(<App/>)
  const checkbox = screen.getByRole("checkbox")
  const colorButton = screen.getByRole('button', {name: 'Change to blue'})

  fireEvent.click(colorButton)

  fireEvent.click(checkbox)
  expect(colorButton).toHaveStyle('background-color: gray')

  fireEvent.click(checkbox)
  expect(colorButton).toHaveStyle('background-color: blue')
})

describe('spaces before camel-case capital letters', () => {
  test('works for no inner capital letters', () => {
    expect(replaceCamelCaseWithSpaces('Red')).toBe('Red')
  })

  test('works for one inner capital letter', () => {
    expect(replaceCamelCaseWithSpaces('MidnightBlue')).toBe('Midnight Blue')
  })

  test('works for multiple inner capital letter', () => {
    expect(replaceCamelCaseWithSpaces('MediumVioletRed')).toBe('Medium Violet Red')


  })
})
