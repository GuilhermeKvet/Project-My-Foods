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
import mealCategories from '../../cypress/mocks/mealCategories';

const corbaInstrucoes = /pick through your lentils for any foreign debris, rinse them 2 or 3 times/i;

describe('Testa pagina de detalhes para Meals', () => {
    beforeEach(async () => {
        global.fetch = jest.fn((url) =>
        Promise.resolve({
            json: () => {
                if (url === 'https://www.themealdb.com/api/json/v1/1/list.php?c=list') return Promise.resolve(mealCategories);
                if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=') return Promise.resolve(drinks)
                if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=') return Promise.resolve(meals)
            },
          })
        );
        await act(async () => {
            renderWithRouter(<App />, '/foods');
          });
      })

  it('Renderiza elementos corretamente dentro da pagina de detalhes',() => {
    const corbaElement = screen.getByTestId('0-recipe-card');
    expect(corbaElement).toBeInTheDocument();
    userEvent.click(corbaElement);

    expect(screen.getByText(/corba/i)).toBeInTheDocument();
    expect(screen.getByText(/soup/i)).toBeInTheDocument();

    expect(screen.getByText(/ingredients/i)).toBeInTheDocument();

    expect(screen.getByText(/Lentils/i)).toBeInTheDocument();
    expect(screen.getByText(/Onion/i)).toBeInTheDocument();
    expect(screen.getByText(/Tomato-Puree/i)).toBeInTheDocument();
    expect(screen.getByText(/Carrots/i)).toBeInTheDocument();
    expect(screen.getByText(/Vegetable-Stock /i)).toBeInTheDocument();
    expect(screen.getByText(/Mint/i)).toBeInTheDocument();

    expect(screen.getAllByText(corbaInstrucoes)).toBeInTheDocument()
    expect(screen.getByRole('img', { name: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg' })).toBeInTheDocument();
    expect(screen.getByText(/recomended/i)).toBeInTheDocument();
    expect(screen.getByText(/start recipe/i)).toBeInTheDocument();
    // 'https://www.youtube.com/watch?v=VVnZd8A84z4' video da comida
  })
  
});
