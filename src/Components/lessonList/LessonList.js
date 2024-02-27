import './lessonList.scss';



import {useState, useEffect} from 'react'; 
import {useDispatch, useSelector} from 'react-redux'; 
import { setActivePage,  setStringForLesson} from '../../features/counter/counterSlice';
import { usePreparationString } from '../../hooks/usePreparationString';

function LessonList () {
    const {currentLessons, darcTheme} = useSelector(state => state.stamina);  // Достаю дані з уроками 
    const darkClass = darcTheme ? 'dark' : ''; 
    const {transformDataInString} = usePreparationString(); // Достаю функцію для трансформації даних в строку
    const dispatch = useDispatch();

    // Вигрузка необхідних для уроку даних і перехід на сторінку з тринажером ********************************
    const nextLesson = (id) => {
        dispatch(setActivePage('pageLesson'));
        dispatch(setStringForLesson(transformDataInString(id)));
    }
    //********************************************************************************************************

    // Рендер списку Уроків і кнопкою для переходу до окремого уроку *****************************************
    const lessons = currentLessons.map((lesson, i) => {
        return (
                <div key={i} onClick={() => nextLesson(i)} className={`lesson__grupe ${darkClass}`}>{lesson.nameLesson}</div>
        )
    })
    //********************************************************************************************************
    
    return (
        <>
            {lessons}
        </>
    )
};

export default LessonList
