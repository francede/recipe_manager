'use client'

import RMFileChooser from '@/components/RMFileChooser/RMFileChooser';
import RMIconButton from '@/components/RMIconButton/RMIconButton';
import RMInput from '@/components/RMInput/RMInput';
import { PocketBaseService } from '@/services/pocketbase/pocketbaseService';
import AuthService from '@/services/pocketbase/authService';
import RecipeService from '@/services/recipeService';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from './[id].module.scss';

async function getRecipe(id: string) {
    return RecipeService.getRecipe(id);;
}


export default function RecipePage() {
    const [imgSrc, setImgSrc] = useState<any>(null);
    const [image, setImage] = useState<any>(null);
    const [recipe, setRecipe] = useState<any>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [editMode, setEditMode] = useState<boolean>(false);
    const [editDisabled, setEditDisabled] = useState<boolean>(true);
    const router = useRouter()
    const id: any = router.query.id

    useEffect(() => {
        setEditDisabled(AuthService.getUser()?.id !== recipe?.owner);
    })

    if((id ?? false) && (recipe?.id !== id) && (!isLoading)) {
        setIsLoading(true);
        getRecipe(id).then(recipe => {
            console.log(recipe, typeof(recipe))
            setRecipe(recipe);
            setIsLoading(false);
        });
    }

    if(!recipe){
        return <div>404!!!</div>
    }

    const save = () => {
        let recipeFields: any = {
            name: recipe.name,
            description: recipe.description
        }
        setIsLoading(true);
        RecipeService.updateRecipe(recipe.id, recipeFields, image).then((newRecipe) =>{
            setRecipe(newRecipe);
            setImage(null);
            setImgSrc(null);
            setEditMode(false);
            setIsLoading(false);
        });
    }

    const getImageSrc = () => {
        return imgSrc ?? `${PocketBaseService.PB_HOST}${PocketBaseService.PB_FILES}${PocketBaseService.PB_RECIPE}/${recipe.id}/${recipe.image}`;
    }

    if(isLoading){
        return <div>LOADING...</div>
    }

    return (
        <div className={styles['container']}>
            <div className={styles['header-container']}>
                {editMode
                    ? <RMInput type='text' value={recipe.name} 
                        onChange={(event) => {setRecipe({...recipe, name: event})}}/>
                    : <h1>{recipe.name}</h1>
                    
                }
                <span>id: {recipe.id}</span>
                <RMIconButton color='secondary' disabled={editDisabled} 
                    onClick={() => {editMode ? save() : setEditMode(true)}}>{editMode ? 'save' : 'edit'}</RMIconButton>
            </div>

            <span>By {recipe?.expand?.owner?.username}</span>
            

            {editMode
                ? <RMInput type='textarea' value={recipe.description}
                    onChange={(event) => {setRecipe({...recipe, description: event})}}/>
                : <div>{recipe.description}</div>
            }

            <img src={getImageSrc()} className={styles.img}></img>
            {editMode && <RMFileChooser icon='add_a_photo' tooltipOptions={{text:'Add recipe image', width:175}} className={styles.file} onChange={(img) => {
                setImage(img);
                setImgSrc(URL.createObjectURL(img));
            }}></RMFileChooser>}
        </div>
    );
}

