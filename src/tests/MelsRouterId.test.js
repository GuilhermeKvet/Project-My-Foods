// import App from '../App';
// import renderWithRouter from './renderWithRouter';
// import meals from  '../../cypress/mocks/meals';
// import chickenMeals from '../../cypress/mocks/chickenMeals';
// import goatMeals from '../../cypress/mocks/goatMeals';
// import breakfastMeals from '../../cypress/mocks/breakfastMeals';
// import beefMeals from '../../cypress/mocks/beefMeals';
// import dessertMeals from '../../cypress/mocks/dessertMeals';
// import drinks from '../../cypress/mocks/drinks';
// import mealsByIngredient from '../../cypress/mocks/mealsByIngredient';
// import firstLetterMeals from './mocks/firstLetterMeals';
// import emptyMeals from '../../cypress/mocks/emptyMeals';
// import mealCategories from '../../cypress/mocks/mealCategories';
// import userEvent from '@testing-library/user-event';
// import { act, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';

// describe('', () => {
//     beforeEach(async () => {
//         global.fetch = jest.fn((url) =>
//         Promise.resolve({
//           json: async () => {
//             console.log(url)
//             if (url === 'https://www.themealdb.com/api/json/v1/1/list.php?c=list') return mealCategories;
//             if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Chicken') return chickenMeals;
//             if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef') return beefMeals;
//             if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Breakfast') return breakfastMeals;
//             if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert') return dessertMeals
//             if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Goat') return goatMeals;
//             if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=') return drinks;
//             if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=') return meals;
//             if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?i=') return mealsByIngredient;
//             if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?f=y') return firstLetterMeals;
//             if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?f=z') return emptyMeals;
//           },
//         }));
//         await act(async () => {
//             renderWithRouter(<App />, '/foods');
//           });
//       });
//  // foods/52977
//     it('teste', () => {
//         expect(screen.getByText(/corba/i)).toBeInTheDocument()
//         userEvent.click(screen.getByRole('button', /corba/i))
//     })
// })
