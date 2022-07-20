import App from '../App';
import renderWithRouter from './renderWithRouter';
import userEvent from '@testing-library/user-event';
import { act, screen } from '@testing-library/react';
import meals from  '../../cypress/mocks/meals';
// import chickenMeals from '../../cypress/mocks/chickenMeals';
// import goatMeals from '../../cypress/mocks/goatMeals';
// import breakfastMeals from '../../cypress/mocks/breakfastMeals';
// import beefMeals from '../../cypress/mocks/beefMeals';
// import dessertMeals from '../../cypress/mocks/dessertMeals';
import drinks from '../../cypress/mocks/drinks';
// import mealsByIngredient from '../../cypress/mocks/mealsByIngredient';
// import soupMeals from '../../cypress/mocks/soupMeals';
// import firstLetterMeals from './mocks/firstLetterMeals';
// import emptyMeals from '../../cypress/mocks/emptyMeals';
// import mealCategories from '../../cypress/mocks/mealCategories';
import drinkCategories from '../../cypress/mocks/drinkCategories';

const drinkInstrucoes = /Pour the Galliano liqueur over ice. Fill the remainder of the glass with ginger ale and thats all there is to it/i;
const TIMEOUT_1000 = 1000;

describe('Testa pagina de detalhes para Drinks', () => {
    beforeEach(async () => {
        global.fetch = jest.fn((url) =>
        Promise.resolve({
            json: () => {
              if (url === 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=15997') return Promise.resolve(drinks);
              if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=gg') return Promise.resolve(drinks);
                if (url === 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list') return Promise.resolve(drinkCategories); 
                if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=') return Promise.resolve(drinks)
                // if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=') return Promise.resolve(meals)
            },
          })
        );
        await act(async () => {
            renderWithRouter(<App />, 'drinks/15997');
          });
      })

  it('Renderiza elementos corretamente dentro da pagina de detalhes',() => {
      expect(screen.getByTestId('recipe-title')).toHaveTextContent('GG');
      expect(screen.getByTestId('recipe-category')).toHaveTextContent(/optional alcohol/i);

      expect(screen.getByRole('img', { name: /shareIcon/i })).toBeInTheDocument();
      expect(screen.getByRole('img', { name: /heartIcon/i })).toBeInTheDocument();

      // expect(screen.getByText(/ingredients/i)).toBeInTheDocument();
      expect(screen.getByTestId('0-ingredient-name-and-measure')).toHaveTextContent(/galliano/i);
      expect(screen.getByTestId('1-ingredient-name-and-measure')).toHaveTextContent(/ginger ale/i);
      expect(screen.getByTestId('2-ingredient-name-and-measure')).toHaveTextContent(/ice/i);

      expect(screen.getByText(drinkInstrucoes)).toBeInTheDocument();
      expect(screen.getByText(/recommendations/i)).toBeInTheDocument();

      expect(screen.getByRole('img', { name: /corba/i })).toBeInTheDocument();
      expect(screen.getByRole('img', { name: /kumpir/i })).toBeInTheDocument();
      expect(screen.getByRole('img', { name: /dal fry/i })).toBeInTheDocument();
      expect(screen.getByRole('img', { name: /poutine/i })).toBeInTheDocument();
      expect(screen.getByRole('img', { name: /lasagne/i })).toBeInTheDocument();
      expect(screen.getByRole('img', { name: /timbits/i })).toBeInTheDocument();

      // expect(screen.getByText(/start recipe/i)).toBeInTheDocument();
    })
});
