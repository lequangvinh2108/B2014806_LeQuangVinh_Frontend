<template>
  <div class="fullscreen">
    <h1>Đăng ký thông tin khách hàng cá nhân</h1>

    <div class="header" style="margin-top: 50px">
      <div class="branch">
        <p>
          <b>Chi nhánh: {{ branchName }}</b>
        </p>
      </div>

      <div class="date">
        Ngày đăng ký thẻ:
        <input type="date" id="ngaydk" v-model="selectedCustomer.ngaydk" />
      </div>
      <!-- <p>
                <b>Họ và tên:</b><input type="text" id="nmloc" placeholder="Họ và tên" class="form-control">
            </p> -->
      <div class="search">
        <label class="search1">Tìm kiếm:</label>
        <label><b>Từ ngày:</b></label> <input type="date" v-model="fromDate" />
        <label><b>Đến ngày:</b></label> <input type="date" v-model="toDate" />
      </div>
    </div>

    <hr />

    <div class="header" style="color: blue">
      <div class="cb">
        <p>Cán bộ: <b style="color: black">admin</b></p>
      </div>
      <div class="tc">
        <label>Tiêu chí tra cứu:</label>
        <select
          v-model="searchCriteria"
          class="border p-2"
          style="
            height: 35px;
            font-size: small;
            width: 200px;
            border-radius: 5px;
            margin-left: 10px;
          "
        >
          <option value="all">Tất cả</option>
          <option value="hoten">Tên</option>
          <option value="cmnd">CMND</option>
          <option value="MaKH">Mã KH</option>
        </select>
      </div>
      <div class="tt">
        <label>Nhập thông tin:</label>
        <input type="text" v-model="searchValue" style="width: 300px" />
        <button
          style="
            color: blue;
            margin-left: 15px;
            border-radius: 10px;
            width: 100px;
          "
          @click="fetchCustomers"
        >
          <b>Tra cứu</b>
        </button>
      </div>
    </div>

    <hr />

    <div
      style="
        padding: 2px;
        border: solid 1px black;
        height: 180px;
        display: flex;
        flex-direction: column;
      "
    >
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
          <tbody style="background-color: white">
            <tr v-if="searched && customers.length === 0">
              <td
                colspan="8"
                class="border p-4 text-center text-red-500 font-bold"
              >
                Không có dữ liệu!
              </td>
            </tr>
            <tr v-for="(customer, index) in customers" :key="customer._id">
              <td class="border p-2">{{ index + 1 }}</td>
              <td class="border p-2">
                <input
                  type="checkbox"
                  v-model="selectedCustomers"
                  :value="customer"
                  style="transform: scale(1.9); text-align: center"
                />
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

    <hr />

    <div class="form-row">
      <!-- Chọn file -->
      <label for="file-upload" class="custom-file-upload"
        >Nhập từ file IPCAS</label
      >
      <!-- <input type="file" id="file-upload" hidden> -->
      <input type="file" id="file-upload" @change="handleFileUpload" hidden />

      <!-- Checkbox Đăng ký mở TK -->
      <input type="checkbox" id="motaikhoan" checked />
      <label for="motaikhoan">Đăng ký mở TK thanh toán</label>

      <!-- Checkbox Đăng ký dịch vụ -->
      <input type="checkbox" id="dangkyDV" checked />
      <label for="dangkyDV">Đăng ký dịch vụ</label>

      <!-- Loại tiền -->
      <label>Loại tiền:</label>
      <input
        type="radio"
        id="currency-vnd"
        name="currency"
        value="VND"
        checked
      />
      <label for="currency-vnd">VND</label>

      <input type="radio" id="currency-usd" name="currency" value="USD" />
      <label for="currency-usd">USD</label>

      <input type="radio" id="currency-eur" name="currency" value="EUR" />
      <label for="currency-eur">EUR</label>

      <input type="radio" id="currency-other" name="currency" value="other" />
      <label for="currency-other">Khác:</label>
      <input
        type="text"
        id="currency-other-input"
        style="width: 13%"
        placeholder="Nhập tên loại tiền"
      />
    </div>

    <hr />

    <div class="row" style="border: 1px solid #161515; padding: 20px">
      <div class="col-md-6">
        <div class="row">
          <div class="col">
            <p>
              <b>Họ và tên:</b
              ><input
                type="text"
                id="nmloc"
                placeholder="Họ và tên"
                class="form-control"
                v-model="selectedCustomer.hoten"
              />
            </p>
            <p>
              <b>Tên tiếng:</b
              ><input
                type="text"
                id="nm"
                v-model="selectedCustomer.hotenenglish"
                placeholder="Tên tiếng anh"
                class="form-control"
              />
            </p>
            <p>
              <b>CMND:</b
              ><input
                class="form-control"
                id="regno"
                v-model="selectedCustomer.cmnd"
              />
            </p>
            <p>
              <b>Quốc tịch:</b
              ><input
                class="form-control"
                id="Quoctich"
                v-model="selectedCustomer.quoctich"
              />
            </p>
            <p>
              <b>Điện thoại LH:</b>
              <input
                type="text"
                class="form-control"
                id="name_4"
                v-model="selectedCustomer.dienthoai"
                @dblclick="selectedCustomer.dtdd = selectedCustomer.dienthoai"
              />
            </p>

            <p>
              <b>Địa chỉ TT:</b
              ><input
                class="form-control"
                style="width: 212%"
                id="addr1"
                v-model="selectedCustomer.diachitt"
                @dblclick="
                  selectedCustomer.dcnharieng = selectedCustomer.diachitt
                "
              />
            </p>
          </div>
          <div class="col">
            <p>
              <b>Tên tắt TV:</b
              ><input
                class="form-control"
                id="shrtnmloc"
                v-model="selectedCustomer.tentattv"
              />
            </p>
            <p>
              <b>Tên tắt TA:</b
              ><input
                class="form-control"
                id="shrtnm"
                v-model="selectedCustomer.tentatta"
              />
            </p>
            <p>
              <b>Ngày cấp:</b
              ><input
                class="form-control"
                id="issuedt1"
                v-model="selectedCustomer.ngaycap"
              />
            </p>
            <p>
              <b>Dân tộc:</b
              ><input
                class="form-control"
                id="Dantoc"
                v-model="selectedCustomer.Dantoc"
              />
            </p>
            <p>
              <b>Di động:</b
              ><input
                class="form-control"
                id="dd"
                v-model="selectedCustomer.dtdd"
              />
            </p>
          </div>
        </div>
      </div>

      <div class="col-md-6">
        <div class="row">
          <div class="col">
            <p>
              <b>Ngày sinh:</b>
              <input
                class="form-control"
                id="name_1"
                v-model="selectedCustomer.ngaysinh"
              />
            </p>
            <p>
              <b>Tôn giáo:</b>
              <input
                class="form-control"
                id="tongiao"
                v-model="selectedCustomer.tongiao"
              />
            </p>
            <!-- <p>
              <b>Nơi cấp:</b>
              <input
                class="form-control"
                id="Noicap"
                v-model="selectedCustomer.noicap"
              />
            </p> -->
            <p>
              <b>Nơi cấp:</b>
              <input
                class="form-control"
                id="Noicap"
                list="noicapOptions"
                v-model="selectedCustomer.noicap"
              />
              <datalist id="noicapOptions">
                <option
                  v-for="(label, code) in ListNgayHethanHLCCCD"
                  :key="code"
                  :value="label"
                />
              </datalist>
            </p>

            <p>
              <b>Email:</b>
              <input
                class="form-control"
                id="email"
                v-model="selectedCustomer.dcemail"
              />
            </p>
            <p>
              <b>Cố định/Fax:</b>
              <input
                class="form-control"
                style="width: 200%"
                id="soFax"
                v-model="selectedCustomer.sofax"
              />
            </p>
            <p>
              <b>Địa chỉ LH:</b>
              <input
                class="form-control"
                style="width: 200%"
                id="dclh"
                v-model="selectedCustomer.dcnharieng"
              />
            </p>
          </div>
          <div class="col">
            <p>
              <b>Nơi sinh:</b>
              <input
                class="form-control"
                id="noisinh"
                v-model="selectedCustomer.noisinh"
                type="text"
                style="width: 200px"
              />
            </p>

            <p class="d-flex align-items-center">
              <b>Cư trú:</b>
            </p>
            <div class="ms-2">
              <input
                type="radio"
                id="resident-yes"
                v-model="selectedCustomer.cutru"
                name="resident"
                value="Có"
                checked
                onchange="updateResident()"
              />
              <label for="resident-yes" style="margin-left: 10px">Có</label>
              <input
                style="margin-left: 40px"
                type="radio"
                id="resident-no"
                v-model="selectedCustomer.cutru"
                name="resident"
                value="Không"
                onchange="updateResident()"
              />
              <label for="resident-no" style="margin-left: 10px">Không</label>
            </div>
            <p>
              <b>Ngày hết hạn HL:</b>
              <input
                class="form-control"
                type="date"
                id="NgayHethanHL"
                style="width: 200px; margin-top: 5px"
                v-model="selectedCustomer.NgayHethanHL"
                name=""
              />
            </p>
            <p style="margin-top: 6px">
              <b>Giới tính:</b><br />
              <!-- <select class="form-control" style="width: 200px;  height: 38px;" id="name_3" v-model="selectedCustomer.gioitinh">
                                <option value="Nam">Nam</option>
                                <option value="Nữ">Nữ</option>
                                <option value="Khác">Khác</option>
                            </select> -->
              <input
                type="text"
                class="form-control"
                style="width: 200px; height: 38px"
                id="name_3"
                v-model="selectedCustomer.gioitinh"
              />
            </p>
          </div>
        </div>
      </div>
    </div>

    <hr />

    <div class="custom-row">
      <label for="customer-id">Mã số KH:</label>
      <input
        type="text"
        id="custno"
        v-model="selectedCustomer.MaKH"
        style="width: 13%; height: 35px"
      />

      <label for="account" style="margin-left: 100px">Tài khoản:</label>
      <input
        list="accountOptions"
        id="account"
        v-model="selectedCustomer.taikhoan"
        class="form-control"
        style="width: 200px; display: inline-block"
      />

      <datalist id="accountOptions">
        <option value="201"></option>
        <option value="202"></option>
        <option value="203"></option>
        <option value="204"></option>
        <option value="205"></option>
        <option value="206"></option>
        <option value="207"></option>
        <option value="208"></option>
        <option value="209"></option>
        <option value="215"></option>
        <option value="220"></option>
      </datalist>
      <input type="checkbox" id="abic" checked style="margin-left: 100px" />
      <label for="abic">Đăng ký DV bảo hiểm ABIC</label>
    </div>
    <hr />
    <div>
      <!-- Dòng 1: Thẻ và các lựa chọn -->
      <div class="row" style="font-size: 100%">
        <div class="col-md-2" style="color: blue"><b>Thẻ:</b></div>
        <div class="col-md-10">
          <label for="DKPHTheGNnoidia"> Thẻ ghi nội địa</label
          ><input
            style="margin-left: 5px"
            type="checkbox"
            id="DKPHTheGNnoidia"
            checked
          />
          <label for="thevisaDebit" style="margin-left: 20px"> Visa</label
          ><input type="checkbox" id="thevisaDebit" style="margin-left: 5px" />
          <label for="thelapnghiep" style="margin-left: 20px">
            Thẻ lập nghiệp</label
          ><input style="margin-left: 5px" type="checkbox" id="thelapnghiep" />
          <label for="themaster" style="margin-left: 20px"> Mastercard</label
          ><input style="margin-left: 5px" type="checkbox" id="themaster" />
          <label for="thelkthuonghieu" style="margin-left: 20px">
            Thẻ LK thương hiệu</label
          ><input
            style="margin-left: 5px"
            type="checkbox"
            id="thelkthuonghieu"
          />
          <label for="thejcb" style="margin-left: 20px"> JCB</label
          ><input style="margin-left: 5px" type="checkbox" id="thejcb" />
          <label for="thekhac" style="margin-left: 20px"> Thẻ khác</label
          ><input style="margin-left: 5px" type="checkbox" id="thekhac" />
        </div>
      </div>
      <!-- Hạng thẻ -->
      <div class="row" style="margin-top: 10px; font-size: 100%">
        <div class="col-md-2" style="color: blue"><b>Hạng thẻ:</b></div>
        <div class="col-md-10">
          <!-- <label
            ><input
              type="checkbox"
              v-model="cardTypes.plusSuccess"
              @change="handleCardTypeChange"
            />
            Plus Success</label
          >
          <label style="margin-left: 20px"
            ><input
              type="checkbox"
              v-model="cardTypes.success"
              @change="handleCardTypeChange"
            />
            Success</label
          >
          <label style="margin-left: 20px"
            ><input type="checkbox" v-model="cardTypes.vang" /> Hạng vàng</label
          >
          <label style="margin-left: 20px"
            ><input type="checkbox" v-model="cardTypes.chuan" /> Hạng
            chuẩn</label
          > -->
          <label>
            <input
              type="checkbox"
              v-model="cardTypes.plusSuccess"
              @change="handlePlusSuccessChange"
            />
            Plus Success
          </label>

          <label style="margin-left: 20px">
            <input
              type="checkbox"
              v-model="cardTypes.success"
              @change="handleSuccessChange"
            />
            Success
          </label>

          <label style="margin-left: 20px">
            <input type="checkbox" v-model="cardTypes.vang" /> Hạng vàng
          </label>

          <label style="margin-left: 20px">
            <input type="checkbox" v-model="cardTypes.chuan" /> Hạng chuẩn
          </label>

          <label style="margin-left: 20px"
            ><input type="checkbox" v-model="cardTypes.bachkim" /> Bạch
            kim</label
          >
          <label style="margin-left: 20px"
            ><input type="checkbox" v-model="cardTypes.kimcuong" /> Kim
            cương</label
          >
        </div>
      </div>

      <!-- Hình thức PH -->
      <div class="row" style="margin-top: 10px; font-size: 100%">
        <div class="col-md-2" style="color: blue"><b>Hình thức PH:</b></div>
        <div class="col-md-10">
          <label
            ><input
              type="checkbox"
              v-model="ph.phthuong"
              @change="handlePHLoaiChange('phthuong')"
            />
            Phát hành thường</label
          >
          <label style="margin-left: 20px"
            ><input
              type="checkbox"
              v-model="ph.phnhanh"
              @change="handlePHLoaiChange('phnhanh')"
            />
            Phát hành nhanh</label
          >
          <label style="margin-left: 20px"
            ><input
              type="checkbox"
              v-model="ph.phlandau"
              @change="handlePHDotChange('phlandau')"
            />
            Phát hành lần đầu</label
          >
          <label style="margin-left: 20px"
            ><input
              type="checkbox"
              v-model="ph.phlai"
              @change="handlePHDotChange('phlai')"
            />
            Phát hành lại</label
          >
        </div>
      </div>
    </div>

    <hr />

    <div class="row" style="margin-top: 10px">
      <div class="col-md-2" style="color: red"><b>ĐK Mobile Banking:</b></div>
      <div class="col-md-10 checkbox-group">
        <input type="checkbox" id="AgribankPlus" checked /><label
          for="AgribankPlus"
          style="margin-left: 5px"
        >
          Agribank Plus</label
        >
        <input type="checkbox" id="Ecommerce" style="margin-left: 10px" /><label
          for="Ecommerce"
          style="margin-left: 5px"
        >
          E-commerce</label
        >
        <input
          type="checkbox"
          id="LKvidientu"
          style="margin-left: 10px"
        /><label for="LKvidientu" style="margin-left: 5px">
          LK Ví diện tử</label
        >
        <input
          type="checkbox"
          id="DKSMSbanking"
          style="margin-left: 10px"
        /><label for="DKSMSbanking" style="margin-left: 5px">
          Mobile Banking(SMS)</label
        >
        <input type="checkbox" id="BANKPLUS" style="margin-left: 10px" /><label
          for="BANKPLUS"
          style="margin-left: 5px"
        >
          Bank Plus</label
        >
        <label for="sdtAP" style="margin-left: 10px"> Số ĐT sử dụng: </label
        ><input type="text" id="sdtAP" style="margin-left: 5px" />
      </div>
    </div>

    <hr />

    <div class="row" style="margin-top: 10px">
      <div class="col-md-2" style="color: blue" for="mb-sms">
        <b>Hình thức nhận thẻ:</b>
      </div>
      <div class="col-md-10 checkbox-group">
        <input
          type="checkbox"
          id="NTtainganhang"
          :checked="hinhThucNhanThe === 'Tại ngân hàng'"
          @change="updateHinhThucNhanThe('Tại ngân hàng')"
        />
        <label for="NTtainganhang" style="margin-left: 10px">
          Tại ngân hàng</label
        >
        <input
          type="checkbox"
          id="NTquabuudien"
          :checked="hinhThucNhanThe === 'Qua bưu điện'"
          @change="updateHinhThucNhanThe('Qua bưu điện')"
          style="margin-left: 50px"
        />
        <label for="NTquabuudien" style="margin-left: 10px">
          Quan bưu điện</label
        >
      </div>
    </div>
    <div class="row" style="margin-top: 10px">
      <!-- <label for="daidienA" style="margin-left: 20px;">Đại diện A:</label> -->
      <div class="col-md-2" style="color: blue" for="daidienA">
        <b>Đại diện A:</b>
      </div>
      <div class="col-md-10 checkbox-group">
        <select
          id="daidienA"
          v-model="selectedCustomer.daidienA"
          style="width: 50%"
        >
          <option value="">-- Chọn đại diện --</option>
          <option
            v-for="user in filteredDaiDienAUsers"
            :key="user.name"
            :value="user.name"
          >
            {{ user.name }}
          </option>
        </select>

        <label for="chucvuA" style="margin-left: 40px">Chức vụ:</label>
        <select
          id="chucvuA"
          v-model="selectedCustomer.chucvuA"
          style="margin-left: 20px; width: 20%; height: 33px"
        >
          <option value="">Chọn chức vụ</option>
          <option value="Giám đốc">Giám đốc</option>
          <option value="Phó giám đốc">Phó giám đốc</option>
        </select>
      </div>
    </div>

    <div class="row" style="margin-top: 10px">
      <div class="col-md-2" style="color: blue"><b>Kiểm soát:</b></div>
      <div class="col-md-10 checkbox-group">
        <select
          id="kiemsoat"
          v-model="selectedCustomer.kiemsoat"
          style="width: 50%"
        >
          <option value="">-- Chọn người kiểm soát --</option>
          <option
            v-for="user in filteredKiemSoatUsers"
            :key="user.name"
            :value="user.name"
          >
            {{ user.name }}
          </option>
        </select>
      </div>
    </div>

    <div class="row" style="margin-top: 10px">
      <div class="col-md-2" style="color: blue" for="GUQ">
        <b>Quyết định/GUQ:</b>
      </div>
      <!-- <label for="GUQ" style="margin-left: 20px;">Quyết định/GUQ:</label> -->
      <div class="col-md-10 checkbox-group">
        <input
          type="text"
          id="GUQ"
          v-model="selectedCustomer.GUQ"
          style="width: 70%"
        />
        <button
          type="submit"
          @click="saveAuthority"
          style="
            margin-left: 10px;
            background-color: #007bff;
            border: 1px solid #000;
            color: white;
            padding: 5px 10px;
            cursor: pointer;
            border-radius: 5px;
          "
        >
          Lưu giấy UQ
        </button>
      </div>
    </div>

    <hr />

    <div>
      <p>
        <b>Địa chỉ NH: {{ AddressBank }}</b>
      </p>
    </div>

    <hr />

    <div class="row">
      <div>
        <button
          style="
            margin-left: 10px;
            border-radius: 8px;
            background-color: red;
            color: white;
          "
          @click="deleteSelectedCustomers"
        >
          Xóa dữ liệu
        </button>
        <button
          style="
            margin-left: 60px;
            border-radius: 8px;
            background-color: green;
            color: white;
          "
          @click="createNew"
        >
          Tạo mới
        </button>
        <label
          for="wordFileSelect"
          style="margin-left: 60px; border-radius: 8px"
          ><b style="color: blue">Mẫu in:</b></label
        >
        <select
          id="wordFileSelect"
          style="margin-left: 10px; border: solid black 2px; border-radius: 5px"
        >
          <option v-if="wordFiles.length === 0" disabled>Đang tải...</option>
          <option v-for="file in wordFiles" :key="file" :value="file">
            {{ file }}
          </option>
        </select>
        <button
          style="
            margin-left: 20px;
            border-radius: 8px;
            background-color: greenyellow;
          "
          @click="generateWord"
        >
          In Mẫu Thẻ
        </button>

        <button
          @click="thongke"
          style="margin-left: 40px; border-radius: 8px; background-color: gold"
        >
          Thống Kê CN SD
        </button>

        <button
          style="
            margin-left: 40px;
            border-radius: 8px;
            background-color: gray;
            color: white;
          "
          @click="exitPage"
        >
          Thoát
        </button>
      </div>
    </div>
    <br /><br /><br />
  </div>
