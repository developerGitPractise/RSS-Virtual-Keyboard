const virtualKeyboard = {
    
    structure: {        // структура  
        mainBlock: null, 
        wrapperForKeys: null,
        keys: []
    },
    
    showEvent: {        // возможные события
        oninput: null,  // событие при изменении значения элемента input
        onclose: null  // событие закрытия
    },

    properties: {
        value: '',
        capsLock: false,
        shift: false,
        language: "En"
    },

    createAllHTML() {
        //создание блоков
        this.structure.mainBlock = document.createElement("div"); // создал блок
        this.structure.mainBlock.classList.add("keyboard", "keyboard--hidden"); // передал класс блоку

        this.structure.wrapperForKeys = document.createElement("div");
        this.structure.wrapperForKeys.classList.add("keyboard__keys");
        
        this.structure.mainBlock.appendChild(this.structure.wrapperForKeys);
        this.structure.wrapperForKeys.appendChild(this._createKeys()); // все созданные кнопки станут дочерними для wrapper  
        this.structure.keys = this.structure.wrapperForKeys.querySelectorAll(".keyboard__key"); // в массив кнопок передаются все дочерние элементы wrapper с классом 
        
        document.body.appendChild(this.structure.mainBlock); // размещение главного блока и всего его содержимого в структуре html

        document.querySelectorAll(".use-keyboard-input").forEach(element => {
            const cursive = "|";
            element.addEventListener("focus", () => {
                this.open(element.value, currentValue => {
                    console.log(element.value, currentValue)
                    element.value = currentValue + cursive;                       
                });
            });
        });
    },

    _createKeys() {
        const fragment = document.createDocumentFragment();  // фрагмент не входит в дом-дерево
        let keyValue;
        const currentKeyValue = () => {
            if (this.properties.language = "En") {
                if(this.properties.shift === false) {
                    keyValue = [
                        "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "backspace",
                        "Tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p","[", "]","\\",
                        "Caps", "a", "s", "d", "f", "g", "h", "j", "k", "l",";","'", "Enter",
                        "Shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "↑",
                        "Clear", "done","En", "Space","☺", "←", "↓", "→"
                    ];
                } else if(this.properties.shift === true) {
                keyValueShift = [
                    "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", "backspace",
                    "Tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P","{", "}","|",
                    "Caps", "A", "S", "D", "F", "G", "H", "J", "K", "L",":","\"", "Enter",
                    "Shift", "Z", "X", "C", "V", "B", "N", "M", "<", ">", "?", "↑",
                    "Clear", "done","En", "Space","☺", "←", "↓", "→"
                    ];
                };
            } else if (this.properties.language = "Ru") {
                if(this.properties.shift === false) {
                keyValue = [    
                    "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "backspace",
                    "Tab", "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з","х", "ъ","\\",
                    "Caps", "ф", "ы", "в", "а", "п", "р", "о", "л", "д","ж","э", "Enter",
                    "Shift", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ".", "↑",
                    "Clear", "done","Рус", "Space","☺", "←", "↓", "→"
                    ];                
                } else if(this.properties.shift === true) {
                keyValueShift = [
                    "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", "backspace",
                    "Tab", "Й", "Ц", "У", "К", "Е", "Н", "Г", "Ш", "Щ", "З","Х", "Ъ","|",
                    "Caps", "Ф", "Ы", "В", "А", "П", "Р", "О", "Л", "Д","Ж","Э", "Enter",
                    "Shift", "Я", "Ч", "С", "М", "И", "Т", "Ь", "Б", "Ю", ",", "↑",
                    "Clear", "done","Рус", "Space","☺", "←", "↓", "→"
                    ];
                };
            };
        };       
        currentKeyValue();  
        

        const createHTMLForIcon = (iconName) => {
            if(iconName === "Clear" || iconName === "Shift") {
                return `<i class="keyboard__key--text-button">${iconName}</i>`;
            };
            return `<i class="material-icons">${iconName}</i>`;
        };        

        keyValue.forEach(key => { //создаю кнопку под каждый символ
            const buttonForIcon = document.createElement("button");
            buttonForIcon.setAttribute("type", "button");
            buttonForIcon.classList.add("keyboard__key"); 
            const lastInLine = ["backspace", "\\", "Enter", "↑"].indexOf(key) !== -1; //или индекс элемента или -1 если его нету 

            switch (key) {
                case "backspace":
                    buttonForIcon.classList.add("keyboard__key--wide");  // ширина блока обычная
                    buttonForIcon.innerHTML = createHTMLForIcon("backspace"); // создание иконки символа
                    buttonForIcon.addEventListener("click", () => {
                        this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1) //подстрока от исходной строки между 0 и до второго значения
                        if (this.properties.value === "|") {
                            this.properties.value = "";
                        }
                        this._eventHappened("oninput");
                    });
                    break
                case "Caps":
                    buttonForIcon.classList.add("keyboard__key--wide", "keyboard__key--activatable");  // ширина блока обычная
                    buttonForIcon.innerHTML = createHTMLForIcon("keyboard_capslock"); // создание иконки символа
                    buttonForIcon.addEventListener("click", () => {
                        this._onCapsLock();
                        buttonForIcon.classList.toggle("keyboard__key--active", this.properties.capsLock);
                        this._eventHappened("oninput");
                    });
                    break
                case "Enter":
                    buttonForIcon.classList.add("keyboard__key--wide");  // ширина блока обычная
                    buttonForIcon.innerHTML = createHTMLForIcon("keyboard_return"); // создание иконки символа
                    buttonForIcon.addEventListener("click", () => {
                        console.log(key);
                        this.properties.value += "\n";
                        this._eventHappened("oninput");
                    });
                    break
                case "Space":
                    buttonForIcon.classList.add("keyboard__key--extra-wide");  // ширина блока обычная
                    buttonForIcon.innerHTML = createHTMLForIcon("space_bar"); // создание иконки символа
                    buttonForIcon.addEventListener("click", () => {
                        console.log(key);
                        this.properties.value += " ";
                        this._eventHappened("oninput");
                    });
                    break
                case "done":
                    buttonForIcon.classList.add("keyboard__key--middle-wide", "keyboard__key--dark");  // ширина блока обычная
                    buttonForIcon.innerHTML = createHTMLForIcon("check_circle"); // создание иконки символа
                    buttonForIcon.addEventListener("click", () => {
                        console.log(key);

                        this.close();
                        this._eventHappened("onclose");
                    });
                    break
                case "Tab":
                    buttonForIcon.classList.add("keyboard__key--wide");  // ширина блока обычная
                    buttonForIcon.innerHTML = createHTMLForIcon("keyboard_tab"); // создание иконки символа
                    buttonForIcon.addEventListener("click", () => {
                        console.log(key);
                        this.properties.value += "    ";
                        this._eventHappened("oninput");
                    });
                    break
                case "En":
                    buttonForIcon.classList.add("keyboard__key--middle-wide");  // ширина блока обычная
                    buttonForIcon.innerHTML = createHTMLForIcon("dvr"); // создание иконки символа
                    buttonForIcon.addEventListener("click", () => {
                        if (this.properties.language === "En") {
                            this.properties.language === "Ru";
                        } else if (this.properties.language === "Ru") {
                            this.properties.language === "En";
                        }
                        console.log(this.properties.language);
                        this._eventHappened("oninput");
                    });
                    break
                case "Clear":
                    buttonForIcon.classList.add("keyboard__key--wide");  // ширина блока обычная
                    buttonForIcon.innerHTML = createHTMLForIcon("Clear"); // создание иконки символа                
                    buttonForIcon.addEventListener("click", () => {
                        console.log(key);
                        this.properties.value = "";
                        this._eventHappened("oninput");
                    });
                    break    
                case "Shift":
                    buttonForIcon.classList.add("keyboard__key--wide","keyboard__key--activatable", "keyboard__key--text-button");  // ширина блока обычная
                    buttonForIcon.innerHTML = createHTMLForIcon("Shift"); // создание иконки символа
                    buttonForIcon.addEventListener("click", () => {                       
                        this._onShift();
                        buttonForIcon.classList.toggle("keyboard__key--active", this.properties.shift);
                        this._eventHappened("oninput");
                    });
                    break

                default :
                    buttonForIcon.textContent = key.toLowerCase();
                    buttonForIcon.addEventListener("click", () => {
                        console.log(key);                        
                        this.properties.value += this.properties.capsLock || this.properties.shift ? key.toUpperCase() : key.toLowerCase()                 
                        this._eventHappened("oninput");
                    });                    
                    break
            }
            fragment.appendChild(buttonForIcon); 
            if (lastInLine) {
                fragment.appendChild(document.createElement("br"));
            }            
        });
        return fragment;
    },

    _onCapsLock(){
        this.properties.capsLock = !this.properties.capsLock;
        for (const key of this.structure.keys) { //для всех кнопок 
            if(key.childElementCount === 0) { // если нету дочерних элемента i
                key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
            };
        }
    },

    _onShift(){
        this.properties.shift = !this.properties.shift;
        for (const key of this.structure.keys) { //для всех кнопок 
            if(key.childElementCount === 0) { // если нету дочерних элемента i
                key.textContent = this.properties.shift ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
                
            };
        }
    },

    _eventHappened (whatIsEvent) {
        if (typeof this.showEvent[whatIsEvent] == "function") {
            this.showEvent[whatIsEvent](this.properties.value)
        }
    },    

    open(originValue, oninput, onclose ) {
        this.properties.value = originValue || "";
        this.showEvent.oninput = oninput;
        this.showEvent.onclose = onclose;
        this.structure.mainBlock.classList.remove("keyboard--hidden");
    },

    close() {
        this.properties.value = "",
        this.showEvent.oninput = oninput;
        this.showEvent.onclose = onclose;
        this.structure.mainBlock.classList.add("keyboard--hidden");
    }

};

window.addEventListener("DOMContentLoaded", function () { //после загрузки всего домдерева
    virtualKeyboard.createAllHTML(); // создать все элементы клавиатуры  
});

