import App from '../App';
import renderWithRouter from './renderWithRouter';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('interagir com os botões foods',() => {
    // const obj
    it('Testar foods em local storage vem vazio', async  () => {
        renderWithRouter(<App />, '/foods');
        expect(await screen.findByText(/corba/i)).toBeInTheDocument();
        userEvent.click(screen.getByText(/corba/i));
        expect(await screen.findByTestId('favorite-btn'))
        userEvent.click(await screen.findByTestId('favorite-btn'))
    } )
    it('Testar foods em local storage', async () => {
        localStorage.setItem('favoriteRecipes',
        '[ { "id": "52977", "type": "food", "nationality": "Turkish", "category": "Side", "alcoholicOrNot": "", "name": "Corba", "image": "https://www.themealdb.com/images/media/meals/58oia61564916529.jpg" } ]'
    )
        renderWithRouter(<App />, '/foods');
        expect(await screen.findByText(/corba/i)).toBeInTheDocument();
        userEvent.click(screen.getByText(/corba/i));
        expect(await screen.findByTestId('favorite-btn'))
        .toHaveAttribute('src', 'whiteHeartIcon.svg')
        userEvent.click(screen.getByTestId('favorite-btn'))
        expect(await screen.findByTestId('favorite-btn'))
        .toHaveAttribute('src', 'blackHeartIcon.svg')
        
    })
    it('Link foi copiado',   () => {
        renderWithRouter(<App />, '/drinks/15997')   
        const shareB =  screen.getByTestId('share-btn');
        expect(shareB).toBeInTheDocument();

    })
})
