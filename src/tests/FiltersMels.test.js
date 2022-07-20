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
  //   beforeEach(async () => {
  //       global.fetch = jest.fn((url) =>
  //       Promise.resolve({
  //           json: () => {
  //               if (url === 'https://www.themealdb.com/api/json/v1/1/list.php?c=list') return Promise.resolve(mealCategories);
  //               if (url === 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=chicken') return Promise.resolve(chickenMeals);
  //               if (url === 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=beef') return Promise.resolve(beefMeals);
  //               if (url === 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=breafast') return Promise.resolve(breakfastMeals);
  //               if (url === 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=dessert') return Promise.resolve(dessertMeals);
  //               if (url === 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=goat') return Promise.resolve(goatMeals);
  //               if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=') return Promise.resolve(drinks)
  //               if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=') return Promise.resolve(meals)
  //               if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?i=') return Promise.resolve(mealsByIngredient);
  //               // if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=soup') return Promise.resolve(soupMeals);
  //               if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?f=y') return Promise.resolve(firstLetterMeals);
  //               if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?f=z') return Promise.resolve(emptyMeals);
  //           },
  //         })
  //       );
  //       await act(async () => {
  //           renderWithRouter(<App />, '/foods');
  //         });
  //     })

  // it('App redireciona Foods na tela', async () => {
  //   // setTimeout(() => {
  //   // expect(screen.getByRole('button', {name: /all/i})).toBeInTheDocument()
  //   // expect(screen.getByRole('button', {name: /beef/i})).toBeInTheDocument()
  //   // expect(screen.getByRole('button', {name: /breakfast/i})).toBeInTheDocument()
  //   // expect(screen.getByRole('button', {name: /chicken/i})).toBeInTheDocument()
  //   // expect(screen.getByRole('button', {name: /dessert/i})).toBeInTheDocument()
  //   // expect(screen.getByRole('button', {name: /goat/i})).toBeInTheDocument()
  //   // }, 1000);
  // })
  // it('Os botões estão filtrando corretamente', async () => {
  //   // setTimeout(() => {
  //     console.log('asasdsada');
  //     // userEvent.click(screen.getByRole('button', {name: /beef/i}));
  //     // expect(screen.getByText('Beef and Mustard Pie')).toBeInTheDocument();
  //     // userEvent.click(screen.findByRole('button', {name: /breakfast/i}));
  //     // expect(screen.getByText('Breakfast Potatoes')).toBeInTheDocument();
  //     const seila = await screen.findByText(/chicken/i);
  //     userEvent.click(seila);
  //     expect(screen.getByText('Bsadsad sajd oasdStew Chicken')).toBeInTheDocument();
  //     // userEvent.click(screen.findByRole('button', {name: /dessert/i}));
  //     // expect(screen.getByText('Apple & Blackberry Crumble')).toBeInTheDocument();
  //     // userEvent.click(screen.findByRole('button', {name: /goat/i}));
  //     // expect(screen.getByText('Mbuzi Cho (Roasted Goat)')).toBeInTheDocument();
  //   // }, 1000)
  // })
  
});
