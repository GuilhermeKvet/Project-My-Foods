import App from '../App';
import renderWithRouter from './renderWithRouter';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('interagir com os botões drinks',  () => {
    it('Testar foods em local storage vem vazio', async () => {
        renderWithRouter(<App />, '/drinks');
        expect(await screen.findByText(/GG/i)).toBeInTheDocument();
        userEvent.click(screen.getByText(/GG/i));
        expect(await screen.findByTestId('favorite-btn'))
        userEvent.click(await screen.findByTestId('favorite-btn'))
    })
    it('Testar foods em local storage', async () => {
        localStorage.setItem('favoriteRecipes', 
        '[{"id":"15997","type":"drink","nationality":"","category":"Ordinary Drink","alcoholicOrNot":"Optional alcohol","name":"GG","image":"https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg"}]'     
    )
        renderWithRouter(<App />, '/drinks');
        expect(await screen.findByText(/GG/i)).toBeInTheDocument();
        userEvent.click(screen.getByText(/GG/i));
        expect(await screen.findByTestId('favorite-btn'))
        .toHaveAttribute('src', 'whiteHeartIcon.svg')
        userEvent.click(screen.getByTestId('favorite-btn'))
        expect(await screen.findByTestId('favorite-btn'))
        .toHaveAttribute('src', 'blackHeartIcon.svg')
    })

    it('Link foi copiado',  () => {
        // const clipboardData = 'Link copied!'
        // const mockClipboard = {
        //     writeText: jest.fn(
        //         (data) => {clipboardData = data}
        //         ),
        //         readText: jest.fn(
        //             () => {return clipboardData}  
        //             ),
        //         };
        //         global.navigator.clipboard = mockClipboard;
                
        renderWithRouter(<App />, '/drinks/15997')
        const shareButton = screen.getByTestId('share-btn');

        expect(shareButton).toBeInTheDocument();
        // userEvent.click(shareButton)
        // expect(screen.getByText(clipboardData)).toBeInTheDocument()
    })
})


