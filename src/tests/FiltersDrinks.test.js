import renderWithRouter from './renderWithRouter';
// import ordinaryDrinks from '../cypress/mocks/ordinaryDrinks';
// import cocktailDrinks from '../cypress/mocks/cocktailDrinks';
// import milkDrinks  from '../cypress/mocks/milkDrinks';
// import otherDrinks from '../cypress/mocks/otherDrinks';

import App from '../App';
import { act } from 'react-dom/test-utils';


describe('test drinks', () => {
    beforeEach(async () => {
        global.fetch = jest.fn((url) =>
        Promise.resolve({
            json: () => {
                if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=') return Promise.resolve(drinks)
;
            },
          })
        );
        await act(async () => {
            renderWithRouter(<App />, '/drinks');
          });
      })
    it('App redireciona botões drinks na tela', () => {
        renderWithRouter(<App />, '/drinks');
        setTimeout(() => {
            expect(screen.findByRole('button', {name: /ordinary drink/i})).toBeInTheDocument()
            expect(screen.findByRole('button', {name: /cocktails/i})).toBeInTheDocument()
            expect(screen.findByRole('button', {name: /shake/i})).toBeInTheDocument()
            expect(screen.findByRole('button', {name: / other\/unknown /i})).toBeInTheDocument()
            expect(screen.findByRole('button', {name: /cocoa/i})).toBeInTheDocument()
            }, 1000)})
            
})