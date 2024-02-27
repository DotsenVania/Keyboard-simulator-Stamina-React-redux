import './methodDescription.scss';
import {useDispatch, useSelector} from 'react-redux';
import {useState, useEffect} from 'react';

function MethodDescription(props) {
    const [idWord, setIdWord] = useState(props.id);
    const {id, modalDescrActive, setModalDescrActive} = props; 
    useEffect(()=> {
        setIdWord(id)
    }, [id])
    const {idData, currentLessons, darcTheme} = useSelector(state => state.stamina); 
    const darkClass = darcTheme ? 'dark' : ''; 

    const methodList = currentLessons[idData.idLessons].words.map((method, i) => {
        let styles; 
        if(idWord == i) {
            styles = {
                backgroundColor: darcTheme ? '#1D3C43' : 'rgb(226, 242, 255)',
                color: darcTheme ? 'white' : 'black'
            }
        }
        return (
            <div key={i} style={styles} onClick={() => setIdWord(i)} className="item">{method.name}</div>
        )
    })
    const description = currentLessons[idData.idLessons].words.map((method, i) => {
        if(idWord == i) {
            return (
                <>
                    <div className="item__name">{method.name}
                        <button onClick={() => setModalDescrActive(false)} className="close">&#10006;</button>
                    </div>
                    <div className="item__descr">
                        <div className="item__descr_title">Description</div>
                        {method.description}
                        </div>
                    <a  target ="_blank" href={method.url} className="item__url">Click for details</a>
                </>
            )
        }
    })

    const className = modalDescrActive ? 'active' : null; 

    return (
        <>
            <div className={`method-descr ${className} ${darkClass}`}>
                <div className={`method-descr__block ${className}`}>
                    <div className="method-descr__block_name">
                        {methodList}
                    </div>
                    <div className="method-descr__block_description">
                        {description}
                    </div>
                </div>
            </div>
        </>
    )
}

export default MethodDescription; 

