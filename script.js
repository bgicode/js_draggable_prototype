window.onload = () => {
    const container1Blocks = Array.from(document.querySelectorAll('#container .box')); 
        // Устанавливаем порядок для блоков первого контейнера
        container1Blocks.forEach((block, index) => {
            block.style.order = index;
        });

    function syncContainers() {
        // Сначала получаем блоки из первого контейнера
        const container1Blocks = Array.from(document.querySelectorAll('#container .box'));
        console.log(container1Blocks);
        // Устанавливаем порядок для блоков первого контейнера
        container1Blocks.forEach((block, index) => {
            block.style.order = index;
        });

        // Получаем блоки из второго контейнера
        const container2Blocks = document.querySelectorAll('#container2 .box');
    
        // Синхронизируем порядок блоков второго контейнера с первым
        container2Blocks.forEach(block => {
            const content = block.querySelector('.cont');
            const docValue = content.dataset.doc;
            const correspondingBlock = container1Blocks.find(b => b.querySelector('.cont').dataset.doc === docValue);
            if (correspondingBlock) {
                block.style.order = window.getComputedStyle(correspondingBlock).order; // Синхронизация порядка
            }
        });

        const dropHover = document.querySelectorAll('.box');
        dropHover.forEach(element => {
            element.classList.remove('dropHover');
        });
    }


    const conteiner = document.querySelector('#container');

    const handledragClick = (e) => {
        const drags = document.querySelectorAll(".drag"); // выбор всех элементов якоря
        let dragged; // будет использоваться для хранения перетаскиваемого div

        drags.forEach(drag => {
            const div = drag.parentElement; // получаем родительский div

            // Обработчик события нажатия кнопки мыши на элементе якоря
            drag.onmousedown = (e) => {
                dragged = div; // копируем ссылку на перетаскиваемый div
                div.setAttribute('draggable', 'true'); // устанавливаем draggable на true
                div.classList.add("dragged"); // добавляем класс dragged
            };

            // Обработчик события начала перетаскивания для элемента div
            div.ondragstart = (e) => {
                e.dataTransfer.setData('text/plain', div.innerHTML); // сохраняем содержимое перетаскиваемого элемента
            };

            // Применяет CSS эффект при входе в зону сброса

            div.ondragenter = () => {
                if (dragged && dragged !== div) { // если это не перетаскиваемый элемент
                     // добавляем класс dropHover
                    div.classList.add('dropHover');
                }
                div.classList.remove('shake'); // удаляем класс shake, если он присутствует
            };

            // Применяет CSS эффект при выходе из зоны сброса
            div.ondragleave = () => {
                div.classList.remove('dropHover');
            }  // удаляем класс dropHover

            // Обработчик завершения перетаскивания
            div.ondragend = () => {
                if (dragged) {
                    dragged.classList.remove("dragged"); // удаляем класс dragged
                    dragged.removeAttribute('draggable'); // сбрасываем draggable
                    dragged = null; // сбрасываем dragged после завершения перетаскивания
                }
                
            };

            // Позволяет элементу быть зоной сброса (по умолчанию запрещено)
            div.ondragover = (e) => e.preventDefault();

            // Копирует содержимое перетаскиваемого элемента в зону сброса и применяет CSS эффект
            div.ondrop = (e) => {
                if (dragged && dragged !== div) { // проверяем, что это не тот же элемент
                    const tempContent = div.innerHTML; // сохраняем текущее содержимое зоны сброса
                    div.innerHTML = e.dataTransfer.getData('text/plain'); // зона сброса получает значение перетаскиваемого элемента
                    dragged.innerHTML = tempContent; // перетаскиваемый элемент получает значение зоны сброса
                    div.classList.remove('dropHover'); // удаляем класс dropHover
                    div.classList.add("shake"); // добавляем эффект shake к зоне сброса
                    syncContainers();
                }
            };
        });

        // Обработчик события mouseup для завершения перетаскивания
        document.onmouseup = () => {
            if (dragged) {
                dragged.classList.remove("dragged"); // удаляем класс dragged
                dragged.removeAttribute('draggable'); // сбрасываем draggable
                dragged = null; // сбрасываем dragged после завершения перетаскивания
            }
        };
    }

    conteiner.addEventListener('click', handledragClick);
}
