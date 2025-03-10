<template>
    <div class="fullscreen">
        <h1>Đăng ký thông tin khách hàng cá nhân</h1>

        <div class="header" style="margin-top: 50px;">
            <div class="branch">
                <p><b>Chi nhánh: 7700 - Tỉnh Kiên Giang</b></p>
            </div>
            <div class="date">
                Ngày đăng ký thẻ: <input type="date">
            </div>
            <div class="search">
                <label class="search1">Tìm kiếm:</label>
                <label><b>Từ ngày:</b></label> <input type="date">
                <label><b>Đến ngày:</b></label> <input type="date">
            </div>
        </div>

        <hr>

        <div class="header" style="color: blue;">
            <div class="cb">
                <p>Cán bộ: <b style="color: black;">admin</b></p>
            </div>
            <div class="tc">
                <label>Tiêu chí tra cứu:</label>
                <select style="margin-left: 15px; width: 200px;">
                    <option value="all">Tất cả</option>
                </select>
            </div>
            <div class="tt">
                <label>Nhập thông tin:</label> <input type="text" style="width: 300px;">
                <button style="color: blue; margin-left: 15px; border-radius: 10px; width: 100px;"><b>Tra
                        cứu</b></button>
            </div>
        </div>

        <hr>



        <div class="form-row">
            <!-- Chọn file -->
            <label for="file-upload" class="custom-file-upload">Nhập từ file IPCAS</label>
            <!-- <input type="file" id="file-upload" hidden> -->
             <input type="file" id="file-upload" @change="handleFileUpload" hidden/>


            <!-- Checkbox Đăng ký mở TK -->
            <input type="checkbox" id="open-account" checked>
            <label for="open-account">Đăng ký mở TK thanh toán</label>

            <!-- Checkbox Đăng ký dịch vụ -->
            <input type="checkbox" id="register-service" checked>
            <label for="register-service">Đăng ký dịch vụ</label>

            <!-- Loại tiền -->
            <label>Loại tiền:</label>
            <input type="radio" id="currency-vnd" name="currency" value="VND" checked>
            <label for="currency-vnd">VND</label>

            <input type="radio" id="currency-usd" name="currency" value="USD">
            <label for="currency-usd">USD</label>

            <input type="radio" id="currency-eur" name="currency" value="EUR">
            <label for="currency-eur">EUR</label>

            <input type="radio" id="currency-other" name="currency" value="other">
            <label for="currency-other">Khác:</label>
            <input type="text" id="currency-other-input" style="width: 13%;" placeholder="Nhập tên loại tiền" disabled>
        </div>

        <hr>

        <div class="row" style="border: 1px solid #161515; padding: 20px;">
            <div class="col-md-6">
                <div class="row">
                    <div class="col">
                        <p><b>Họ và tên:</b><input type="text" id="nmloc" placeholder="Họ và tên" class="form-control">
                        </p>
                        <p><b>Tên tiếng:</b><input type="text" id="nm" placeholder="Tên tiếng" class="form-control"></p>

                        <p><b>CMND:</b><input class="form-control" id="regno"></p>
                        <p><b>Quốc tịch:</b><input class="form-control" id="Quoctich"></p>
                        <p><b>Điện thoại LH:</b><input class="form-control"></p>
                        <p><b>Địa chỉ TT:</b><input class="form-control" style="width: 212%;" id="addr1"></p>
                    </div>
                    <div class="col">
                        <p><b>Tên tắt TV:</b><input class="form-control" id="shrtnmloc"></p>
                        <p><b>Tên tắt TA:</b><input class="form-control" id="shrtnm"></p>
                        <p><b>Ngày cấp:</b><input class="form-control" id="issuedt1" ></p>
                        <p><b>Dân tộc:</b><input class="form-control"></p>
                        <p><b>Di động:</b><input class="form-control" id="dd"></p>
                    </div>
                </div>
            </div>



            <div class="col-md-6">
                <div class="row">
                    <div class="col">
                        <p><b>Ngày sinh:</b> <input class="form-control" id="birthday" type="date"></p>
                        <p><b>Tôn giáo:</b> <input class="form-control"></p>
                        <p><b>Nơi cấp:</b> <input class="form-control" id="Noicap"></p>
                        <p><b>Email:</b> <input class="form-control" style="width: 200%;" id="email"></p>
                        <p><b>Cố định/Fax:</b> <input class="form-control" style="width: 200%;" id="soFax"></p>
                        <p><b>Địa chỉ LH:</b> <input class="form-control" style="width: 200%;" id="dclh"></p>
                    </div>
                    <div class="col">
                        <p><b>Nơi sinh:</b> <input class="form-control" id="placeborn" type="text" style="width: 200px;"></p>

                        <p class="d-flex align-items-center">
                            <b>Cư trú:</b>
                        </p>
                        <div class="ms-2">
                            <input type="radio" id="resident-yes" name="resident" value="Có" checked
                                onchange="updateResident()">
                            <label for="resident-yes" style="margin-left: 10px;">Có</label>
                            <input style="margin-left: 40px;" type="radio" id="resident-no" name="resident"
                                value="Không" onchange="updateResident()">
                            <label for="resident-no" style="margin-left: 10px;">Không</label>
                        </div>


                        <!-- <p style="margin-top: 25px;"><b>Giới tính:</b> <input class="form-control"></p> -->
                        <p style="margin-top: 6px;">
                            <b>Giới tính:</b><br>
                            <select class="form-control" style="width: 200px;  height: 38px;" id="Gioitinh">
                                <option value="Nam">Nam</option>
                                <option value="Nữ">Nữ</option>
                                <option value="Khác">Khác</option>
                            </select>
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <hr>

        <div class="custom-row">
            <label for="customer-id">Mã số KH:</label>
            <input type="text" id="custno" style="width: 13%; height: 35px;">

            <label for="account">Tài khoản:</label>
            <select id="account">
                <option value="">Chọn tài khoản</option>
                <option value="account1">Tài khoản 1</option>
                <option value="account2">Tài khoản 2</option>
            </select>

            <input type="checkbox" id="abic" checked>
            <label for="abic">Đăng ký DV bảo hiểm ABIC</label>

            <label for="position" style="margin-left: 10px;">Chức vụ:</label>
            <select id="position" style="width: 17%;">
                <option value="">Chọn chức vụ</option>
                <option value="manager">Quản lý</option>
                <option value="staff">Nhân viên</option>
                <option value="director">Giám đốc</option>
            </select>
        </div>

        <hr>

        <div>
            <!-- Dòng 1: Thẻ và các lựa chọn -->
            <div class="row" style="font-size:91%;">
                <div class="col-md-1" style="color: blue;"><b>Thẻ:</b></div>
                <div class="col-md-11" style="text-align: right;">
                    <label for="the-ghi-noi-dia"> Thẻ ghi nội địa</label><input style="margin-left: 5px;" type="checkbox" id="the-ghi-noi-dia"
                        checked>
                    <label for="visa" style="margin-left: 10px;"> Visa</label><input type="checkbox" id="visa" style="margin-left: 5px;">
                    <label for="the-lap-nghiep" style="margin-left: 10px;"> Thẻ lập nghiệp</label><input style="margin-left: 5px;" type="checkbox" id="the-lap-nghiep">
                    <label for="mastercard" style="margin-left: 10px;"> Mastercard</label><input style="margin-left: 5px;" type="checkbox" id="mastercard">
                    <label for="the-lk-thuong-hieu" style="margin-left: 10px;"> Thẻ LK thương hiệu</label><input style="margin-left: 5px;" type="checkbox"
                        id="the-lk-thuong-hieu">
                    <label for="jcb" style="margin-left: 10px;"> JCB</label><input style="margin-left: 5px;" type="checkbox" id="jcb">
                    <label for="the-sinh-vien" style="margin-left: 10px;"> Thẻ sinh viên</label><input style="margin-left: 5px;" type="checkbox" id="the-sinh-vien">
                    <label for="the-tin-dung" style="margin-left: 10px;"> Thẻ tín dụng</label><input style="margin-left: 5px;" type="checkbox" id="the-tin-dung">
                    <label for="the-khac" style="margin-left: 10px; "> Thẻ khác</label><input style="margin-left: 5px;" type="checkbox" id="the-khac">
                </div>
            </div>

            <!-- Dòng 2: Hình thức PH và các lựa chọn -->
            <div class="row" style="margin-top: 10px; font-size:91%;">
                <div class="col-md-2"  style="color: blue;"><b>Hình thức PH:</b></div>
                <div class="col-md-10" style="text-align: right;">
                    <label for="ph-thuong" > Phát hành thường</label><input style="margin-left: 5px;" type="checkbox" id="ph-thuong" checked>
                    <label for="ph-nhanh" style="margin-left: 10px;"> Phát hành nhanh</label><input style="margin-left: 5px;" type="checkbox" id="ph-nhanh">
                    <label for="the-ghi-no-quoc-te" style="margin-left: 10px;"> Thẻ ghi nợ quốc tế</label><input style="margin-left: 5px;" type="checkbox"
                        id="the-ghi-no-quoc-te" >
                    <label for="plus-success" style="margin-left: 10px;"> Plus Success</label><input style="margin-left: 5px;" type="checkbox" id="plus-success">
                    <label for="success" style="margin-left: 10px;"> Success</label><input style="margin-left: 5px;" type="checkbox" id="success">
                    <label for="hang-vang" style="margin-left: 10px;"> Hạng vàng</label><input style="margin-left: 5px;" type="checkbox" id="hang-vang">
                    <label for="hang-chuan" style="margin-left: 10px;"> Hạng chuẩn</label><input style="margin-left: 5px;" type="checkbox" id="hang-chuan">
                    <label for="bach-kim" style="margin-left: 10px;"> Bạch kim</label><input style="margin-left: 5px;" type="checkbox" id="bach-kim">
                </div>
            </div>
        </div>

        <hr>

        <div class="row" style="margin-top: 10px;">
            <div class="col-md-2" style="color: red;"><b>ĐK Mobile Banking:</b></div>
            <div class="col-md-10 checkbox-group">
                <input type="checkbox" id="mb-sms" checked><label for="mb-sms"> Mobile Banking(SMS)</label>
                <input type="checkbox" id="e-mb"><label for="e-mb"> E-Mobile Banking</label>
                <input type="checkbox" id="b-plus"><label for="b-plus"> Bank Plus</label>
                <input type="checkbox" id="m-plus"><label for="m-plus"> M Plus </label>
                <label for="sdt-sd"> Số ĐT sử dụng: </label><input type="text" id="sdt-sd">
            </div>
        </div>


        <hr>

        <table class="table-picture" border="1" cellpadding="5">
            <tr>
                <td class="col-md-10">
                    <div class="row">
                        <input type="checkbox" id="in-ba" style="margin-left: 20px;">
                        <label for="mb-sms" style="color: blue; margin-left: 10px;"><b>Internet Banking:</b></label>
                        <input type="checkbox" id="dv-tc" style="margin-left: 20px;"><label for="e-mb" style="margin-left: 10px;"> DV tài chính</label>
                        <input type="checkbox" id="dv-tt" style="margin-left: 50px;"><label for="b-plus" style="margin-left: 10px;"> DV thanh toán</label>
                        <input type="checkbox" id="dv-ptc" style="margin-left: 50px;"><label for="m-plus" style="margin-left: 10px;"> DV phi tài chính </label>
                    </div>
                </td>
                <td rowspan="4" class="col-md-2" id="image-preview-container"
                    style="text-align: center; vertical-align: middle;">
                    <!-- Hiển thị hình ảnh được chọn -->
                    <br>
                    <img id="image-preview" src="" alt="Chưa chọn hình"
                        style="max-width: 100px; display: none; margin-top: 5px;">
                </td>
            </tr>
            <tr>
                <td class="col-md-10">
                    <div class="row">
                        <label for="mb-sms" style="color: blue; margin-left: 20px;"><b>Hình thức nhận thẻ:</b></label>
                        <input type="checkbox" id="tnh" style="margin-left: 25px;" checked><label for="tnh" style="margin-left: 10px;"> Tại ngân hàng</label>
                        <input type="checkbox" id="dcht" style="margin-left: 50px;"><label for="dcht" style="margin-left: 10px;"> Địa chỉ hiện tại</label>
                    </div>
                </td>
            </tr>
            <tr>
                <td class="col-md-10">
                    <label for="customer-A" style="margin-left: 45px;">Đại diện A:</label>
                    <input type="text" id="customer-A" style="margin-left: 20px; width: 50%;">

                    <label for="chucvu" style="margin-left: 40px;">Chức vụ:</label>
                    <select id="chucvu"  style="margin-left: 20px; width: 20%; height: 33px;" >
                        <option value="">Chọn chức vụ</option>
                        <option value="chucvu1">Giám đốc</option>
                        <option value="chucvu2">Nhân Viên</option>
                        <option value="chucvu3">Quản lý</option>
                    </select>
                </td>
            </tr>
            <tr>
                <td class="col-md-10">
                    <label for="kiemsoat" style="margin-left: 45px;">Kiểm soát:</label>
                    <input type="text" id="kiemsoat" style="margin-left: 20px; width: 50%;">
                </td>
            </tr>
            <tr>
                <td class="col-md-10">
                    <label for="GUQ">Quyết định/GUQ:</label>
                    <input type="text" id="GUQ" style="margin-left: 20px; width: 70%;">
                    <button type="submit"
                        style="margin-left: 10px; background-color: #007bff; border: 1px solid #000; color: white; padding: 5px 10px; cursor: pointer; border-radius: 5px;">Lưu
                        giấy UQ</button>
                </td>
                <!-- <td class="col-md-2">
                    <label for="image-upload" style="cursor: pointer; color: blue;">Chọn ảnh KH</label>
                    <input type="file" id="image-upload" accept="image/*" style="display: none;">
                </td> -->
                <td class="col-md-2">
                    <label for="image-upload" style="cursor: pointer; color: blue;">Chọn ảnh KH</label>
                    <input type="file" id="image-upload" accept="image/*" style="display: none;">
                    <img id="image-preview" style="display: none; max-width: 100px; margin-top: 10px;" />
                </td>
            </tr>
        </table>

        <hr>

        <div>
            <label><b>Địa chỉ NH:</b> 01 Hàm Nghi - TPRG - Kiên Giang</label>
        </div>

        <hr>

        <div class="row">
            <div>
                <button style="margin-left: 10px; border-radius: 8px; background-color: aliceblue;">Xóa dữ liệu</button>
                <button style="margin-left: 60px; border-radius: 8px; background-color: aliceblue;">Tạo mới</button>
           
              
                <!-- <select type="file" id="fileInput" accept=".docx" style="border-radius: 8px;">
                    <option value="">Chọn mẫu in</option>
                    <option value="">Mẫu 1</option>
                    <option value="">Mẫu 2</option>
                    <option value="">Mẫu 3</option>
                </select> -->
                <label for="fileInput" style="margin-left: 60px; border-radius: 8px;"><b style="color: blue;">Mẫu in:</b></label>
                <input type="file" id="fileInput" accept=".docx" style="border-radius: 8px;">
                <button style="margin-left: 20px; border-radius: 8px; background-color: aliceblue;" @click="generateWord">In Mẫu Thẻ</button>
                
                <button style="margin-left: 60px; border-radius: 8px; background-color: aliceblue;">
                    Thống Kê CN SD
                </button>
                
                <button 
                    style="margin-left: 60px; border-radius: 8px; background-color: aliceblue;" 
                    @click="exitPage"
                    >
                    Thoát
                </button>
            </div>
        </div>
        <br><br><br>
       
    </div>


