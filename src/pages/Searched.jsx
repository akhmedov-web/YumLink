import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import styled from "styled-components";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Searched() {
    let params = useParams();
    const [search, setSearch] = useState([1]);

    const getSearched = async (name) => {
        const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${name}&apiKey=cd5dcaa06bee4d389cb14692b51c7ff7&number=16`);
        const recipe = await data.json();
        setSearch(recipe.results);
    }

    useEffect(() => {
        getSearched(params.search);
    }, [params.search]);
    return (
        <Grid
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            {search.length>=1&&(
                search.map(recipe =>
                    <Card key={recipe.id}>
                        <Link to={"/details/" + recipe.id}>
                            <img src={recipe.image} alt={recipe.title} />
                            <h4>{recipe.title}</h4>
                        </Link>
                    </Card>
                )
            )}
            {search.length==0&&(
                <h3>You caught us. We can't help you cook <span style={{color:"red"}}>{params.search}</span> yet!</h3>
            )}
        </Grid>
    )
}

const Grid = styled(motion.div)`
display: grid;
grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
grid-gap: 3rem;

h3{
    text-align:center;
}
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
