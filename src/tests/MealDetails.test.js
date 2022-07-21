import App from '../App';
import renderWithRouter from './renderWithRouter';
import userEvent from '@testing-library/user-event';
import { act, screen, waitFor } from '@testing-library/react';
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
const TIMEOUT_2000 = 2000;

describe('Testa pagina de detalhes para Meals', () => {
    beforeEach(async () => {
        global.fetch = jest.fn((url) =>
        Promise.resolve({
            json: () => {
              if (url === 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52977') return Promise.resolve(meals);
              if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=corba') return Promise.resolve(meals);
                if (url === 'https://www.themealdb.com/api/json/v1/1/list.php?c=list') return Promise.resolve(mealCategories);
                if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=') return Promise.resolve(drinks)
                if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=') return Promise.resolve(meals)
            },
          })
        );
        await act(async () => {
            renderWithRouter(<App />, '/foods/52977');
          });
      })

  it('Renderiza elementos corretamente dentro da pagina de detalhes',() => {
    expect(screen.getByTestId('recipe-title')).toHaveTextContent(/corba/i);
    expect(screen.getByTestId('recipe-category')).toHaveTextContent(/side/i);

    expect(screen.getByRole('img', { name: /shareIcon/i })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /heartIcon/i })).toBeInTheDocument();

    expect(screen.getByTestId('0-ingredient-name-and-measure')).toHaveTextContent(/Lentils/i);
    expect(screen.getByTestId('1-ingredient-name-and-measure')).toHaveTextContent(/Onion/i);
    expect(screen.getByTestId('2-ingredient-name-and-measure')).toHaveTextContent(/Carrots/i);
    expect(screen.getByTestId('3-ingredient-name-and-measure')).toHaveTextContent(/Tomato Puree/i);
    expect(screen.getByTestId('4-ingredient-name-and-measure')).toHaveTextContent(/Cumin/i);
    expect(screen.getByTestId('5-ingredient-name-and-measure')).toHaveTextContent(/Paprika/i);
    expect(screen.getByTestId('6-ingredient-name-and-measure')).toHaveTextContent(/Mint/i);
    expect(screen.getByTestId('7-ingredient-name-and-measure')).toHaveTextContent(/Thyme/i);
    expect(screen.getByTestId('8-ingredient-name-and-measure')).toHaveTextContent(/Black Pepper/i);

      // expect(screen.getAllByText(corbaInstrucoes)).toBeInTheDocument()
      
      // expect(screen.getByText(/start recipe/i)).toBeInTheDocument();
    })
    it('Usuario consegue interagir com o video ', async () => {
      expect(screen.getByTestId('video')).toBeInTheDocument();
      expect(screen.getByTitle(/youtube video player/i)).toBeInTheDocument();
      userEvent.click(screen.getByTitle(/youtube video player/i))
      userEvent.click(screen.getByTitle(/youtube video player/i))
    })
    it('As recomendações aparecem na tela',() => {
      expect(screen.getByText(/Recommendations/i)).toBeInTheDocument();
      // expect(screen.getByText(/GG/i)).toBeInTheDocument()
      expect(screen.getByTestId('0-recomendation-title')).toBeInTheDocument()
      expect(screen.getByTestId('1-recomendation-title')).toBeInTheDocument()
      expect(screen.getByTestId('2-recomendation-title')).toBeInTheDocument()
      expect(screen.getByTestId('3-recomendation-title')).toBeInTheDocument()
      expect(screen.getByTestId('4-recomendation-title')).toBeInTheDocument()
      expect(screen.getByTestId('5-recomendation-title')).toBeInTheDocument()
  })
  it('Contem botões de left & right e Star Recipe', () => {
    expect(screen.getByRole('button', {name: /left/i})).toBeInTheDocument();
    expect(screen.getByRole('button', {name: /right/i})).toBeInTheDocument();
    expect(screen.getByTestId('start-recipe-btn')).toBeInTheDocument()
  })
  it('ao clicar em Star recipe deve redenrizar a rota "in-progres"', async () => {
    expect(screen.getByTestId('start-recipe-btn')).toBeInTheDocument()
    userEvent.click(screen.getByTestId('start-recipe-btn'))
    await waitFor(() => 
    expect(screen.getByTestId('0-ingredient-step')).toHaveTextContent('Lentils'))
    userEvent.click(screen.getByRole('checkbox', { name: /Lentils/i }))
    expect(screen.getByTestId('1-ingredient-step')).toHaveTextContent('Onion')
    userEvent.click(screen.getByRole('checkbox', { name: /Onion/i }))
    expect(screen.getByTestId('instructions')).toBeInTheDocument()
    expect(screen.getByTestId('finish-recipe-btn')).toBeInTheDocument()
  })
});
