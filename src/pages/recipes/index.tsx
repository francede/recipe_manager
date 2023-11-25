import RMButton from '@/components/RMButton/RMButton';
import RMIcon from '@/components/RMIcon/RMIcon';
import { useState } from 'react';
import styles from './index.module.scss';

async function getRecipes() {
    const res: any = await fetch('http://127.0.0.1:8090/api/collections/recipe/records',
        {cache: 'no-store'});
    const data: any = await res.json();
    return data?.items;
}

export default function RecipesPage() {
    const [recipes, setRecipes] = useState([]);

    getRecipes().then(recipes => {
        setRecipes(recipes);
    });

    return(
        <>
            <div>Search bar stuff here <RMIcon>search</RMIcon></div>
            <RMButton color='secondary' href='/recipes/create'>
                <RMIcon>add</RMIcon>Create Recipe
            </RMButton>
            {
                recipes?.map( (recipe: any) => {
                    return (
                        <div key={recipe.id} className={styles['card']}>
                            <a href={'/recipes/'+recipe.id}>
                            <div className={styles['card-title']}>{recipe.name}</div>
                            <div>{recipe.description}</div>
                            <div>{recipe.id}</div>
                            </a>
                        </div>
                    );
                })
            }
        </>
    );
}