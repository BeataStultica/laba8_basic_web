import React from "react"


class Content extends React.Component {
    constructor(props){
         super(props)
         this.state={sevenCl:false, eightCl:false}}
    seven_click(e){
        if (!this.state.sevenCl){
            e.target.style.color = 'gold';
            e.target.style.backgroundColor = 'blue';   
        }else{
            e.target.style.color = null;
            e.target.style.backgroundColor = null;   
        }
        this.setState(prevState=>({sevenCl:!prevState.sevenCl, eightCl:prevState.eightCl}))
    };
    eight_click(e){
        if (!this.state.eightCl){
            e.target.style.color = 'blue';
            e.target.style.backgroundColor = 'gold';  
        }else{
            e.target.style.color = null;
            e.target.style.backgroundColor = null;   
        }
        this.setState(prevState=>({sevenCl:prevState.sevenCl, eightCl:!prevState.eightCl}))
    }
    render() {
        return <div><p>Дата та місце народження: 8 лютого 2002 року, Тернопільска обл., м. Шумськ.</p>
            <p>Освіта: ТНВК № 7;  Тернопільский технічний ліцей;  НТУУ "КПІ", м. Київ. </p>
            <span>
                Хоббі:
                <ul>
                    <li>Риболовля</li>
                    <li id="read" onClick={(e)=>this.seven_click(e)}>Читання</li>
                    <li onClick={(e)=>this.eight_click(e)}>Відеоігри</li>
                    <li>Прослуховування музики</li>
                </ul>
            </span>
            <span>
                Улюблені книги:
                <ol>
                    <li>Перший закон, Джо Аберкромбі</li>
                    <li>Десять негритят, Агата Крісті</li>
                    <li>Парфуми, Патрік Зюскінд</li>
                </ol>
            </span>
            <p>&nbsp;&nbsp;&nbsp;&nbsp; Львів — місто в Україні, адміністративний центр області, агломерації, району, міської громади, національно-культурний та освітньо-науковий осередок країни,
                великий промисловий центр і транспортний вузол, вважається столицею Галичини та центром Західної України.
                За кількістю населення — сьоме місто країни (717 273 станом на 01.01.2022).<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp; Історичний центр Львова занесено до списку Світової спадщини ЮНЕСКО.
                    У місті розташована найбільша кількість пам'яток архітектури в Україні.
                    2009 року Львову надано звання Культурної столиці України.
                    Місто періодично посідає чільні місця в рейтингах туристичної та інвестиційної привабливості.
            </p>
        </div>
    }
}
export default Content;