import './keyboard.scss'; 
import {useState, useEffect} from 'react'; 
import {useSelector, useDispatch} from 'react-redux'; 


function Keyboard (props) {
    const [checkCase, setCheckCase] = useState(false); // Перевірка регістру якщо true - то верхній регістр
    const {darcTheme} = useSelector(state => state.stamina); 
    const darkClass = darcTheme ? 'dark' : ''; 
    const keyData = {
        row1: ["`", '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'backspace'],
        row1Uper: ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 'backspace'],
        row2: ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', "\\"],
        row2Uper: ['Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}', '|'],
        row3: ['CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'Enter'],
        row3Uper: ['CapsLock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', '"', 'Enter'],
        row4: ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'Shift'],
        row4Uper: ['Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?', 'Shift'],
        row5: ['Space'],
    }; // Масив букв і символів для клавіатури...

    const {row1, row1Uper, row2, row2Uper, row3, row3Uper, row4, row4Uper, row5} = keyData;

    useEffect(() => {
        if(typeof props.letter !== 'undefined') {
            if(props.letter !== " ") {
                setCheckCase(props.letter.toUpperCase() === props.letter); 
            }else {
                setCheckCase(false); 
            }
        }
    }, [props.letter])
    
    useEffect(() => {
        setCheckCase(props.enabledShift)
    }, [props.enabledShift])


    function keyRender(keyArr) { // Рендер клавіш клавіатури...
        
        const row = keyArr.map((key, i) => {
            let styles; // Перемінна для стилізації кнопок
            let errorLetter = checkCase ? props.letterError.toUpperCase() : props.letterError;

            if(errorLetter ===  key) { // Якщо буква невірна 
                styles = {
                    backgroundColor: 'red'
                }
            }else {
                styles = {}
            } 
            
            if(props.letter === key) { // Якщо буква вірна
                styles = {
                    backgroundColor: '#242424a9',
                    color: 'white'
                }
            }else if (props.letter === ' ') { // Якщо приходить пробіл
                if(key === 'Space') {
                    styles = {
                        backgroundColor: '#242424a9',
                        color: 'white'
                    }
                }
            }

            if(key === 'Shift') { // Стилі для Shift якщо буква в верхньому регістрі
                if (checkCase) {
                    styles = {
                        backgroundColor: '#242424a9',
                        color: 'white'
                    }         
                }
            }
            
            return ( 
                    <div style={styles} key={i} className={`key k_${key} ${darkClass}`}>{key.toUpperCase() == props.letter ? key.toUpperCase() : key}</div>
            )
        })
        return row;
    };
    
    const row_1 = keyRender(checkCase ? row1Uper : row1);
    const row_2 = keyRender(checkCase ? row2Uper : row2);
    const row_3 = keyRender(checkCase ? row3Uper : row3);
    const row_4 = keyRender(checkCase ? row4Uper : row4);
    const row_5 = keyRender(row5);

    return (
        <div className='keyboard'>
            <div className="row">
                {row_1}
            </div>
            <div className="row">
                {row_2}
            </div>
            <div className="row">
                {row_3}
            </div>
            <div className="row">
                {row_4}
            </div>
            <div className="row">
                {row_5}
            </div>
            
        </div>
    )

}; 

export default Keyboard; 