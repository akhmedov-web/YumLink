import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { Link } from "react-router-dom";

export default function Veggie() {
  useEffect(() => {
    getVeggie();
  }, [])
  const [veggie, setVeggie] = useState([])

  const getVeggie = async () => {
    const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=cd5dcaa06bee4d389cb14692b51c7ff7&number=9&tags=vegetarian`);
    const data = await api.json();
    setVeggie(data.recipes)
  }


  return (
    <Wrapper>
      <h3>Our veggie picks</h3>
      <Splide options={{
        perPage: 3,
        arrows: true,
        pagination: false,
        drag: 'free',
        gap: '4rem',
        autoplay: true,
        interval: 2000,
        breakpoints: {
          600: {
            perPage: 1,
          }
        }
      }}>
        {veggie.map(recipe =>
          <SplideSlide key={recipe.id}>
            <Card>
              <Link to={"/details/" + recipe.id}>
                <p>{recipe.title}</p>
                <img src={recipe.image} alt={recipe.title} />
                <Gradient />
              </Link>
            </Card>
          </SplideSlide>
        )}
      </Splide>
    </Wrapper>
  )
}

const Wrapper = styled.div`
margin: 2rem 0rem;
`;
const Card = styled.div`
min-height: 25rem;
border-radius: 2rem;
overflow: hidden;

img{
  border-radius: 2rem;
  position:absolute;
  left:0;
  width:100%;
  height:100%;
}
p{
  position: absolute;
  z-index: 10;
  left: 50%;
  bottom: 0%;
  transform: translate(-50%, 0%);
  color: white;
  width: 100%;
  text-align:center;
  font-size: 1.3rem;
  font-weight: 600;
  height: 40%;
  display:flex;
  justify-content: center;
  align-items: center;
}
`
const Gradient = styled.div`
z-index: 3;
position:absolute;
width: 100%;
height: 100%;
background: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.7));
border-radius: 2rem;
`