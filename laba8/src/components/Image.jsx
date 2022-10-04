import React, { useState } from "react"
import i from './Image.module.css';
function Image() {
    const [isBound, setData] = useState(false);
    function handleFiles() {
        const file = this.files[0];
        let image = document.createElement("img");
        let br = document.createElement("br");
        image.classList.add('lviv-img')
        document.getElementById('image-box').appendChild(image);
        document.getElementById('image-box').appendChild(br);

        let reader = new FileReader();
        reader.onload = (function (aImg) {
            return function (e) {
                aImg.src = e.target.result;
            };
        })(image);
        reader.readAsDataURL(file);
    }
    const increase = () => {
        let cur_img = document.querySelectorAll('img')
        for (let i of cur_img) {
            let cur_w = i.style.width
            if (cur_w) {
                cur_w = parseInt(cur_w);
            }
            else {
                cur_w = i.naturalWidth;
            }
            i.style.width = cur_w + 101 + 'px'
        }
    }
    const decrease = () => {
        let cur_img = document.querySelectorAll('img')
        for (let i of cur_img) {
            let cur_w = i.style.width
            if (cur_w) {
                cur_w = parseInt(cur_w);
            }
            else {
                cur_w = i.naturalWidth;
            }
            i.style.width = cur_w - 101 + 'px'
        }
    }
    const deleteImg = () => {

        let cur_img = document.querySelectorAll('img')
        let cur_br = document.querySelectorAll('br')
        if (cur_img.length > 0) {
            cur_img[cur_img.length - 1].remove();
            cur_br[cur_br.length - 1].remove();
        }

    }
    const addImg = () => {
        if (!isBound) {
            document.getElementById("add_file").addEventListener("change", handleFiles, false)
            setData(true)
        }
        document.getElementById("add_file").value = null;
        document.getElementById("add_file").click();
    }
    return (
        <div className="image_box">
            <div id="image-box">
                <a href="https://portal.lviv.ua/"><img className="lviv-img" alt='alt' src="https://ulvovi.info/sites/default/files/styles/wide_background/public/images/news/2018/11/244251.jpg?itok=ahzoPr7v" /></a><br />
            </div>
            <div className={i.button_box}>
                <input type="file" id="add_file" className={i.add_file} accept="image/*" />
                <button id="add" onClick={addImg}>Додати</button>
                <button id="delete" onClick={deleteImg}>Видалити</button>
                <button id="increace" onClick={increase}>Збільшити</button>
                <button id="decreace" onClick={decrease}>Зменшити</button>
            </div>
        </div>
    )
}

export default Image;