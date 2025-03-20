<template>
    <div class="fullscreen">
        <h1>Đăng ký thông tin khách hàng cá nhân</h1>

        <div class="header" style="margin-top: 50px;">
            <div class="branch">
                <p><b>Chi nhánh: {{ branchName }}</b></p>
            </div>

            <div class="date">
                Ngày đăng ký thẻ: <input type="date" id="ngaydk">
            </div>
            <!-- <p>
                <b>Họ và tên:</b><input type="text" id="nmloc" placeholder="Họ và tên" class="form-control">
            </p> -->
            <div class="search">
                <label class="search1">Tìm kiếm:</label>
                <label><b>Từ ngày:</b></label> <input type="date" v-model="fromDate">
                <label><b>Đến ngày:</b></label> <input type="date" v-model="toDate">
            </div>
        </div>

        <hr>

        <div class="header" style="color: blue;">
            <div class="cb">
                <p>Cán bộ: <b style="color: black;">admin</b></p>
            </div>
            <div class="tc">
                <label>Tiêu chí tra cứu:</label>
                <select v-model="searchCriteria" class="border p-2" style="height: 35px; font-size: small; width: 200px; border-radius: 5px; margin-left: 10px;">
                    <option value="all">Tất cả</option>
                    <option value="hoten">Tên</option>
                    <option value="cmnd">CMND</option>
                    <option value="MaKH">Mã KH</option>
                </select>
            </div>
            <div class="tt">
                <label>Nhập thông tin:</label> <input type="text" v-model="searchValue" style="width: 300px;">
                <button style="color: blue; margin-left: 15px; border-radius: 10px; width: 100px;" @click="fetchCustomers"><b>Tra
                        cứu</b></button>
            </div>
        </div>

        <hr>
    
        <div style="padding: 2px; border: solid 1px black; height: 180px; display: flex; flex-direction: column;">
            <!-- Phần này sẽ tự động co giãn theo số lượng dữ liệu -->
            <div class="table-container">
                <table id="customerTable">
                    <thead>
                        <tr>
                            
                            <th>STT</th>
                            <th>In thẻ KH</th>
                            <th>Ngày Đăng Ký</th>
                            <th>Họ Tên</th>
                            <th>Tên Tắt TV</th>
                            <th>Họ Tên (English)</th>
                            <th>Tên Tắt TA</th>
                            <th>Ngày sinh</th>
                            <th>Giới tính</th>
                            <th>CMND</th>
                            <th>Ngày cấp</th>
                            <th>Nơi cấp</th>
                            <th>Nơi sinh</th>
                            <th>Địa chỉ TT</th>
                            <th>Nơi công tác</th>
                            <th>ĐC nhà riêng</th>
                            <th>Điện thoại</th>
                            <th>Di Động</th>
                            <th>Số Fax</th>
                            <th>Email</th>
                            <th>Đại diện A</th>
                            <th>Chức vụ A</th>
                            <th>Kiểm Soát</th>
                            <th>Mã KH</th>
                            <th>Tài khoản</th>
                            <th>Tên GD Viên</th>
                            <th>Mã GD Viên</th>
                            <th>Quốc tịch</th>
                            <th>Dân Tộc</th>
                            <th>Tôn Giáo</th>
                            <th>Cư trú</th>
                            <th>Nơi ký</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="searched && customers.length === 0">
                        <td colspan="8" class="border p-4 text-center text-red-500 font-bold">
                            Không có dữ liệu!
                        </td>
                        </tr>
                        <tr v-for="(customer, index) in customers" :key="customer._id">
                            <td class="border p-2">{{ index + 1 }}</td>
                            <td class="border p-2">
                                <input type="checkbox" v-model="selectedCustomers" :value="customer">
                            </td>
                            <td class="border p-2">{{ customer.ngaydk }}</td>
                            <td class="border p-2">{{ customer.hoten }}</td>
                            <td class="border p-2">{{ customer.tentattv }}</td>
                            <td class="border p-2">{{ customer.hotenenglish }}</td>
                            <td class="border p-2">{{ customer.tentatta }}</td>
                            <td class="border p-2">{{ customer.ngaysinh }}</td>
                            <td class="border p-2">{{ customer.gioitinh }}</td>
                            <td class="border p-2">{{ customer.cmnd }}</td>
                            <td class="border p-2">{{ customer.ngaycap }}</td>
                            <td class="border p-2">{{ customer.noicap }}</td>
                            <td class="border p-2">{{ customer.noisinh }}</td>
                            <td class="border p-2">{{ customer.diachitt }}</td>
                            <td class="border p-2">{{ customer.Noicongtac }}</td>
                            <td class="border p-2">{{ customer.dcnharieng }}</td>
                            <td class="border p-2">{{ customer.dienthoai }}</td>
                            <td class="border p-2">{{ customer.dtdd }}</td>
                            <td class="border p-2">{{ customer.sofax }}</td>
                            <td class="border p-2">{{ customer.dcemail }}</td>
                            <td class="border p-2">{{ customer.daidienA }}</td>
                            <td class="border p-2">{{ customer.chucvuA }}</td>
                            <td class="border p-2">{{ customer.kiemsoat }}</td>
                            <td class="border p-2">{{ customer.MaKH }}</td>
                            <td class="border p-2">{{ customer.taikhoan }}</td>
                            <td class="border p-2">{{ customer.tenGDvien }}</td>
                            <td class="border p-2">{{ customer.MaGDvien }}</td>
                            <td class="border p-2">{{ customer.quoctich }}</td>
                            <td class="border p-2">{{ customer.Dantoc }}</td>
                            <td class="border p-2">{{ customer.tongiao }}</td>
                            <td class="border p-2">{{ customer.cutru }}</td>
                            <td class="border p-2">{{ customer.noiky }}</td>
                            
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>



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
                        <p><b>Tên tiếng:</b><input type="text" id="nm" placeholder="Tên tiếng anh" class="form-control"></p>

                        <p><b>CMND:</b><input class="form-control" id="regno"></p>
                        <p><b>Quốc tịch:</b><input class="form-control" id="Quoctich"></p>
                        <p><b>Điện thoại LH:</b><input class="form-control" id="dienthoai"></p>
                        <p><b>Địa chỉ TT:</b><input class="form-control" style="width: 212%;" id="addr1"></p>
                    </div>
                    <div class="col">
                        <p><b>Tên tắt TV:</b><input class="form-control" id="shrtnmloc"></p>
                        <p><b>Tên tắt TA:</b><input class="form-control" id="shrtnm"></p>
                        <p><b>Ngày cấp:</b><input class="form-control" id="issuedt1" ></p>
                        <p><b>Dân tộc:</b><input class="form-control" id="Dantoc"></p>
                        <p><b>Di động:</b><input class="form-control" id="dd"></p>
                    </div>
                </div>
            </div>



            <div class="col-md-6">
                <div class="row">
                    <div class="col">
                        <p><b>Ngày sinh:</b> <input class="form-control" id="birthday" type="date"></p>
                        <p><b>Tôn giáo:</b> <input class="form-control" id="tongiao"></p>
                        <p><b>Nơi cấp:</b> <input class="form-control" id="Noicap"></p>
                        <p><b>Email:</b> <input class="form-control" style="width: 200%;" id="email"></p>
                        <p><b>Cố định/Fax:</b> <input class="form-control" style="width: 200%;" id="soFax"></p>
                        <p><b>Địa chỉ LH:</b> <input class="form-control" style="width: 200%;" id="dclh"></p>
                    </div>
                    <div class="col">
                        <p><b>Nơi sinh:</b> <input class="form-control" id="noisinh" type="text" style="width: 200px;"></p>

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
                <option value="201">201</option>
                <option value="202">202</option>
                <option value="203">203</option>
                <option value="204">204</option>
                <option value="205">205</option>
                <option value="206">206</option>
                <option value="207">207</option>
                <option value="208">208</option>
                <option value="209">209</option>
                <option value="215">215</option>
                <option value="220">220</option>
            </select>

            <input type="checkbox" id="abic" >
            <label for="abic">Đăng ký DV bảo hiểm ABIC</label>

            <label for="position" style="margin-left: 10px;">Chức vụ:</label>
            <select id="position" style="width: 17%;">
                <option value="">Chọn chức vụ</option>
                <option value="staff">Nhân viên</option>
                <option value="VicePresident">Phó giám đốc</option>
                <option value="director">Giám đốc</option>
            </select>
        </div>

        <hr>

        <div>
            <!-- Dòng 1: Thẻ và các lựa chọn -->
            <div class="row" style="font-size:91%;">
                <div class="col-md-1" style="color: blue;"><b>Thẻ:</b></div>
                <div class="col-md-11" style="text-align: right;">
                    <label for="the-ghi-noi-dia"> Thẻ ghi nội địa</label><input style="margin-left: 5px;" type="checkbox" id="the-ghi-noi-dia">
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
                    <label for="ph-thuong" > Phát hành thường</label><input style="margin-left: 5px;" type="checkbox" id="ph-thuong" >
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
                <input type="checkbox" id="mb-sms" ><label for="mb-sms"> Mobile Banking(SMS)</label>
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
                        <input type="checkbox" id="tnh" style="margin-left: 25px;" ><label for="tnh" style="margin-left: 10px;"> Tại ngân hàng</label>
                        <input type="checkbox" id="dcht" style="margin-left: 50px;"><label for="dcht" style="margin-left: 10px;"> Địa chỉ hiện tại</label>
                    </div>
                </td>
            </tr>
            <tr>
                <td class="col-md-10">
                    <label for="daidienA"  style="margin-left: 45px;">Đại diện A:</label>
                    <!-- <input type="text" id="customer-A" style="margin-left: 20px; width: 50%;"> -->
                    <select id="daidienA"  style="margin-left: 20px; width: 50%;" >
                        <option value=""></option>
                        <option value="Nguyễn Hồng Thắm">Nguyễn Hồng Thắm</option>
                        <option value="Trần Thị Hồng Anh">Trần Thị Hồng Anh</option>
                        <option value="Lê Sỹ">Lê Sỹ</option>
                    </select>

                    <label for="chucvuA" style="margin-left: 40px;">Chức vụ:</label>
                    <select id="chucvuA"  style="margin-left: 20px; width: 20%; height: 33px;" >
                        <option value="">Chọn chức vụ</option>
                        <option value="Giám đốc">Giám đốc</option>
                        <option value="Nhân Viên">Phó giám đốc</option>
                    </select>
                </td>
            </tr>
            <tr>
                <td class="col-md-10" >
                    <label for="kiemsoat" >Kiểm soát:</label>
                    <!-- <input type="text" id="kiemsoat" style="margin-left: 20px; margin-right: 260px; width: 50%;"> -->
                    <select id="kiemsoat" style="margin-left: 20px; margin-right: 260px; width: 50%;" >
                        <option value=""></option>
                        <option value="Nguyễn Mỹ Chi">Nguyễn Mỹ Chi</option>
                        <option value="Trần Lương Thiện">Trần Lương Thiện</option>
                        <option value="Đinh Thúy Vân">Đinh Thúy Vân</option>
                        <option value="Nguyễn Thị Thảo">Nguyễn Thị Thảo</option>
                    </select>
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
                <button style="margin-left: 10px; border-radius: 8px; background-color: red; color: white;">Xóa dữ liệu</button>
                <button style="margin-left: 60px; border-radius: 8px; background-color: green; color: white;">Tạo mới</button>
                 <label for="wordFileSelect" style="margin-left: 60px; border-radius: 8px;"><b style="color: blue;">Mẫu in:</b></label>
                <select id="wordFileSelect" style="margin-left: 10px; border: solid black 2px; border-radius: 5px;">
                    <option v-if="wordFiles.length === 0" disabled>Đang tải...</option>
                    <option v-for="file in wordFiles" :key="file" :value="file">{{ file }}</option>
                </select>
                <button style="margin-left: 20px; border-radius: 8px; background-color: greenyellow; " @click="generateWord">In Mẫu Thẻ</button>
                
                <button @click="thongke" style="margin-left: 40px; border-radius: 8px; background-color: gold; ">
                    Thống Kê CN SD
                </button>
                
                <button 
                    style="margin-left: 40px; border-radius: 8px; background-color: gray; color: white;" 
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
import DatabaseService from "../services/database.service"; // Import service
// import { get } from "../../../QuanLyThe/app/router/database.router";