</template>
<script>
import * as XLSX from "xlsx";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { saveAs } from "file-saver";

export default {
  methods: {
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const json = XLSX.utils.sheet_to_json(worksheet);

        if (json.length > 0) {
          const firstRow = json[0];
          this.fillForm(firstRow);
        } else {
          alert("Không có dữ liệu trong file!");
        }
      };
      reader.readAsArrayBuffer(file);
    },

    fillForm(data) {
      const fields = [
        "custno", "nm", "shrtnm", "nicknm", "nmloc", "shrtnmloc", "custtpcd", 
        "custdtltpcd", "name_2", "regno", "addrtpcd", "addr1", "addr2", 
        "addr1loc", "addr2loc", "stscd", "issueby1", "issuedt1", "province", 
        "district", "commune_ward", "usridop1", "ctrycdnatl"
      ];
      
      fields.forEach((field) => {
        if (document.getElementById(field)) {
          document.getElementById(field).value = data[field] || "";
        }
      });
      
      if (document.getElementById("issuedt1")) {
        document.getElementById("issuedt1").value = this.formatDate(data["issuedt1"]);
      }
    },

    formatDate(yyyymmdd) {
      if (!yyyymmdd || yyyymmdd.length !== 8) return yyyymmdd;
      return `${yyyymmdd.substring(6, 8)}/${yyyymmdd.substring(4, 6)}/${yyyymmdd.substring(0, 4)}`;
    },

    updateResident() {
      const selectedResident = document.querySelector('input[name="resident"]:checked')?.value || "Không xác định";
      console.log("Cư trú: ", selectedResident);
      return selectedResident;
    },

    generateWord() {
      const fileInput = document.getElementById('fileInput');
      if (!fileInput.files.length) {
        alert("Vui lòng chọn file Word mẫu!");
        return;
      }

      const file = fileInput.files[0];
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);

      reader.onload = (event) => {
        const content = event.target.result;
        const zip = new PizZip(content);
        const doc = new Docxtemplater(zip, { paragraphLoop: true, linebreaks: true });

        const data = {
          hoten: document.getElementById("nmloc")?.value || "Chưa nhập",
          MaKH: document.getElementById("custno")?.value || "N/A",
          ngaycap: this.formatDate(document.getElementById("issuedt1")?.value || ""),
          taikhoan: document.getElementById("account")?.value || "Không có tài khoản",
          ngaysinh: document.getElementById("birthday")?.value || "unknown",
          gioitinh: document.getElementById("Gioitinh")?.value,
          quoctich: document.getElementById("Quoctich")?.value,
          cutru: this.updateResident(),
          cmnd: document.getElementById("regno")?.value || "000000000",
          noicap: document.getElementById("Noicap")?.value,
          dtdd: document.getElementById("dd")?.value,
          sofax: document.getElementById("soFax")?.value,
          dcemail: document.getElementById("email")?.value,
          dcnharieng: document.getElementById("dclh")?.value,
          diachitt: document.getElementById("addr1")?.value,
          tenCN: "tỉnh Kiên Giang",
        };

        doc.setData(data);

        try {
          doc.render();
          const out = doc.getZip().generate({ type: "blob" });
          saveAs(out, "DKKH_STK_MOI.docx");
        } catch (error) {
          console.error("Lỗi xử lý file:", error);
          alert("Có lỗi xảy ra khi xử lý file!");
        }
      };
    },

     exitPage() {
      window.location.href = "/home";
    }
  },
  mounted() {
    document.getElementById('image-upload').addEventListener('change', function (event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          const img = document.getElementById('image-preview');
          img.src = e.target.result;
          img.style.display = "block";
        };
        reader.readAsDataURL(file);
      }
    });
  }
};
</script>
<style>
.fullscreen {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 56px;
    left: 0;
    background-color:aliceblue; /* hoặc bất kỳ màu nền nào bạn muốn */
    overflow: auto;
    padding: 20px; /* Tuỳ chỉnh khoảng cách nội dung với viền màn hình */
    box-sizing: border-box;
}

