let AppBook = function () {
    this.data = [];
    //add doi tuong
    this.addData = function () {
        alert(`Thành công !`);
        name = document.getElementById('nameBook').value;
        img = document.getElementById('imgBook').value;
        author = document.getElementById('authorBook').value;
        price = document.getElementById('priceBook').value;
        this.data.unshift([img, name, author, price]);
        this.sessionStorage();
        return this.displayData();
    };
    
    //sua doi tuong
    this.editData = function (i) {
        alert(`Done !!!`);
        name = document.getElementById("editNameBook").value;
        img = document.getElementById("editImgBook").value;
        author = document.getElementById("editAuthorBook").value;
        price = document.getElementById("editPriceBook").value;
        this.data.splice(i,1,[img, name, author, price]);
        this.sessionStorage();
        return this.displayData();
    };
    
    // hien thi data
    this.displayData = function () {
        this.loadSessionStorage();
        let html = '';
        let count1 = 0;
        let count2 = 4;

        if (this.data.length > 0) {
            for (i = 0; i < this.data.length; i++) {
                if (i == count1) {
                    html += "<tr>";
                    count1 += 5;
                }
                html += `<td>
                <img class='photo' src='${this.data[i][0]}'><br/>
                <strong>${this.data[i][1]}</strong>
                <p>Tác giả: <span style="color: blue">${this.data[i][2]}</span></p>
                <p>Giá bán: <span style="color: red">${this.data[i][3]} đ</span></p>
                <button type='button' onclick='alert("Bạn đã đặt sách ${this.data[i][1]} với giá ${this.data[i][3]} đ")'>Đặt sách</button>
                <button type='button' style='background:red;color:#fff;' onclick='appbook.editForm(${[i]})'>Edit</button>
                <button type="button" style='background:red;color:#fff;' onclick="appbook.deteleSessionStorage(${[i]})">Delete</button>
                </td>`;

                if (i == count2) {
                    html += "</tr>";
                    count2 += 5;
                }
            }
        }
        document.getElementById("result").innerHTML = html;
    };
    
    // luu data
    this.sessionStorage = function () {
        sessionStorage.setItem('book', JSON.stringify(this.data));
    };
    
    // load data
    this.loadSessionStorage = function (){
        this.data = JSON.parse(sessionStorage.getItem('book'));
        if (!this.data) {
            this.data = [];
        }
    };
    
    // xoa tung data
    this.deteleSessionStorage = function (i) {
        console.log(this.data[i])
        let confirmAnswer = confirm(`Do you want delete ${this.data[i][1]} ?`);
        if(confirmAnswer)
        this.data.splice(i,1);
        this.sessionStorage();
        return this.displayData();
    };
    
    // xaa het data
    this.clearSessionStorage = function () {
        let confirmAnswer = confirm(`Do you want delete ?`);
        if(confirmAnswer)
        sessionStorage.clear();
        return this.displayData();
    };
    
    // them book
    this.updateForm = function() {
        let insert = `<div class="menu">
                <input id ="nameBook" type ="text" placeholder ="Tên sách:"> <br/>
                <input id="imgBook" type="text" placeholder="https://"><br/>
                <input id="authorBook" type="text" placeholder="Tác giả:"><br/>
                <input id="priceBook" type="text" placeholder="Giá bán:"><br/>
                <button type="button" onclick="appbook.addData()">Thêm</button>
                <button type="button" onclick="appbook.clearSessionStorage()">Clear</button>
                </div>`;
        document.getElementById("insert").innerHTML = insert;
    };
    
    // sua book
    this.editForm = function(i) {
        let repair = `<div class="menu">
                <input id="editNameBook" type="text" value="${this.data[i][1]}"><br/>
                <input id="editImgBook" type="text" value="${this.data[i][0]}"><br/>
                <input id="editAuthorBook" type="text" value="${this.data[i][2]}"><br/>
                <input id="editPriceBook" type="text" value="${this.data[i][3]}"><br/>
                <button type="button" onclick="appbook.editData(${[i]})">Edit</button>
                </div>`;
        document.getElementById("repair").innerHTML = repair;
        document.documentElement.scrollTop = 0;
    };
};

let appbook = new AppBook();
function main(){
appbook.loadSessionStorage();
appbook.displayData();
appbook.updateForm();
appbook.editForm();
};