export default {
    data() {
        return {
            wordFiles: [],
            loggedInUser: null, // Thông tin người dùng đăng nhập
            branchMap: { // Mapping MaCN -> Tên Chi Nhánh
                    7700: "7700 - Tỉnh Kiên Giang",
                    7701: "7701 - Huyện Kiên Lương",
                    7706: "7706 - Huyện Hòn Đất",
                    7708: "7708 - Huyện Kiên Hải",
                    7711: "7711 - Huyện Hà Tiên",
                    7712: "7712 - Huyện Ba Hòn",
                    7713: "7713 - HuyệnRạch Sỏi",
                    7715: "7715 - TP Rạch Giá",
                    7716: "7716 - Mỹ Lâm",
            },
             madonviList: {
                7700: "Tỉnh Kiên Giang",
                7701: "Huyện Kiên Lương",
                7706: "Huyện Hòn Đất",
                7708: "Huyện Kiên Hải",
                7711: "Huyện Hà Tiên",
                7712: "Huyện Ba Hòn",
                7713: "Huyện Rạch Sỏi",
                7715: "TP Rạch Giá",
                7716: "Mỹ Lâm",
            },


            fromDate: "",
            toDate: "",
            searchCriteria: "all",
            searchValue: "",
            customers: [],
            selectedCustomers: [],
            issueDate: "",
            expiryDate: "",
            searched: false,
        };
    },
    computed: {
        branchName() {
            if (this.loggedInUser && this.loggedInUser.MaCN) {
                return this.branchMap[this.loggedInUser.MaCN] || "Chi nhánh không xác định";
            }
            return "Chi nhánh chưa đăng nhập";
        },
    },
  methods: {
    async fetchCustomers() {
  try {
    let allCustomers = await DatabaseService.getAll();
    this.searched = true;

    this.customers = allCustomers.filter(customer => {
      let isValidDate = true;
      let isValidSearch = true;

      // Lọc theo ngày đăng ký (nếu có)
      if (this.fromDate && this.toDate) {
        let ngaydk = new Date(customer.ngaydk);
        let from = new Date(this.fromDate);
        let to = new Date(this.toDate);
        isValidDate = ngaydk >= from && ngaydk <= to;
      }

      // Lọc theo tiêu chí tìm kiếm
      if (this.searchValue) {
        let searchValueLower = this.searchValue.toLowerCase();

        if (this.searchCriteria === "all") {
          // Nếu tìm kiếm "Tất cả", kiểm tra tất cả các trường
          isValidSearch = ["hoten", "cmnd", "MaKH"].some(key => 
            customer[key] && String(customer[key]).toLowerCase().includes(searchValueLower)
          );
        } else {
          // Nếu tìm kiếm theo một tiêu chí cụ thể
          let fieldValue = customer[this.searchCriteria] ? String(customer[this.searchCriteria]).toLowerCase() : "";
          isValidSearch = fieldValue.includes(searchValueLower);
        }
      }

      return isValidDate && isValidSearch;
    });

  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu khách hàng:", error);
  }
},
    fetchWordFiles() {
      fetch("http://10.143.0.187:3000/api/word-files")
        .then(response => response.json())
        .then(files => {
          this.wordFiles = files;
        })
        .catch(error => console.error("Lỗi tải danh sách file:", error));
    },

    getLoggedInUser() {
            const userData = localStorage.getItem("user");
            if (userData) {
                this.loggedInUser = JSON.parse(userData);
                console.log("Người dùng đăng nhập:", this.loggedInUser);
            }
        },

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

    async generateWord() {
            const selectedFile = document.getElementById("wordFileSelect").value;
            if (!selectedFile) {
                alert("Vui lòng chọn file Word mẫu!");
                return;
            }

            try {
                // 1️⃣ Tải file Word mẫu từ server
                const response = await fetch(`http://10.143.0.187:3000/api/download-word?fileName=${selectedFile}`);
                const content = await response.arrayBuffer();
                const zip = new PizZip(content);
                const doc = new Docxtemplater(zip, { paragraphLoop: true, linebreaks: true });

                // 2️⃣ Lấy thông tin từ người dùng đăng nhập
                const user = this.loggedInUser;
                if (!user) {
                    alert("Không tìm thấy thông tin người dùng. Vui lòng đăng nhập lại!");
                    return;
                }

                // Kiểm tra user.Madonvi và gán giá trị tương ứng
                let diachiCN = "";
                let dtnghenghiep = "";

                if (user.Madonvi === 20) {
                    diachiCN = "01 Hàm Nghi - TPRG - Kiên Giang";
                    dtnghenghiep = "0297.863738";
                } else if (user.Madonvi === 24) {
                    diachiCN = "Huyện Kiên Lương - Kiên Giang";
                    dtnghenghiep = "0297.853016";
                } else if (user.Madonvi === 1) {
                    diachiCN = "234 Trần Phú, Rạch Giá, Kiên Giang";
                    dtnghenghiep = "0297.875243";
                }
                else if (user.Madonvi === 27) {
                    diachiCN = "Huyện Hòn Đất";
                    dtnghenghiep = "0297.841017";
                }
                else if (user.Madonvi === 28) {
                    diachiCN = "Huyện Kiên Hải";
                    dtnghenghiep = "0297.830008";
                }
                
                else if (user.Madonvi === 36) {
                    diachiCN = "Hà Tiên";
                    dtnghenghiep = "0297.851888";
                }
                //
                else if (user.Madonvi === 37) {
                    diachiCN = "Tân Khánh Hòa - Giang Thành - Kiên Giang";
                    dtnghenghiep = "0297.851888";
                }
                else if (user.Madonvi === 40) {
                    diachiCN = "Ba Hòn";
                    dtnghenghiep = "0297.751177";
                }
                //
                else if (user.Madonvi === 29) {
                    diachiCN = "Bình An - Kiên Lương - Kiên Giang";
                    dtnghenghiep = "0297.751177";
                }
                else if (user.Madonvi === 32) {
                    diachiCN = "Rạch Sỏi";
                    dtnghenghiep = "0297.864063";
                }
                else if (user.Madonvi === 42) {
                    diachiCN = "Mong Thọ - Rạch Sỏi";
                    dtnghenghiep = "0297.625256";
                }
                else if (user.Madonvi === 33) {
                    diachiCN = "Lô C11 Số 38-39 đường 3/2 - TPRG - Kiên Giang";
                    dtnghenghiep = "0297.876155";
                }
                else if (user.Madonvi === 2) {
                    diachiCN = "166 Nguyễn trung Trực - TPRG - Kiên Giang";
                    dtnghenghiep = "0297.863136";
                }
                else if (user.Madonvi === 34) {
                    diachiCN = "105 QL80 Ấp Hưng Giang - Xã Mỹ Lâm - Hòn Đất - Kiên Giang";
                    dtnghenghiep = "0297.890228";
                }
                else if (user.Madonvi === 45) {
                    diachiCN = "44 KP. Thị Tứ , TT.Sóc Sơn,H.Hòn Đất, T.Kiên Giang";
                    dtnghenghiep = "0297.742154";
                }

                 // 2️⃣ Lấy ngày tháng năm hiện tại
                const today = new Date();
                const ddk = today.getDate().toString().padStart(2, "0"); // Lấy ngày, đảm bảo 2 chữ số
                const mdk = (today.getMonth() + 1).toString().padStart(2, "0"); // Lấy tháng (tháng bắt đầu từ 0)
                const ydk = today.getFullYear().toString(); // Lấy năm

                // 3️⃣ Chuẩn bị dữ liệu
                const getValueOrNull = (id) => {
                    const element = document.getElementById(id);
                    return element?.value?.trim() || null;
                };

                const data = {
                    hoten: getValueOrNull("nmloc"),
                    hotenenglish: getValueOrNull("nm"),
                    tentattv: getValueOrNull("shrtnmloc"),
                    tentatta: getValueOrNull("shrtnm"),
                    MaKH: getValueOrNull("custno"),
                    ngaycap: this.formatDate(getValueOrNull("issuedt1")),
                    taikhoan: getValueOrNull("account"),
                    ngaysinh: getValueOrNull("birthday"),
                    noisinh: getValueOrNull("noisinh"),
                    gioitinh: getValueOrNull("Gioitinh"),
                    quoctich: getValueOrNull("Quoctich"),
                    cutru: this.updateResident() || null,
                    cmnd: getValueOrNull("regno"),
                    noicap: getValueOrNull("Noicap"),
                    dienthoai: getValueOrNull("dienthoai"),
                    dtdd: getValueOrNull("dd"),
                    sofax: getValueOrNull("soFax"),
                    dcemail: getValueOrNull("email"),
                    dcnharieng: getValueOrNull("dclh"),
                    diachitt: getValueOrNull("addr1"),
                    Madonvi: user.Madonvi,
                    MaCN: user.MaCN,
                    tenCN: this.madonviList[user.MaCN] || "Chi nhánh không xác định",
                    tenGDvien: user.name,
                    MaGDvien: user.user,
                    ngaydk: getValueOrNull("ngaydk"),
                    Dantoc: getValueOrNull("Dantoc"),
                    tongiao: getValueOrNull("tongiao"),
                    daidienA: getValueOrNull ("daidienA"),
                    chucvuA: getValueOrNull("chucvuA"),
                    kiemsoat: getValueOrNull("kiemsoat"),


                    //NULL
                    tenta: getValueOrNull("tenta"),
                    manoicapCMT: getValueOrNull("manoicapCMT"),
                    province: getValueOrNull("province"),
                    district: getValueOrNull("district"),
                    commune: getValueOrNull("commune"),
                    Noicongtac: getValueOrNull("Noicongtac"),
                    nhanvienNN: getValueOrNull("nhanvienNN"),
                    QuanlyNN: getValueOrNull("QuanlyNN"),
                    TukinhdoanhNN: getValueOrNull("TukinhdoanhNN"),
                    congnhanNN: getValueOrNull("congnhanNN"),
                    congchucNN: getValueOrNull("congchucNN"),
                    nongdanNN: getValueOrNull("nongdanNN"),
                    sinhvienNN: getValueOrNull("sinhvienNN"),
                    khacNN: getValueOrNull("khacNN"),
                    motaikhoan: getValueOrNull("motaikhoan"),
                    khongDYMTK: getValueOrNull("khongDYMTK"),
                    lydokhongMTK: getValueOrNull("lydokhongMTK"),
                    phathanhthe: getValueOrNull("phathanhthe"),
                    khongPHthe: getValueOrNull("khongPHthe"),
                    lydokhongPHT: getValueOrNull("lydokhongPHT"),
                    //
                    diachiNN: getValueOrNull("diachiNN"),
                    dienthoaiNN: getValueOrNull("dienthoaiNN"),
                    //
                    chucvuNN: getValueOrNull("chucvuNN"),
                    SoQDTL: getValueOrNull("SoQDTL"),
                    ngaycapQDTL: getValueOrNull("ngaycapQDTL"),
                    noicapQDTL: getValueOrNull("noicapQDTL"),
                    SoDKKD: getValueOrNull("SoDKKD"),
                    ngaycapDKKD: getValueOrNull("ngaycapDKKD"),
                    noicapDKKD: getValueOrNull("noicapDKKD"),
                    MST: getValueOrNull("MST"),
                    ngaycapMST: getValueOrNull("ngaycapMST"),
                    noicapMST: getValueOrNull("noicapMST"),
                    ttthe: getValueOrNull("ttthe"), //thông tin
                    //
                    ngayphathanh: getValueOrNull("ngayphathanh"),
                    ngaydenhan: getValueOrNull("ngaydenhan"),
                    //
                    loaikh: getValueOrNull("loaikh"),
                    thesuccess: getValueOrNull("thesuccess"),
                    thelapnghiep: getValueOrNull("thelapnghiep"),
                    thevisaDebit: getValueOrNull("thevisaDebit"),
                    theghinoqt: getValueOrNull("theghinoqt"),
                    thetindungqt: getValueOrNull("thetindungqt"),
                    thelienketsv: getValueOrNull("thelienketsv"),
                    thebachkim: getValueOrNull("thebachkim"),
                    DKPHTheGNnoidia: getValueOrNull("DKPHTheGNnoidia"),
                    themaster: getValueOrNull("themaster"),
                    thechuan: getValueOrNull("thechuan"),
                    thevang: getValueOrNull("thevang"),
                    thePHthuong: getValueOrNull("thePHthuong"),
                    thePHnhanh: getValueOrNull("thePHnhanh"),
                    DKSMSbanking: getValueOrNull("DKSMSbanking"),
                    DKDTDDSMS: getValueOrNull("DKDTDDSMS"),
                    DVInternet: getValueOrNull("DVInternet"),
                    noiky: "Kiên Giang",
                    // Gán từng giá trị riêng biệt
                    ddk: ddk,  // Ngày
                    mdk: mdk,  // Tháng
                    ydk: ydk,  // Năm
                    //
                    dtnghenghiep: getValueOrNull(""),
                    diachiCN: getValueOrNull(),
                    diachiCN: diachiCN,  // Địa chỉ chi nhánh theo Madonvi
                    dtnghenghiep: dtnghenghiep,  // Điện thoại ngành nghiệp theo Madonvi

                };

                // 4️⃣ Điền dữ liệu vào file Word
                doc.setData(data);
                doc.render();

                // 5️⃣ Xuất file Word
                const out = doc.getZip().generate({ type: "blob" });
                saveAs(out, "QLThe file word.docx");

                // 6️⃣ Gửi dữ liệu lên database
                const savedData = await DatabaseService.create(data);
                console.log("Dữ liệu đã lưu:", savedData);
                alert("Dữ liệu đã được lưu thành công!");

            } catch (error) {
                console.error("Lỗi khi tạo file hoặc lưu dữ liệu:", error);
                alert("Có lỗi xảy ra, vui lòng thử lại!");
            }
        },

        





    exitPage() {
        window.location.href = "/home";
    },
    thongke() {
        window.location.href = "/thongke";
    },
    
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

    this.fetchWordFiles();
    this.getLoggedInUser();
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
    margin-bottom: 0px;
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

.table-container {
    width: 100%;
    overflow-x: auto;
    border: 1px solid #ddd;
    margin-top: 10px;
}

#customerTable {
    width: 100%;
    border-collapse: collapse;
    white-space: nowrap;
}

#customerTable th,
#customerTable td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
}

#customerTable th {
    background-color: #f4f4f4;
}

</style>