h1 {
    text-align: center;
}

.header {
    
    display: flex;
    align-items: center;
    gap: 8px;
    justify-content: space-between;
    font-weight: bold;
    /* font-size: small; */
}

.date,
.search1 {
    color: blue;
}

.search {
    display: flex;
    align-items: center;
    gap: 10px;
}

.tc {
    margin-right: 30px;
}

.tt {
    margin-right: 0px;
}

.form-row {
    display: flex;
    align-items: center;
    gap: 10px;
    /* Khoảng cách giữa các phần tử */
    flex-wrap: wrap;
    /* Đảm bảo không bị tràn trên màn hình nhỏ */
    font-weight: bold;
}

input[type="text"] {
    width: 150px;
}

input[type="file"] {
    border: 1px solid #ccc;
    padding: 5px;
}
.custom-file-upload {
    display: inline-block;
    padding: 8px 15px;
    background-color: #007bff;
    color: white;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    font-weight: bold;
    text-align: center;
    border: none;
}

.custom-file-upload:hover {
    background-color: #0056b3;
}


/* Căn chỉnh các input cho đều nhau */
input.form-control {
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
    /* Khoảng cách giữa các input */
}

.ms-2 {
    display: block;
}

.custom-row {
    display: flex;
    align-items: center;
    gap: 15px;
    /* Khoảng cách giữa các phần tử */
    flex-wrap: wrap;
    /* Đảm bảo không bị tràn khi màn hình nhỏ */
}

