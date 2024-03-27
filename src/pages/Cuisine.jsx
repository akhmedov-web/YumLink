import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Cuisine() {
  const [cuisine, setCuisine] = useState([]);
  const params = useParams();
  const getCuisine = async (name) => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/random?apiKey=cd5dcaa06bee4d389cb14692b51c7ff7&number=9&cuisine=${name}`
    );
    const recipes = await data.json();
    setCuisine(recipes.recipes);
  }

  useEffect(() => {
    getCuisine(params.type);
  }, [params.type])
  console.log(cuisine)
  return (
    <Grid 
    animate={{opacity:1}}
    initial={{opacity:0}}
    exit={{opacity:0}}
    transition={{duration: 0.5}}
    >
      {cuisine.map(recipe =>
        <Card key={recipe.id}>
          <Link to={"/details/"+recipe.id}>
            <img src={recipe.image} alt={recipe.title} />
            <h4>{recipe.title}</h4>
          </Link>
        </Card>
      )}
    </Grid>
  )
}

const Grid = styled(motion.div)`
display: grid;
grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
grid-gap: 3rem;
`
const Card = styled.div`
img{
  width: 100%;
  border-radius: 2rem;
}
a{
  text-decoration: none;
}
h4{
  text-align:center;
  padding: 1rem;
}
`