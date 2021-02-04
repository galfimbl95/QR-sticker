// import * as qr from './qrcode';

//считываем CSV и передаем внешней функции содержимое CSV в виде массива CSV строк с массивами CSV ячеек
function readCSV() {
    let fileInput = document.getElementById('input');
    Papa.parse(fileInput.files[0], {
        complete: function (results) { addToDocumentCsvContent(results.data) }
    });
}

//Получем от readCSV() массив и добавляем содержимое на экран для последующего заполнения дополнительных полей
function addToDocumentCsvContent(arr) {
    for (let i in arr) {
        let currentStr = (arr[i][0]);
        if (currentStr.length != 85) { console.log('Строка имеет не правильный формат, длина не равна 85 \n' + currentStr) }
        let codeNumber = currentStr.substr(1, 17);
        let codeStr = currentStr.substr(19, 12);
        let codeHash = currentStr.slice(-54);

        let tr = document.createElement('tr');
        tr.setAttribute('QRstring', currentStr)

        let td1 = document.createElement('td');
        let td2 = document.createElement('td');
        let td3 = document.createElement('td');
        let td4 = document.createElement('td');
        let td5 = document.createElement('td');

        td1.innerText = codeNumber;
        td2.innerText = codeStr;
        td3.innerText = codeHash;
        td4.innerHTML = '<input type="text"></input>';
        td5.innerHTML = '<input type="text"></input>';


        tr.append(td1);
        tr.append(td2);
        tr.append(td3);
        tr.append(td4);
        tr.append(td5);

        document.getElementById('csvTableBody').append(tr)
    }
}

function showCsvTableContainer() {
    document.getElementById('csvTableContainer').classList.remove("hide");
}

function createPrintSet() {
    //let printWindow = window.open('', '', 'left=50,top=50,width=800,height=640,toolbar=0,scrollbars=1,status=0');
    let csvTableBody = document.getElementById('csvTableBody')
    for (let row of csvTableBody.rows) {
        //подготавливаем табличку 1х2 для этикетки
        let sticker = document.createElement('table')
        sticker.innerHTML = "<tbody><tr><td></td><td></td></tr></tbody>"

        //вставляем в первую ячйку QR
        let qrString = row.getAttribute('QRstring');
        let qrcode = new QRCode(sticker.rows[0].cells[0], {
            width: 125,
            height: 125
        });
        qrcode.makeCode(qrString);

        //вставляем во вторую ячйку текст
        let tdForText = sticker.rows[0].cells[1];

        let model = row.cells[3].firstChild.value;
        let p1 = document.createElement('p');
        p1.innerText = model;
        tdForText.append(p1);

        let number = row.cells[0].innerText;
        let p2 = document.createElement('p');
        p2.innerText = number;
        tdForText.append(p2);

        let words = row.cells[1].innerText;
        let p3 = document.createElement('p');
        p3.innerText = words;
        tdForText.append(p3);

        let size = row.cells[4].firstChild.value;
        let p4 = document.createElement('p');
        p4.innerText = size;
        tdForText.append(p4);

        //добавляем этикетку на страницу
        sticker.classList.add ('break')
        sticker.classList.add ('sticker')
        document.getElementById('printSetContainer').append(sticker);

        //скрываем таблицу
        document.getElementById('csvTable').classList.add("hide");

    }
}

function goToPrint () {
    document.getElementById('printSetContainer').style.cssText= 'margin-top: 0px; padding-left: 0px;'
    let winPrint = window.open('', '', 'left=50,top=50,width=800,height=640,toolbar=0,scrollbars=1,status=0');
    winPrint.document.write('<link rel="stylesheet" href="css/style.css">');
    winPrint.document.write(document.getElementById('printSetContainerParent').innerHTML);
    
    // document.getElementById('csvTableContainer').classList.add("hide");    
    // document.getElementById('headerContainer').classList.add("hide");
         
}