</template>
<script>
import * as XLSX from "xlsx";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { saveAs } from "file-saver";
import DatabaseService from "../services/database.service"; // Import service
import UsersService from "../services/users.service";
// import { get } from "../../../QuanLyThe/app/router/database.router";

export default {
  data() {
    return {
      cardTypes: {
        plusSuccess: false,
        success: false,
        vang: false,
        chuan: false,
      },
      // cardTypes: {
      //   plusSuccess: true,
      //   success: false,
      //   vang: true, // auto tick when plusSuccess
      //   chuan: false, // auto tick when success
      //   bachkim: false,
      //   kimcuong: false,
      // },
      ph: {
        phthuong: true,
        phnhanh: false,
        phlandau: true,
        phlai: false,
      },
      wordFiles: [],
      loggedInUser: null, // Thông tin người dùng đăng nhập
      branchMap: {
        // Mapping MaCN -> Tên Chi Nhánh
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
      AddressBank: {
        20: "01 Hàm Nghi - TPRG - Kiên Giang",
        24: "Huyện Kiên Lương - Kiên Giang",
        1: "234 Trần Phú, Rạch Giá, Kiên Giang",
        27: "Huyện Hòn Đất",
        28: "Huyện Kiên Hải",
        36: "Hà Tiên",
        37: "Tân Khánh Hòa - Giang Thành - Kiên Giang",
        40: "Ba Hòn",
        29: "Bình An - Kiên Lương - Kiên Giang",
        32: "Rạch Sỏi",
        42: "Mong Thọ - Rạch Sỏi",
        33: "Lô C11 Số 38-39 đường 3/2 - TPRG - Kiên Giang",
        2: "166 Nguyễn trung Trực - TPRG - Kiên Giang",
        34: "105 QL80 Ấp Hưng Giang - Xã Mỹ Lâm - Hòn Đất - Kiên Giang",
        45: "459A QL 80, KP Thành Công, TT.Sóc Sơn,H.Hòn Đất, T.Kiên Giang",
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
      ListNgayHethanHLCCCD: {
        318: "Cục cảnh sát quản lý Hành chính về TTXH",
        4: "Bộ Công An",
        352: "Cục CS ĐKQL cư trú và DLQG về dân cư",
      },
      // ListNgayHethanHLCCCD: {
      //   318: "Cục cảnh sát quản lý Hành chính về TTXH",
      //   4: "Bộ Công An",
      //   352: "Cục CS ĐKQL cư trú và DLQG về dân cư",
      // },

      fromDate: "",
      toDate: "",
      searchCriteria: "all",
      searchValue: "",
      customers: [],
      // customer: null,
      selectedCustomers: [],
      users: [], // Danh sách người dùng từ API
      selectedCustomer: {
        DVInternet: false,
        daidienA: "",
        chucvuA: "",
        kiemsoat: "",
        name: "", // Tên người dùng
        GUQ: "",
        giayquyquyen: "",
        ngaydk: this.formatToday(),
        noicap: "",
      }, // Khách hàng được chọn cuối cùng
      services: {
        dvTc: false, // DV tài chính
        dvTt: false, // DV thanh toán
        dvPtc: false, // DV phi tài chính
      },

      issueDate: "",
      expiryDate: "",
      searched: false,
      hinhThucNhanThe: "", // Giá trị lưu hình thức nhận thẻ
    };
  },
  watch: {
    selectedCustomers(newVal) {
      if (newVal.length > 0) {
        this.selectedCustomer = newVal[newVal.length - 1];
      } else {
        this.selectedCustomer = null;
      }
    },
    "selectedCustomer.daidienA": function (newValue) {
      const user = this.users.find((u) => u.name === newValue);
      if (user) {
        this.selectedCustomer.GUQ = user.authority || "";
        // this.selectedCustomer.chucvuA = user.function || "";
      } else {
        this.selectedCustomer.GUQ = "";
        // this.selectedCustomer.chucvuA = "";
      }
    },
  },
  computed: {
    branchName() {
      if (this.loggedInUser && this.loggedInUser.MaCN) {
        return (
          this.branchMap[this.loggedInUser.MaCN] || "Chi nhánh không xác định"
        );
      }
      return "Chi nhánh chưa đăng nhập";
    },
    AddressBank() {
      if (this.loggedInUser && this.loggedInUser.Madonvi) {
        return this.AddressBank[this.loggedInUser.Madonvi] || "NULL";
      }
      return "Chi nhánh chưa đăng nhập";
    },

    // ListNgayHethanHLCCCD(){
    //     if(this.selectedCustomer && this.selectedCustomer.NgayHethanHL) {
    //         return this.selectedCustomer.ListNgayHethanHLCCCD[this.selectedCustomer.NgayHethanHL] || "";
    //     }
    // },

    filteredDaiDienAUsers() {
      if (!this.loggedInUser) return [];
      return this.users.filter((user) => {
        return (
          user.Madonvi === this.loggedInUser.Madonvi &&
          ["Giám đốc", "Phó giám đốc"].includes(user.function)
        );
      });
    },

    // Lọc user cho select Kiểm soát
    filteredKiemSoatUsers() {
      return this.users.filter((user) => {
        return (
          user.function &&
          ["Trưởng phòng", "Phó phòng", "Phê duyệt"].includes(
            user.function.trim()
          ) &&
          user.Madonvi === this.loggedInUser.Madonvi
        );
      });
    },
  },
  methods: {
    // handleCardTypeChange() {
    //   this.cardTypes.vang = this.cardTypes.plusSuccess;
    //   this.cardTypes.chuan = this.cardTypes.success;
    // },
    handlePlusSuccessChange() {
      if (this.cardTypes.plusSuccess) {
        // ✅ Tick Plus Success → chọn vàng, bỏ success & chuẩn
        this.cardTypes.vang = true;
        this.cardTypes.success = false;
        this.cardTypes.chuan = false;
      } else {
        // ❌ Bỏ Plus Success → bỏ vàng, chọn success & chuẩn
        this.cardTypes.vang = false;
        this.cardTypes.success = true;
        this.cardTypes.chuan = true;
      }
    },

    handleSuccessChange() {
      if (this.cardTypes.success) {
        // ✅ Tick Success → chọn chuẩn, bỏ plus & vàng
        this.cardTypes.chuan = true;
        this.cardTypes.plusSuccess = false;
        this.cardTypes.vang = false;
      } else {
        // ❌ Bỏ Success → bỏ chuẩn, chọn plus & vàng
        this.cardTypes.chuan = false;
        this.cardTypes.plusSuccess = true;
        this.cardTypes.vang = true;
      }
    },

    handlePHLoaiChange(selected) {
      if (selected === "phthuong" && this.ph.phthuong) {
        this.ph.phnhanh = false;
      }
      if (selected === "phnhanh" && this.ph.phnhanh) {
        this.ph.phthuong = false;
      }
    },

    handlePHDotChange(selected) {
      if (selected === "phlandau" && this.ph.phlandau) {
        this.ph.phlai = false;
      }
      if (selected === "phlai" && this.ph.phlai) {
        this.ph.phlandau = false;
      }
    },
    formatToday() {
      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, "0");
      const dd = String(today.getDate()).padStart(2, "0");
      return `${yyyy}-${mm}-${dd}`;
    },
    async fetchUsers() {
      try {
        this.users = await UsersService.getAll();
      } catch (error) {
        console.error("Lỗi khi lấy danh sách người dùng:", error);
      }
    },
    checkAuthority(daidienA) {
      // Kiểm tra xem "Đại diện A" có trong danh sách user.name không
      const user = this.users.find((u) => u.name === daidienA);
      if (user) {
        this.selectedCustomer.GUQ = user.authority; // Nếu trùng, gán authority vào GUQ
      } else {
        this.selectedCustomer.GUQ = ""; // Nếu không trùng, để trống
      }
    },
    async saveAuthority() {
      console.log("🔍 selectedCustomer:", this.selectedCustomer.daidienA);
      console.log("🔍 selectedCustomer:", this.selectedCustomer.GUQ);

      if (!this.selectedCustomer.daidienA || !this.selectedCustomer.GUQ) {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
      }

      try {
        const authority = this.selectedCustomer.GUQ;
        const name = encodeURIComponent(this.selectedCustomer.daidienA); // Mã hóa tên để tránh lỗi URL
        const apiUrl = `http://localhost:3000/api/users/updateauthority/${name}`;
        // const apiUrl = `http://10.143.0.188:3000/api/users/updateauthority/${name}`;

        console.log("🔍 API URL:", apiUrl);
        console.log("📋 Dữ liệu gửi lên server:", { authority });

        const response = await fetch(apiUrl, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ authority }),
        });

        const result = await response.json();
        console.log("✅ Response từ server:", result);

        if (!response.ok) {
          throw new Error(result.message || "Cập nhật thất bại!");
        }

        alert("Lưu giấy ủy quyền thành công!");
      } catch (error) {
        console.error("🔥 Lỗi khi lưu giấy UQ:", error);
        alert("Lưu giấy UQ thất bại!");
      }
    },

    updateHinhThucNhanThe(value) {
      // Nếu đã chọn rồi thì bỏ chọn, nếu chưa chọn thì cập nhật giá trị
      this.hinhThucNhanThe = this.hinhThucNhanThe === value ? "" : value;
    },

    async fetchCustomers() {
      try {
        let allCustomers = await DatabaseService.getAll();
        this.searched = true;

        this.customers = allCustomers.filter((customer) => {
          let isValidDate = true;
          let isValidSearch = true;
          let isValidBranch = true;

          // 🔍 Kiểm tra quyền truy cập
          if (this.loggedInUser && this.loggedInUser.usage_rights !== "admin") {
            isValidBranch = customer.MaCN === this.loggedInUser.MaCN;
          }

          // 📅 Lọc theo ngày đăng ký (nếu có)
          if (this.fromDate && this.toDate) {
            let ngaydk = new Date(customer.ngaydk);
            let from = new Date(this.fromDate);
            let to = new Date(this.toDate);
            isValidDate = ngaydk >= from && ngaydk <= to;
          }

          // 🔍 Lọc theo tiêu chí tìm kiếm
          if (this.searchValue) {
            let searchValueLower = this.searchValue.toLowerCase();

            if (this.searchCriteria === "all") {
              // Nếu tìm kiếm "Tất cả", kiểm tra tất cả các trường
              isValidSearch = ["hoten", "cmnd", "MaKH"].some(
                (key) =>
                  customer[key] &&
                  String(customer[key]).toLowerCase().includes(searchValueLower)
              );
            } else {
              // Nếu tìm kiếm theo một tiêu chí cụ thể
              let fieldValue = customer[this.searchCriteria]
                ? String(customer[this.searchCriteria]).toLowerCase()
                : "";
              isValidSearch = fieldValue.includes(searchValueLower);
            }
          }

          // ✅ Trả về kết quả sau khi kiểm tra tất cả điều kiện
          return isValidBranch && isValidDate && isValidSearch;
        });
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu khách hàng:", error);
      }
    },

    fetchWordFiles() {
      fetch("http://10.143.0.189:3000/api/word-files")
        .then((response) => response.json())
        .then((files) => {
          this.wordFiles = files;
        })
        .catch((error) => console.error("Lỗi tải danh sách file:", error));
    },

    getLoggedInUser() {
      const userData = localStorage.getItem("user");
      if (userData) {
        this.loggedInUser = JSON.parse(userData);
        console.log("Người dùng đăng nhập:", this.loggedInUser);
      }
    },

    handleFileUpload(event) {
      const ListNgayHethanHLCCCD = {
        318: "Cục cảnh sát quản lý Hành chính về TTXH",
        "004": "Bộ Công An",
        352: "Cục CS ĐKQL cư trú và DLQG về dân cư",
      };

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

          console.log("📂 Dữ liệu từ file IPCAS:", firstRow);

          // Lấy mã nơi cấp từ issueby1 và ánh xạ sang tên
          const issuebyCode = parseInt(firstRow["issueby1"]);
          const noicapMapped =
            ListNgayHethanHLCCCD[issuebyCode] || firstRow["Noicap"] || "";

          const currentNgaydk =
            this.selectedCustomer.ngaydk ||
            new Date().toISOString().substring(0, 10);

          // Ghi đè dữ liệu từ file Excel vào selectedCustomer
          this.selectedCustomer = {
            hoten: firstRow["nmloc"] || "",
            hotenenglish: firstRow["nm"] || "",
            cmnd: firstRow["regno"] || "",
            quoctich: firstRow["Quoctich"] || "Việt Nam",
            dienthoai: firstRow["dienthoai"] || "",
            diachitt: firstRow["addr1"] || "",

            tentattv: firstRow["shrtnmloc"] || "",
            tentatta: firstRow["shrtnm"] || "",
            ngaycap: this.formatDate(firstRow["issuedt1"]) || "",
            Dantoc: firstRow["Dantoc"] || "Kinh",
            dtdd: firstRow["dd"] || "",
            dienthoai: firstRow["name_4"] || "",

            ngaysinh: this.formatDate(firstRow["name_1"]) || "",
            tongiao: firstRow["tongiao"] || "Không",
            noicap: noicapMapped,
            sofax: firstRow["soFax"] || "",
            dcemail: firstRow["email"] || "",
            dcnharieng: firstRow["dclh"] || "",

            noisinh: firstRow["noisinh"] || "",
            gioitinh: firstRow["name_3"] || "",
            taikhoan: firstRow["account"] || "",
            MaKH: firstRow["custno"] || "",

            // ✅ Gán lại ngày đăng ký sau khi merge
            ngaydk: currentNgaydk,
          };

          console.log(
            "✅ Dữ liệu cập nhật vào selectedCustomer:",
            this.selectedCustomer
          );
        } else {
          alert("Không có dữ liệu trong file hoặc file không đúng định dạng!");
        }
      };

      reader.readAsArrayBuffer(file);
    },

    fillForm(data) {
      const fields = [
        "custno",
        "nm",
        "shrtnm",
        "nicknm",
        "nmloc",
        "shrtnmloc",
        "custtpcd",
        "custdtltpcd",
        "name_2",
        "name_1",
        "name_3",
        "name_4",
        "regno",
        "addrtpcd",
        "addr1",
        "addr2",
        "addr1loc",
        "addr2loc",
        "stscd",
        "issueby1",
        "issuedt1",
        "province",
        "district",
        "commune_ward",
        "usridop1",
        "ctrycdnatl",
      ];

      fields.forEach((field) => {
        if (document.getElementById(field)) {
          document.getElementById(field).value = data[field] || "";
        }
      });

      if (document.getElementById("issuedt1")) {
        document.getElementById("issuedt1").value = this.formatDate(
          data["issuedt1"]
        );
      }
    },

    formatDate(yyyymmdd) {
      if (!yyyymmdd || yyyymmdd.length !== 8) return yyyymmdd;
      return `${yyyymmdd.substring(6, 8)}/${yyyymmdd.substring(
        4,
        6
      )}/${yyyymmdd.substring(0, 4)}`;
    },

    formatDateDDMMYYYY(dateStr) {
      if (!dateStr) return null;
      const date = new Date(dateStr);
      const dd = String(date.getDate()).padStart(2, "0");
      const mm = String(date.getMonth() + 1).padStart(2, "0");
      const yyyy = date.getFullYear();
      return `${dd}/${mm}/${yyyy}`; // Trả về định dạng ddmmyyyy
    },

    updateResident() {
      const selectedResident =
        document.querySelector('input[name="resident"]:checked')?.value ||
        "Không xác định";
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
        const response = await fetch(
          `http://10.143.0.189:3000/api/download-word?fileName=${selectedFile}`
        );
        const content = await response.arrayBuffer();
        const zip = new PizZip(content);
        // const doc = new Docxtemplater(zip, { paragraphLoop: true, linebreaks: true });
        const doc = new Docxtemplater(zip, {
          paragraphLoop: true,
          linebreaks: true,
          parser(tag) {
            const [key, ...filters] = tag.split("|").map((s) => s.trim());
            return {
              get(scope) {
                let value = scope[key];
                for (const filter of filters) {
                  if (filter === "upper") {
                    value =
                      typeof value === "string" ? value.toUpperCase() : value;
                  }
                }
                return value;
              },
            };
          },
        });

        // 2️⃣ Lấy thông tin từ người dùng đăng nhập
        const user = this.loggedInUser;
        if (!user) {
          alert("Không tìm thấy thông tin người dùng. Vui lòng đăng nhập lại!");
          return;
        }

        // 🆕 Lấy giá trị loại tiền từ radio button
        const currencyRadio = document.querySelector(
          'input[name="currency"]:checked'
        );
        let loaitien = currencyRadio ? currencyRadio.value : "VND"; // Mặc định là "VND"

        // Nếu chọn "Khác", lấy giá trị từ ô nhập liệu
        if (loaitien === "other") {
          const otherCurrencyInput = document
            .getElementById("currency-other-input")
            .value.trim();
          loaitien = otherCurrencyInput || "Khác";
        }

        // Kiểm tra user.Madonvi và gán giá trị tương ứng
        let diachiCN = "";
        let dtnghenghiep = "";
        let sofaxNH = "";

        if (user.Madonvi === 20) {
          diachiCN = "01 Hàm Nghi - TPRG - Kiên Giang";
          dtnghenghiep = "0297.863738";
          sofaxNH = "0297.387366";
        } else if (user.Madonvi === 24) {
          diachiCN = "Huyện Kiên Lương - Kiên Giang";
          dtnghenghiep = "0297.853016";
          sofaxNH = "0297.385312";
        } else if (user.Madonvi === 1) {
          diachiCN = "234 Trần Phú, Rạch Giá, Kiên Giang";
          dtnghenghiep = "0297.875243";
          sofaxNH = "0297.3863158";
        } else if (user.Madonvi === 27) {
          diachiCN = "Huyện Hòn Đất";
          dtnghenghiep = "0297.841017";
          sofaxNH = "0297.3841553";
        } else if (user.Madonvi === 28) {
          diachiCN = "Huyện Kiên Hải";
          dtnghenghiep = "0297.830008";
          sofaxNH = "0297.3830135";
        } else if (user.Madonvi === 36) {
          diachiCN = "Hà Tiên";
          dtnghenghiep = "0297.851888";
          sofaxNH = "0297.3950995";
        }
        //
        else if (user.Madonvi === 37) {
          diachiCN = "Tân Khánh Hòa - Giang Thành - Kiên Giang";
          dtnghenghiep = "0297.851888";
          sofaxNH = "";
        } else if (user.Madonvi === 40) {
          diachiCN = "Ba Hòn";
          dtnghenghiep = "0297.751177";
          sofaxNH = "0297.3751188";
        }
        //
        else if (user.Madonvi === 29) {
          diachiCN = "Bình An - Kiên Lương - Kiên Giang";
          dtnghenghiep = "0297.751177";
          sofaxNH = "";
        } else if (user.Madonvi === 32) {
          diachiCN = "Rạch Sỏi";
          dtnghenghiep = "0297.864063";
          sofaxNH = "0297.3917898";
        } else if (user.Madonvi === 42) {
          diachiCN = "Mong Thọ - Rạch Sỏi";
          dtnghenghiep = "0297.625256";
          sofaxNH = "0297.3625256";
        } else if (user.Madonvi === 33) {
          diachiCN = "Lô C11 Số 38-39 đường 3/2 - TPRG - Kiên Giang";
          dtnghenghiep = "0297.876155";
          sofaxNH = "0297.3923385";
        } else if (user.Madonvi === 2) {
          diachiCN = "166 Nguyễn trung Trực - TPRG - Kiên Giang";
          dtnghenghiep = "0297.863136";
          sofaxNH = "0297.3863136";
        } else if (user.Madonvi === 34) {
          diachiCN =
            "105 QL80 Ấp Hưng Giang - Xã Mỹ Lâm - Hòn Đất - Kiên Giang";
          dtnghenghiep = "0297.890228";
          sofaxNH = "0297.3891654";
        } else if (user.Madonvi === 45) {
          diachiCN = "44 KP. Thị Tứ , TT.Sóc Sơn,H.Hòn Đất, T.Kiên Giang";
          dtnghenghiep = "0297.742154";
          sofaxNH = "0297.3742155";
        }

        // 2️⃣ Lấy ngày tháng năm hiện tại
        const today = new Date();
        const ddk = today.getDate().toString().padStart(2, "0"); // Lấy ngày, đảm bảo 2 chữ số
        const mdk = (today.getMonth() + 1).toString().padStart(2, "0"); // Lấy tháng (tháng bắt đầu từ 0)
        const ydk = today.getFullYear().toString(); // Lấy năm

        // 3️⃣ Chuẩn bị dữ liệu
        const getValueOrNull = (id) => {
          const element = document.getElementById(id);
          return element?.value?.trim() || "";
        };

        // Hàm lấy giá trị của checkbox
        const getCheckboxValue = (id) =>
          document.getElementById(id)?.checked || false;

        // Sau khi khai báo các checkbox:
        let loaithe = null;
        if (getCheckboxValue("theplussuccess")) {
          loaithe = "Plus Success";
        } else if (getCheckboxValue("thesuccess")) {
          loaithe = "Success";
        } else {
          loaithe = "";
        }

        let hangthe = null;
        if (getCheckboxValue("thechuan")) {
          hangthe = "Hạng Chuẩn";
        } else if (getCheckboxValue("thevang")) {
          hangthe = "Hạng Vàng";
        } else if (getCheckboxValue("thebachkim")) {
          hangthe = "Hạng Bạch Kim";
        } else if (getCheckboxValue("thekimcuong")) {
          hangthe = "Hạng Kim Cương";
        } else {
          hangthe = "";
        }

        const daidienA = document.getElementById("daidienA")?.value?.trim();
        let giayuyquyen = "";
        if (daidienA) {
          const matchedUser = this.users.find((u) => u.name === daidienA);
          giayuyquyen = matchedUser?.authority || " ";
        }

        const data = {
          Madonvi: user.Madonvi,
          MaCN: user.MaCN,
          tenCN: this.madonviList[user.MaCN] || "Chi nhánh không xác định",
          ngaydk: this.formatDateDDMMYYYY(getValueOrNull("ngaydk")),
          MaKH: getValueOrNull("custno"),
          hoten: getValueOrNull("nmloc"),
          hotenenglish: getValueOrNull("nm"),
          // tenta: getValueOrNull("tenta"),
          tentattv: getValueOrNull("shrtnmloc"),
          tentatta: getValueOrNull("shrtnm"),
          ngaysinh: this.formatDate(getValueOrNull("name_1")),
          noisinh: getValueOrNull("noisinh"),
          gioitinh: getValueOrNull("name_3"),
          quoctich: getValueOrNull("Quoctich"),
          Dantoc: getValueOrNull("Dantoc"),
          tongiao: getValueOrNull("tongiao"),
          cmnd: getValueOrNull("regno"),
          ngaycap: this.formatDate(getValueOrNull("issuedt1")),
          noicap: getValueOrNull("Noicap"),
          NgayHethanHL: this.formatDateDDMMYYYY(getValueOrNull("NgayHethanHL")),
          cutru: this.updateResident() || null,
          diachitt: getValueOrNull("addr1"),
          dcnharieng: getValueOrNull("dclh"),
          dienthoai: getValueOrNull("name_4"),
          dtdd: getValueOrNull("dd"),
          sofax: getValueOrNull("soFax"),
          dcemail: getValueOrNull("email"),
          motaikhoan: getCheckboxValue("motaikhoan"),
          taikhoan: getValueOrNull("account"),
          daidienA: getValueOrNull("daidienA"),
          chucvuA: getValueOrNull("chucvuA"),
          kiemsoat: getValueOrNull("kiemsoat"),
          TenGDV: user.name,
          MaGDvien: user.user,
          giayuyquyen: giayuyquyen,
          ngayphathanh: getValueOrNull("ngayphathanh"),
          ngaydenhan: getValueOrNull("ngaydenhan"),
          noiky: "Kiên Giang",
          ddk: ddk, // Ngày
          mdk: mdk, // Tháng
          ydk: ydk, // Năm
          ngayhd: ddk, // Ngày hiện tại
          thanghd: mdk, // Tháng hiện tại
          namhd: ydk, // Năm hiện tại
          // tentrenthe:
          loaithe: loaithe,
          DKPHTheGNnoidia: getCheckboxValue("DKPHTheGNnoidia"),
          thevisaDebit: getCheckboxValue("thevisaDebit"),
          thelapnghiep: getCheckboxValue("thelapnghiep"),
          themaster: getCheckboxValue("themaster"),
          thelkthuonghieu: getCheckboxValue("thelkthuonghieu"),
          thejcb: getCheckboxValue("thejcb"),
          thekhac: getCheckboxValue("thekhac"),
          hangthe: hangthe,
          theplussuccess: getCheckboxValue("theplussuccess"), //
          thesuccess: getCheckboxValue("thesuccess"),
          thechuan: getCheckboxValue("thechuan"),
          thevang: getCheckboxValue("thevang"),
          thebachkim: getCheckboxValue("thebachkim"),
          thekimcuong: getCheckboxValue("thekimcuong"), //
          thePHthuong: getCheckboxValue("thePHthuong"),
          thePHnhanh: getCheckboxValue("thePHnhanh"),
          AgribankPlus: getCheckboxValue("AgribankPlus"), //
          sdtAP: getValueOrNull("sdtAP"), //
          Ecommerce: getCheckboxValue("Ecommerce"), //
          LKvidientu: getCheckboxValue("LKvidientu"), //
          DKSMSbanking: getCheckboxValue("DKSMSbanking"),
          BANKPLUS: getCheckboxValue("BANKPLUS"),
          diachiCN: diachiCN, // Địa chỉ chi nhánh theo Madonvi
          dtnghenghiep: dtnghenghiep, // Điện thoại ngành nghiệp theo Madonvi
          sofaxNH: sofaxNH,
          dangkyDV: getCheckboxValue("dangkyDV"),
          loaitien: loaitien,
          abic: getCheckboxValue("abic"),
          hinhthucnhanthe: this.hinhThucNhanThe, // Lưu hình thức nhận thẻ
          NTtainganhang: getCheckboxValue("NTtainganhang"),
          NTquabuudien: getCheckboxValue("NTquabuudien"),
          PHlandau: getCheckboxValue("PHlandau"),
          PHlai: getCheckboxValue("PHlai"),
        };

        // Trước khi điền dữ liệu vào file Word
        data.µ = data.AgribankPlus ? "x" : ""; // {µ}
        data.ę = data.Ecommerce ? "x" : ""; // {ę}
        data.ǿ = data.DKSMSbanking ? "x" : ""; // {ǿ}
        data.b = data.BANKPLUS ? "x" : ""; // {b}
        data.k = data.LKvidientu ? "x" : ""; // {k}

        data.ɚ = data.DKPHTheGNnoidia ? "x" : ""; //{ɚ}
        data.l = data.thelapnghiep ? "x" : ""; // {l}
        data.v = data.thevisaDebit ? "x" : ""; // {v}
        data.ç = data.themaster ? "x" : ""; // {ç}
        data.ɝ = data.thelkthuonghieu ? "x" : ""; // {ɝ}
        data.ᾆ = data.thejcb ? "x" : ""; // {ᾆ}

        data.ŝ = data.thechuan ? "x" : ""; // {ŝ}
        data.ǘ = data.thevang ? "x" : ""; // {ǘ}

        data.ǻ = data.thePHthuong ? "x" : ""; // {ǻ}
        data.ǽ = data.thePHnhanh ? "x" : ""; // {ǽ}

        data.n = data.NTtainganhang ? "x" : ""; // {n}
        data.d = data.NTquabuudien ? "x" : ""; // {b}

        data.x = data.PHlandau ? "x" : ""; // {x}
        data.y = data.PHlai ? "x" : ""; // {y}
        // ✅ Xử lý tên trên thẻ
        const removeVietnameseTones = (str) => {
          return str
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/đ/g, "d")
            .replace(/Đ/g, "D");
        };

        const processedHoten = removeVietnameseTones(data.hoten || "")
          .toUpperCase()
          .replace(/\s+/g, "");

        for (let i = 0; i < 20; i++) {
          data[`c${i}`] = processedHoten[i] || "";
        }

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
        window.location.reload();
      } catch (error) {
        console.error("Lỗi khi tạo file hoặc lưu dữ liệu:", error);
        alert("Có lỗi xảy ra, vui lòng thử lại!");
      }
    },

    //
    async createNew() {
      const selectedFile = document.getElementById("wordFileSelect").value;
      if (!selectedFile) {
        alert("Vui lòng chọn file Word mẫu!");
        return;
      }

      try {
        // 2️⃣ Lấy thông tin từ người dùng đăng nhập
        const user = this.loggedInUser;
        if (!user) {
          alert("Không tìm thấy thông tin người dùng. Vui lòng đăng nhập lại!");
          return;
        }

        // 🆕 Lấy giá trị loại tiền từ radio button
        const currencyRadio = document.querySelector(
          'input[name="currency"]:checked'
        );
        let loaitien = currencyRadio ? currencyRadio.value : "VND"; // Mặc định là "VND"

        // Nếu chọn "Khác", lấy giá trị từ ô nhập liệu
        if (loaitien === "other") {
          const otherCurrencyInput = document
            .getElementById("currency-other-input")
            .value.trim();
          loaitien = otherCurrencyInput || "Khác";
        }

        // Kiểm tra user.Madonvi và gán giá trị tương ứng
        let diachiCN = "";
        let dtnghenghiep = "";
        let sofaxNH = "";

        if (user.Madonvi === 20) {
          diachiCN = "01 Hàm Nghi - TPRG - Kiên Giang";
          dtnghenghiep = "0297.863738";
          sofaxNH = "0297.387366";
        } else if (user.Madonvi === 24) {
          diachiCN = "Huyện Kiên Lương - Kiên Giang";
          dtnghenghiep = "0297.853016";
          sofaxNH = "0297.385312";
        } else if (user.Madonvi === 1) {
          diachiCN = "234 Trần Phú, Rạch Giá, Kiên Giang";
          dtnghenghiep = "0297.875243";
          sofaxNH = "0297.3863158";
        } else if (user.Madonvi === 27) {
          diachiCN = "Huyện Hòn Đất";
          dtnghenghiep = "0297.841017";
          sofaxNH = "0297.3841553";
        } else if (user.Madonvi === 28) {
          diachiCN = "Huyện Kiên Hải";
          dtnghenghiep = "0297.830008";
          sofaxNH = "0297.3830135";
        } else if (user.Madonvi === 36) {
          diachiCN = "Hà Tiên";
          dtnghenghiep = "0297.851888";
          sofaxNH = "0297.3950995";
        }
        //
        else if (user.Madonvi === 37) {
          diachiCN = "Tân Khánh Hòa - Giang Thành - Kiên Giang";
          dtnghenghiep = "0297.851888";
          sofaxNH = "";
        } else if (user.Madonvi === 40) {
          diachiCN = "Ba Hòn";
          dtnghenghiep = "0297.751177";
          sofaxNH = "0297.3751188";
        }
        //
        else if (user.Madonvi === 29) {
          diachiCN = "Bình An - Kiên Lương - Kiên Giang";
          dtnghenghiep = "0297.751177";
          sofaxNH = "";
        } else if (user.Madonvi === 32) {
          diachiCN = "Rạch Sỏi";
          dtnghenghiep = "0297.864063";
          sofaxNH = "0297.3917898";
        } else if (user.Madonvi === 42) {
          diachiCN = "Mong Thọ - Rạch Sỏi";
          dtnghenghiep = "0297.625256";
          sofaxNH = "0297.3625256";
        } else if (user.Madonvi === 33) {
          diachiCN = "Lô C11 Số 38-39 đường 3/2 - TPRG - Kiên Giang";
          dtnghenghiep = "0297.876155";
          sofaxNH = "0297.3923385";
        } else if (user.Madonvi === 2) {
          diachiCN = "166 Nguyễn trung Trực - TPRG - Kiên Giang";
          dtnghenghiep = "0297.863136";
          sofaxNH = "0297.3863136";
        } else if (user.Madonvi === 34) {
          diachiCN =
            "105 QL80 Ấp Hưng Giang - Xã Mỹ Lâm - Hòn Đất - Kiên Giang";
          dtnghenghiep = "0297.890228";
          sofaxNH = "0297.3891654";
        } else if (user.Madonvi === 45) {
          diachiCN = "44 KP. Thị Tứ , TT.Sóc Sơn,H.Hòn Đất, T.Kiên Giang";
          dtnghenghiep = "0297.742154";
          sofaxNH = "0297.3742155";
        }

        // 2️⃣ Lấy ngày tháng năm hiện tại
        const today = new Date();
        const ddk = today.getDate().toString().padStart(2, "0"); // Lấy ngày, đảm bảo 2 chữ số
        const mdk = (today.getMonth() + 1).toString().padStart(2, "0"); // Lấy tháng (tháng bắt đầu từ 0)
        const ydk = today.getFullYear().toString(); // Lấy năm

        // 3️⃣ Chuẩn bị dữ liệu
        const getValueOrNull = (id) => {
          const element = document.getElementById(id);
          return element?.value?.trim() || "";
        };

        // Hàm lấy giá trị của checkbox
        const getCheckboxValue = (id) =>
          document.getElementById(id)?.checked || false;

        // Sau khi khai báo các checkbox:
        let loaithe = null;
        if (getCheckboxValue("theplussuccess")) {
          loaithe = "Plus Success";
        } else if (getCheckboxValue("thesuccess")) {
          loaithe = "Success";
        } else {
          loaithe = "";
        }

        let hangthe = null;
        if (getCheckboxValue("thechuan")) {
          hangthe = "Hạng Chuẩn";
        } else if (getCheckboxValue("thevang")) {
          hangthe = "Hạng Vàng";
        } else if (getCheckboxValue("thebachkim")) {
          hangthe = "Hạng Bạch Kim";
        } else if (getCheckboxValue("thekimcuong")) {
          hangthe = "Hạng Kim Cương";
        } else {
          hangthe = "";
        }

        const daidienA = document.getElementById("daidienA")?.value?.trim();
        let giayuyquyen = "";
        if (daidienA) {
          const matchedUser = this.users.find((u) => u.name === daidienA);
          giayuyquyen = matchedUser?.authority || " ";
        }

        const data = {
          Madonvi: user.Madonvi,
          MaCN: user.MaCN,
          tenCN: this.madonviList[user.MaCN] || "Chi nhánh không xác định",
          ngaydk: this.formatDateDDMMYYYY(getValueOrNull("ngaydk")),
          MaKH: getValueOrNull("custno"),
          hoten: getValueOrNull("nmloc"),
          hotenenglish: getValueOrNull("nm"),
          // tenta: getValueOrNull("tenta"),
          tentattv: getValueOrNull("shrtnmloc"),
          tentatta: getValueOrNull("shrtnm"),
          ngaysinh: this.formatDateDDMMYYYY(getValueOrNull("name_1")),
          noisinh: getValueOrNull("noisinh"),
          gioitinh: getValueOrNull("name_3"),
          quoctich: getValueOrNull("Quoctich"),
          Dantoc: getValueOrNull("Dantoc"),
          tongiao: getValueOrNull("tongiao"),
          cmnd: getValueOrNull("regno"),
          ngaycap: this.formatDate(getValueOrNull("issuedt1")),
          noicap: getValueOrNull("Noicap"),
          NgayHethanHL: getValueOrNull("NgayHethanHL"),
          cutru: this.updateResident() || null,
          diachitt: getValueOrNull("addr1"),
          dcnharieng: getValueOrNull("dclh"),
          dienthoai: getValueOrNull("name_4"),
          dtdd: getValueOrNull("dd"),
          sofax: getValueOrNull("soFax"),
          dcemail: getValueOrNull("email"),
          motaikhoan: getCheckboxValue("motaikhoan"),
          taikhoan: getValueOrNull("account"),
          daidienA: getValueOrNull("daidienA"),
          chucvuA: getValueOrNull("chucvuA"),
          kiemsoat: getValueOrNull("kiemsoat"),
          TenGDV: user.name,
          MaGDvien: user.user,
          giayuyquyen: giayuyquyen,
          ngayphathanh: getValueOrNull("ngayphathanh"),
          ngaydenhan: getValueOrNull("ngaydenhan"),
          noiky: "Kiên Giang",
          ddk: ddk, // Ngày
          mdk: mdk, // Tháng
          ydk: ydk, // Năm
          ngayhd: ddk, // Ngày hiện tại
          thanghd: mdk, // Tháng hiện tại
          namhd: ydk, // Năm hiện tại
          // tentrenthe:
          loaithe: loaithe,
          DKPHTheGNnoidia: getCheckboxValue("DKPHTheGNnoidia"),
          thevisaDebit: getCheckboxValue("thevisaDebit"),
          thelapnghiep: getCheckboxValue("thelapnghiep"),
          themaster: getCheckboxValue("themaster"),
          thelkthuonghieu: getCheckboxValue("thelkthuonghieu"),
          thejcb: getCheckboxValue("thejcb"),
          thekhac: getCheckboxValue("thekhac"),
          hangthe: hangthe,
          theplussuccess: getCheckboxValue("theplussuccess"), //
          thesuccess: getCheckboxValue("thesuccess"),
          thechuan: getCheckboxValue("thechuan"),
          thevang: getCheckboxValue("thevang"),
          thebachkim: getCheckboxValue("thebachkim"),
          thekimcuong: getCheckboxValue("thekimcuong"), //
          thePHthuong: getCheckboxValue("thePHthuong"),
          thePHnhanh: getCheckboxValue("thePHnhanh"),
          AgribankPlus: getCheckboxValue("AgribankPlus"), //
          sdtAP: getValueOrNull("sdtAP"), //
          Ecommerce: getCheckboxValue("Ecommerce"), //
          LKvidientu: getCheckboxValue("LKvidientu"), //
          DKSMSbanking: getCheckboxValue("DKSMSbanking"),
          BANKPLUS: getCheckboxValue("BANKPLUS"),
          diachiCN: diachiCN, // Địa chỉ chi nhánh theo Madonvi
          dtnghenghiep: dtnghenghiep, // Điện thoại ngành nghiệp theo Madonvi
          sofaxNH: sofaxNH,
          dangkyDV: getCheckboxValue("dangkyDV"),
          loaitien: loaitien,
          abic: getCheckboxValue("abic"),
          hinhthucnhanthe: this.hinhThucNhanThe, // Lưu hình thức nhận thẻ
          NTtainganhang: getCheckboxValue("NTtainganhang"),
          NTquabuudien: getCheckboxValue("NTquabuudien"),
          PHlandau: getCheckboxValue("PHlandau"),
          PHlai: getCheckboxValue("PHlai"),
        };

        // 6️⃣ Gửi dữ liệu lên database
        const savedData = await DatabaseService.create(data);
        console.log("Dữ liệu đã lưu:", savedData);
        alert("Dữ liệu đã được lưu thành công!");
        window.location.reload();
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

    async deleteSelectedCustomers() {
      if (this.selectedCustomers.length === 0) {
        alert("Vui lòng chọn ít nhất một khách hàng để xóa!");
        return;
      }

      if (!confirm("Bạn có chắc chắn muốn xóa các khách hàng đã chọn không?")) {
        return;
      }

      try {
        // Gửi yêu cầu xóa từng khách hàng được chọn
        for (const customer of this.selectedCustomers) {
          await DatabaseService.delete(customer._id);
        }

        // Lọc lại danh sách để cập nhật giao diện
        this.customers = this.customers.filter(
          (customer) => !this.selectedCustomers.includes(customer)
        );

        // Reset danh sách khách hàng đã chọn
        this.selectedCustomers = [];

        alert("Xóa thành công!");

        // Load lại trang để cập nhật danh sách khách hàng
        window.location.reload();
      } catch (error) {
        console.error("Lỗi khi xóa:", error);
        alert("Xóa thất bại! Vui lòng thử lại.");
      }
    },
  },
  mounted() {
    this.fetchWordFiles();
    this.getLoggedInUser();
    // Lấy danh sách người dùng khi component được mount
    this.fetchUsers();
  },
};
</script>
<style>
.fullscreen {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 56px;
  left: 0;
  background-color: aliceblue; /* hoặc bất kỳ màu nền nào bạn muốn */
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
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #ddd;
  position: relative;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th {
  background: #f4f4f4;
  position: sticky;
  top: 0;
  z-index: 2;
  padding: 8px;
  border: 1px solid #ccc;
}

td {
  padding: 8px;
  border: 1px solid #ccc;
  text-align: left;
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
