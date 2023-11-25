import RMButton from '@/components/RMButton/RMButton';
import RMDivider from '@/components/RMDivider/RMDivider';
import RMFileChooser from '@/components/RMFileChooser/RMFileChooser';
import RMIcon from '@/components/RMIcon/RMIcon';
import RMIconButton from '@/components/RMIconButton/RMIconButton';
import RMChipList from '@/components/RMInput copy/RMChipList';
import RMInput from '@/components/RMInput/RMInput';
import { RecipeIngredientsRecord, RecipeRecord, TagRecord } from '@/services/pocketbase/pocketbase-types';
import { PocketBaseService } from '@/services/pocketbase/pocketbaseService';
import AuthService from '@/services/pocketbase/authService';
import RecipeService from '@/services/recipeService';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from './create.module.scss';


export default function CreateRecipePage() {
    const [recipe, setRecipe] = useState<CreateRecipeRecord>({name: '', description: ''});
    const [ingredients, setIngredients] = useState<CreateRecipeIngredientsRecord[]>([]);
    const [tags, setTags] = useState<TagRecord[]>([]);
    const [tagOptions, setTagOptions] = useState<TagRecord[] | null>(null);
    const [imgSrc, setImgSrc] = useState<any>(null);
    const [image, setImage] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [saveDisabled, setSaveDisabled] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        setSaveDisabled(AuthService.getUser() === null);
        tagOptions === null && getTagsStartingWith('').then(r => setTagOptions(r.items));
    })

    
    const save = () => {
        const userId = AuthService.getUser()?.id;
        if(!userId){
            alert("Log in to create recipes");
            return;
        }
        setLoading(true);
        RecipeService.addRecipe({...recipe, owner: userId}, image).then((newRecipe) => {
            router.push(`/recipes/${newRecipe.id}`);
        }, (err) => console.log(err))
    }

    const addIngredient = () => {
        setIngredients([...ingredients, {name: '',unit: ''}]);
    }

    const removeIngredient = (index: number) => {
        const newIngredients = [...ingredients];
        newIngredients.splice(index, 1);
        setIngredients(newIngredients);
    }

    const changeIngredient = (index: number, value: CreateRecipeIngredientsRecord) => {
        const newIngredients = [...ingredients];
        newIngredients[index] = value;
        setIngredients(newIngredients);
    }

    const swapIngredients = (index1: number, index2: number) => {
        const newIngredients = [...ingredients];
        [newIngredients[index1], newIngredients[index2]] = [newIngredients[index2], newIngredients[index1]]
        setIngredients(newIngredients);
    }

    const removeTag = (name: string) => {
        const newTags = [...tags];
        newTags.splice(tags.findIndex((t) => t.name === name), 1);
        setTags(newTags);
    }

    const getTagsStartingWith = (s: string) => {
        return RecipeService.getTagsStartingWith(s);
    }

    if(loading){
        return <div>Creating recipe...</div>
    }

    return (
        <div className={styles['container']}>
            <div style={{display: 'flex', gap: '18px'}}>
                <div style={{display: 'flex', flexDirection: 'column', gap: '6px'}}>
                    <RMInput placeholder='Recipe Name' type='text' value={recipe.name} options={["option","stuff","hello world hello world hello world"]}
                        onChange={(event) => {setRecipe({...recipe, name: event as string})}}/>
                    <RMInput placeholder='Description' type='textarea' value={recipe.description} 
                        onChange={(event) => {setRecipe({...recipe, description: event as string})}}/>
                </div>
                <div className={styles['img-container']}>
                    {imgSrc && <img width='200px' src={imgSrc} style={{display: 'block'}}></img>}
                    <RMFileChooser icon='add_a_photo' className={styles.file} onChange={(img) => {
                        setImage(img);
                        setImgSrc(URL.createObjectURL(img)); 
                    }}></RMFileChooser>
                </div>

                
                
            </div>

            <RMDivider></RMDivider>
            <h2>Tags</h2>

            <RMInput type='text' options={tagOptions?.map(t => t.name)} 
                onChange={(e) => {getTagsStartingWith(e as string).then(res => setTagOptions(res.items))}}
                onMenuClick={(e) => {setTags([...tags, tagOptions?.find(t => t.name === e) as TagRecord])}}
            ></RMInput>
            <RMChipList value={tags.map(t => t.name)} onDelete={(e) => {removeTag(e)}}></RMChipList>
            

            
            
            <RMDivider></RMDivider>
            <div className={styles['ingredient-list']}>
                <h2>Ingredients</h2>
                {ingredients.map((ingredient, index) => {
                    return (
                        <div key={index} className={styles['ingredient-list-item']}>
                            <RMInput placeholder='ingredient name' type='text' value={ingredient.name} onChange={(e) => {changeIngredient(index, {...ingredient, name: e as string})}}></RMInput>
                            <RMInput placeholder='amount' type='number' value={ingredient.amount} onChange={(e) => {changeIngredient(index, {...ingredient, amount: e as number})}}></RMInput>
                            <RMInput placeholder='unit' type='text' value={ingredient.unit} onChange={(e) => {changeIngredient(index, {...ingredient, unit: e as string})}}></RMInput>
                            <div className={styles['move-buttons']}>
                                <button onClick={() => {swapIngredients(index, index-1)}} disabled={index === 0}><RMIcon>expand_less</RMIcon></button>
                                <button onClick={() => {swapIngredients(index, index+1)}} disabled={index === ingredients.length-1}><RMIcon>expand_more</RMIcon></button>
                            </div>
                            <RMIconButton small={true} color='secondary' onClick={() => {removeIngredient(index)}}>delete</RMIconButton>
                        </div>
                    )
                })}
                
                <RMButton color='secondary' onClick={addIngredient}><RMIcon>add</RMIcon>Add ingredient</RMButton>
            </div>
            <RMIconButton color='secondary' onClick={save} disabled={saveDisabled}>save</RMIconButton>
        </div>
    );
}

type CreateRecipeRecord = Omit<RecipeRecord,'owner'>;
type CreateRecipeIngredientsRecord = Omit<RecipeIngredientsRecord,'recipe'>;