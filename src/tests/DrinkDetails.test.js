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

const drinkInstrucoes = 'Pour the Galliano liqueur over ice. Fill the remainder of the glass with ginger ale and thats all there is to it';

describe('Testa pagina de detalhes para Drinks', () => {
    beforeEach(async () => {
        global.fetch = jest.fn((url) =>
        Promise.resolve({
            json: () => {
                if (url === 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list') return Promise.resolve(drinkCategories); 
                if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=') return Promise.resolve(drinks)
                // if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=') return Promise.resolve(meals)
            },
          })
        );
        await act(async () => {
            renderWithRouter(<App />, '/drinks');
          });
      })

  it('Renderiza elementos corretamente dentro da pagina de detalhes',() => {
    const ggElement = screen.getByTestId('0-recipe-card');
    expect(ggElement).toBeInTheDocument();
    userEvent.click(ggElement);

    expect(screen.getByText(/gg/i)).toBeInTheDocument();
    expect(screen.getByText(/ordinary Drink/i)).toBeInTheDocument();

    expect(screen.getByText(/ingredients/i)).toBeInTheDocument();

    expect(screen.getByText(/Galliano/i)).toBeInTheDocument();
    expect(screen.getByText(/Ginger ale/i)).toBeInTheDocument();
    expect(screen.getByText(/Ice/i)).toBeInTheDocument();

    expect(screen.getAllByText(drinkInstrucoes)).toBeInTheDocument()
    expect(screen.getByRole('img', { name: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg' })).toBeInTheDocument();
    expect(screen.getByText(/recomended/i)).toBeInTheDocument();
    expect(screen.getByText(/start recipe/i)).toBeInTheDocument();
  })
  
});
