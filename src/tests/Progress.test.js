import App from '../App';
const { screen } = require('@testing-library/react');
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';


describe('in-progress', () => {
    it('', async () => {
        const { history } = renderWithRouter(  <App />)
        history.push('/foods');
        expect(screen.getByRole('heading', { name: /foods/i })).toBeInTheDocument()
        expect(await screen.findByText(/corba/i)).toBeInTheDocument();
        userEvent.click(await screen.findByText(/corba/i));
        expect(history.location.pathname).toBe('/foods/52977');
        expect(await screen.findByRole('heading', { name: /corba/i })).toBeInTheDocument();
        expect(screen.getByTestId('share-btn')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /start recipe/i })).toBeInTheDocument();
        userEvent.click(screen.getByRole('button', { name: /start recipe/i }));
        expect(history.location.pathname).toBe('/foods/52977/in-progress');  
    })
})