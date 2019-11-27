let AppBook = function () {
    this.data = [];
    //add giá trị
    this.addData = function () {
        name = document.getElementById('nameBook').value;
        img = document.getElementById('imgBook').value;
        author = document.getElementById('authorBook').value;
        price = document.getElementById('priceBook').value;
        this.data.unshift([img, name, author, price]);
        this.sessionStorage();
        return this.displayData();
    };
    // hiển thị data
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
                <button type='button' style='background:red;color:#fff;' onclick='appbook.editData(${[i]})'>Edit</button>
                <button type="button" style='background:red;color:#fff;' onclick="appbook.deteleSessionStorage(${[i]})">Delete</button>
                </td>`;

                if (i == count2) {
                    html += "</tr>";
                    count2 += 5;
                }
            }
        }
        document.getElementById("result").innerHTML = html;
    }

    //sửa data
    this.editData = function () {
        name = document.getElementById("editNameBook").value;
        img = document.getElementById("editImgBook").value;
        author = document.getElementById("editAuthorBook").value;
        price = document.getElementById("editPriceBook").value;
        this.data.splice(name,img,author,price);
        this.sessionStorage();
    }
    //lưu data
    this.sessionStorage = function () {
        sessionStorage.setItem('book', JSON.stringify(this.data));
    }

    this.loadSessionStorage = function (){
        this.data = JSON.parse(sessionStorage.getItem('book'));
        if (!this.data) {
            this.data = [];
        }
    }
    // xóa từng data
    this.deteleSessionStorage = function (i) {
        let confirmAnswer = confirm("Do you want delete " + this.data[i][1] + " ?");
        if(confirmAnswer)
        this.data.splice(i,1);
        sessionStorage.setItem('book', JSON.stringify(this.data));
        return this.displayData();
    }
    // xóa hết data
    this.clearSessionStorage = function () {
        sessionStorage.clear();
        return this.displayData();
    }

}

let appbook = new AppBook();
function main() {
    appbook.loadSessionStorage();
    appbook.displayData();
}
