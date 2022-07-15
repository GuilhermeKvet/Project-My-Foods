import React from 'react';
import Categorys from '../components/Categorys';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Recipes from '../components/Recipes';

function Drinks() {
  return (
    <>
      <Header title="Drinks" />
      <Categorys url="https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list" category="drinks" />
      <Recipes />
      <Footer />
    </>
  );
}

export default Drinks;
