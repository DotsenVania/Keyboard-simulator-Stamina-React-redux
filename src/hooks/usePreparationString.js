import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addStringForLesson } from '../features/counter/counterSlice';

export const usePreparationString = () => {

    const dispatch = useDispatch(); 

    const allLessonData = useSelector(state => state.stamina.allLessonData);
    const {currentLessons} = useSelector(state => state.stamina);

    function transformData(id) {
        return {data: allLessonData[id].lessons, id}
    }

    function transformDataInString (id) {
        let string = '';
        let arrNum = []
        currentLessons[id].words.map((word, i) => {
                 string += (word.name + ' ').repeat(5);
                 arrNum.push((word.name + ' ').repeat(5).length)
        }); 
        let lessonName = currentLessons[id].nameLesson
        return {
            string,
            arrNum,
            lessonName,
            id
        }; 
    };

    return {
        transformData,
        transformDataInString
    }
}