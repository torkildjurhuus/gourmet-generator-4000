import { useState, useEffect } from "react";
import { Button, Paper, Typography, IconButton, Slider } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import './App.css';

const App = () => {
    const [sandwiches, setSandwiches] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [numSandwiches, setNumSandwiches] = useState(1);

    const presentationTemplates = [
        "A union of {bread} and {topping}, accentuated by {condiment}.",
        "Indulge in {bread} blanketed by {topping}, with a splash of {condiment}.",
        "{topping} and {condiment} find their perfect home on {bread}.",
        "{topping} takes a stroll on a bed of {bread}, serenaded by {condiment}.",
        "Embrace {bread} as it cradles {topping} under a sky of {condiment}.",
        "Feast on {bread} hosting a party of {topping} with a dress code of {condiment}.",
        "Journey into a forest of {bread}, where {topping} and {condiment} play.",
        "{bread} becomes a stage, spotlighting {topping}, with background music by {condiment}.",
        "Imagine a meadow of {bread} where {topping} frolics and {condiment} flows like a stream.",
        "A symphony of {bread}, with {topping} as the lead violin and {condiment} as the conductor.",
        "Explore a castle of {bread} guarded by {topping}, and moated by {condiment}.",
        "{bread} lays the red carpet for the celebrity duo of {topping} and {condiment}.",
        "Picture a sunset on a beach of {bread}, where {topping} surfs and {condiment} is the breeze.",
        "A slice of {bread} celebrates its wedding to {topping}, officiated by {condiment}.",
        "{bread} opens its arms wide to embrace {topping} with a loving sprinkle of {condiment}.",
        "{topping} and {condiment} enjoy a romantic date on a terrace of {bread}.",
        "Let {bread} take you on a cruise featuring the exotic {topping} and luxurious {condiment}.",
        "{bread} becomes an artist's canvas, painted with {topping} and signed by {condiment}.",
        "Sail the seas on a ship of {bread}, captained by {topping} and navigated by {condiment}.",
        "Step into a garden of {bread} where {topping} blossoms and {condiment} is the morning dew."
    ];


    const toppings = ["Roast beef", "Egg and avocado", "Ham and tomato", "Pepper salami", "Garlic Salami", "Salami", "Liver paté", "Brie", "Egg", "Avocado"];
    const breads = ["Chia bread", "Whole grain bread "];
    const condiments = ["Dijonaise", "Mayo", "Green pesto", "Red pesto", "Remoulade", "Pickled red cabbage"];

    useEffect(() => {
        const savedFavorites = localStorage.getItem("favorites");
        if (savedFavorites) {
            setFavorites(JSON.parse(savedFavorites));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    const generatePresentation = (sandwich) => {
        const randomIndex = Math.floor(Math.random() * presentationTemplates.length);
        return presentationTemplates[randomIndex]
            .replace("{bread}", sandwich.bread)
            .replace("{topping}", sandwich.topping)
            .replace("{condiment}", sandwich.condiment);
    };

    const generateSandwiches = () => {
        const newSandwiches = [];
        for (let i = 0; i < numSandwiches; i++) {
            const topping = toppings[Math.floor(Math.random() * toppings.length)];
            const bread = breads[Math.floor(Math.random() * breads.length)];
            const condiment = condiments[Math.floor(Math.random() * condiments.length)];
            const presentation = generatePresentation({ topping, bread, condiment });
            newSandwiches.push({ topping, bread, condiment, presentation });
        }
        setSandwiches(newSandwiches);
    };

    const addToFavorites = (sandwich) => {
        setFavorites(prev => [...prev, sandwich]);
    };

    const removeFromFavorites = (sandwich) => {
        setFavorites(favs => favs.filter(fav => JSON.stringify(fav) !== JSON.stringify(sandwich)));
    };

    const handleSliderChange = (event, newValue) => {
        setNumSandwiches(newValue);
    };

    return (
        <div className="app">
            <div className="header">
                <Typography variant="h4" component="h1" gutterBottom>
                    Gourmet Generator 4000
                </Typography>
                <div>
                    <Typography gutterBottom>Tal av breyðflísum</Typography>
                    <Slider
                        className="fixed-slider"
                        value={numSandwiches}
                        onChange={handleSliderChange}
                        min={1}
                        max={10}
                        valueLabelDisplay="auto"
                    />
                </div>
                <Button variant="contained" color="primary" onClick={generateSandwiches}>
                    Smyr breyðflísar
                </Button>
            </div>
            <div className="sandwiches">
                {sandwiches.map((sandwich, index) => (
                    <Paper elevation={3} className="sandwich" key={index}>
                        <div className="icon-and-text">
                            <Typography variant="body1">{sandwich.presentation}</Typography>
                            <IconButton aria-label="add to favorites" onClick={() => addToFavorites(sandwich)}>
                                <FavoriteIcon />
                            </IconButton>
                        </div>
                    </Paper>
                ))}
            </div>
            <Typography variant="h5" component="h2" gutterBottom>
                Your Favorite Sandwiches
            </Typography>
            <div className="favorites">
                {favorites.map((sandwich, index) => (
                    <Paper elevation={3} className="sandwich" key={index}>
                        <div className="icon-and-text">
                            <Typography variant="body1">{sandwich.presentation}</Typography>
                            <IconButton aria-label="remove from favorites" onClick={() => removeFromFavorites(sandwich)}>
                                <FavoriteIcon />
                            </IconButton>
                        </div>
                    </Paper>
                ))}
            </div>
        </div>
    );
};
export default App;
