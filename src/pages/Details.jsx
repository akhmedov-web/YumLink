import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from "styled-components";

export default function Details() {
    const params = useParams();
    const [details, setDetails] = useState({ extendedIngredients: [] });
    const [activeTab, setActiveTab] = useState("instructions");
    const getDetails = async (id) => {
        const data = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=cd5dcaa06bee4d389cb14692b51c7ff7`);
        const recipe = await data.json();
        setDetails(recipe);
    }
    useEffect(() => {
        getDetails(params.id);
    }, [params.id])
    console.log(details.extendedIngredients)
    return (
        <DetailsWrapper>
            <div>
                <h2>{details.title}</h2>
                <img src={details.image} alt={details.title} />
            </div>
            <Info>
                <Button className={activeTab === "instructions" ? "active" : ""} onClick={() => setActiveTab("instructions")}>Instructions</Button>
                <Button className={activeTab === "ingredients" ? "active" : ""} onClick={() => setActiveTab("ingredients")}>Ingredients</Button>
                {activeTab === "instructions" && (
                    <div>
                        <h3 dangerouslySetInnerHTML={{ __html: details.summary }}></h3>
                        <ol dangerouslySetInnerHTML={{ __html: details.instructions }}></ol>
                    </div>
                )}
                {activeTab === "ingredients" && (
                    <ul>
                        {details.extendedIngredients.map((ingredient) => (
                            <li key={ingredient.id}>{ingredient.original}</li>
                        ))}
                    </ul>
                )}
            </Info>
        </DetailsWrapper>
    )
}

const DetailsWrapper = styled.div`
margin-top: 10rem;
margin-bottom: 5rem;
display: flex;
flex-direction:row;
.active{
    background: linear-gradient(35deg, #494949, #313131);
    color: white;
}
@media (max-width: 600px) {
    margin-top: 1.5rem;
    flex-direction: column;
    img{
        width: 100%
    }
    }
h2{
    margin-bottom: 2rem;
}
li{
    font-size: 1.2rem;
    line-height: 2.5rem;
}
ul{
    margin-top: 2rem;
}
`;

const Button = styled.button`
padding: 1rem 2rem;
color: #313131;
background: white;
border: 2px solid black;
margin-right: 2rem;
font-weight: 600;
cursor: pointer;

@media (max-width: 600px) {
    padding: 0.7rem 0.7rem;
    margin-top: 1rem;
}
`;

const Info = styled.div`
margin-left: 10rem;

@media (max-width: 600px) {
    margin-left: 0.5rem;
}
`;