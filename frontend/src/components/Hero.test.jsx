import { render, screen } from '@testing-library/react'
import Hero from './Hero'
import { BrowserRouter as Router } from 'react-router-dom'

const renderWithRouter = (component) => {
  return {
    ...render(<Router>{component}</Router>),
  }
}

test('renders Hero component', () => {
  renderWithRouter(<Hero />)
  const linkElement = screen.getByText(/Start exploring/i)
  expect(linkElement).toBeInTheDocument()
})


