import './styles.css';
import {homePage} from './homepage';
import {sidebar} from './sidebar';
import {tasksArray, listArray, labelData} from './try-stuff.js'

console.log('heyyyyyyyyyyyy')

homePage();
sidebar();

tasksArray.forEach(element => {
    console.log(element)
});

labelData.forEach(element => {console.log(element)})

