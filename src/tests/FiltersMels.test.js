import App from '../App';
import renderWithRouter from './renderWithRouter';
import userEvent from '@testing-library/user-event';
import { act, screen } from '@testing-library/react';
import meals from  '../../cypress/mocks/meals';
import chickenMeals from '../../cypress/mocks/chickenMeals';
import goatMeals from '../../cypress/mocks/goatMeals';
import breakfastMeals from '../../cypress/mocks/breakfastMeals';
import beefMeals from '../../cypress/mocks/beefMeals';
import dessertMeals from '../../cypress/mocks/dessertMeals';
import drinks from '../../cypress/mocks/drinks';
import mealsByIngredient from '../../cypress/mocks/mealsByIngredient';
import soupMeals from '../../cypress/mocks/soupMeals';
import firstLetterMeals from './mocks/firstLetterMeals';
import emptyMeals from '../../cypress/mocks/emptyMeals';
import mealCategories from '../../cypress/mocks/mealCategories';

describe('Filtros Foods', () => {
    beforeEach(async () => {
        global.fetch = jest.fn((url) =>
        Promise.resolve({
            json: async () => {
                if (url === 'https://www.themealdb.com/api/json/v1/1/list.php?c=list') return (mealCategories);
                if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken') return (chickenMeals);
                if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?i=beef') return (beefMeals);
                if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?i=breafast') return (breakfastMeals);
                if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?i=dessert') return (dessertMeals);
                if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?i=goat') return (goatMeals);
                if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=') return (drinks)
                if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=') return (meals)
                if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?i=') return (mealsByIngredient);
                if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=soup') return (soupMeals);
                if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?f=y') return (firstLetterMeals);
                if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?f=z') return (emptyMeals);
            },
          })
        );
        await act(async () => {
            renderWithRouter(<App />, '/foods');
          });
      })

  it('App redireciona Foods na tela', () => {
    setTimeout(() => {
    expect(screen.findByRole('button', {name: /all/i})).toBeInTheDocument()
    expect(screen.findByRole('button', {name: /beef/i})).toBeInTheDocument()
    expect(screen.findByRole('button', {name: /breakfast/i})).toBeInTheDocument()
    expect(screen.findByRole('button', {name: /chicken/i})).toBeInTheDocument()
    expect(screen.findByRole('button', {name: /dessert/i})).toBeInTheDocument()
    expect(screen.findByRole('button', {name: /goat/i})).toBeInTheDocument()
    }, 1000)})
  it('Os botões estão filtrando corretamente',() => {
    setTimeout(() => {
    userEvent.click(screen.findByRole('button', {name: /beef/i}));
    expect(screen.getByText('Beef and Mustard Pie')).toBeInTheDocument();
    userEvent.click(screen.findByRole('button', {name: /breakfast/i}));
    expect(screen.getByText('Breakfast Potatoes')).toBeInTheDocument();
    userEvent.click(screen.findByRole('button', {name: /chicken/i}));
    expect(screen.getByText('Brown Stew Chicken')).toBeInTheDocument();
    userEvent.click(screen.findByRole('button', {name: /dessert/i}));
    expect(screen.getByText('Apple & Blackberry Crumble')).toBeInTheDocument();
    // userEvent.click(scrren.findByRole('button', {name: /goat/i}));
    // expect(screen.getByText('Mbuzi Choma (Roasted Goat)')).toBeInTheDocument();
    }, 1000)
  })
  
});
