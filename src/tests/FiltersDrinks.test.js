import renderWithRouter from './renderWithRouter';
import { act, screen } from '@testing-library/react';
import meals from  '../../cypress/mocks/meals';
import drinkCategories from '../../cypress/mocks/drinkCategories';
import mealCategories from '../../cypress/mocks/mealCategories';
import ordinaryDrinks from '../../cypress/mocks/ordinaryDrinks';
import cocktailDrinks from '../../cypress/mocks/cocktailDrinks';
import milkDrinks  from '../../cypress/mocks/milkDrinks';
import otherDrinks from '../../cypress/mocks/otherDrinks';
import cocoaDrinks from '../../cypress/mocks/cocoaDrinks'

import App from '../App';

describe('test drinks', () => {
    beforeEach(async () => {
        global.fetch = jest.fn((url) =>
        Promise.resolve({
            json: () => {
                if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=') return Promise.resolve(meals)
                if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=') return Promise.resolve(drinks); 
                if (url === 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list') return Promise.resolve(drinkCategories);              
                if (url === 'https://www.themealdb.com/api/json/v1/1/list.php?c=list') return Promise.resolve(mealCategories);
                if (url === 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail') return Promise.resolve(cocktailDrinks)
                if (url === 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Shake') return Promise.resolve(milkDrinks)
                if (url === 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Other/Unknown') return Promise.resolve(otherDrinks)
                if (url === 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocoa') return Promise.resolve(cocoaDrinks)
                if (url === 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary_Drink') return Promise.resolve(ordinaryDrinks)
              },  
              
          })
        );
        await act(async () => {
            renderWithRouter(<App />, '/drinks');
          });
      })
    it('App redireciona botões drinks na tela', () => {
        setTimeout(() => {
          expect(screen.findByRole('button', {name: /cocktails/i})).toBeInTheDocument()
          expect(screen.findByRole('button', {name: /shake/i})).toBeInTheDocument()
          expect(screen.findByRole('button', {name: / other\/unknown /i})).toBeInTheDocument()
          expect(screen.findByRole('button', {name: /cocoa/i})).toBeInTheDocument()
          expect(screen.findByRole('button', {name: /ordinary drink/i})).toBeInTheDocument()
            }, 1000)})
            it('Os botões estão filtrando corretamente',() => {
              setTimeout(() => {
              userEvent.click(screen.findByRole('button', {name: /cocktails/i}));
              expect(screen.getByText('\'57 Chevy with a White License Plate')).toBeInTheDocument();
              userEvent.click(screen.findByRole('button', {name: /shake/i}));
              expect(screen.getByText('151 Florida Bushwacker')).toBeInTheDocument();
              userEvent.click(screen.findByRole('button', {name: /other\/unknown/i}));
              expect(screen.getByText('A Piece of Ass')).toBeInTheDocument();
              userEvent.click(screen.findByRole('button', {name: /ordinary drink/i}));
              expect(screen.getByText('3-Mile Long Island Iced Tea')).toBeInTheDocument();
              userEvent.click(screen.findByRole('button', {name: /cocoa/i}));
              expect(screen.getByText('Castillian Hot Chocolate')).toBeInTheDocument();
              }, 1000)
            })
            
})