.custom-row label {
    font-weight: bold;
    /* In đậm tiêu đề */
}

.custom-row input[type="text"],
.custom-row select {
    width: 200px;
    /* Độ rộng cố định cho input và select */
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.custom-row input[type="checkbox"] {
    transform: scale(1.2);
    /* Tăng kích thước checkbox */
    margin-left: 5px;
}

.checkbox-group {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    /* Đưa nội dung sát bên phải */
    gap: 15px;
    /* Tạo khoảng cách giữa các checkbox */
    text-align: right;
}

.checkbox-group label {
    display: flex;
    align-items: center;
    gap: 5px;
    /* Khoảng cách giữa label và checkbox */
    flex-direction: row-reverse;
    /* Đưa checkbox về bên phải của nhãn */
}

.table-picture {
    width: 100%;
    border: 1px solid black;
}

.table-picture td {
    padding: 10px;
    border: 1px solid #080808;
}

.col-md-10 {
    width: 83.33%;
}

.col-md-2 {
    width: 16.66%;
}

.table-container {
    width: 100%;
    overflow-x: auto;
    /* Tạo thanh cuộn ngang */
    border: 1px solid #ddd;
    /* Viền bảng */
    white-space: nowrap;
    /* Không cho xuống dòng trong bảng */
}

table {
    width: max-content;
    /* Đảm bảo bảng rộng theo nội dung */
    border-collapse: collapse;
}

th,
td {
    padding: 8px;
    border: 1px solid #ddd;
    text-align: left;
}
</style>


