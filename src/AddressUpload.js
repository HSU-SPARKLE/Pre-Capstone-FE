import React from 'react';

const AddressUpload = () => {
  return (
    <div className="main-content">
      <h2>주소록 파일 업로드</h2>
      <ul>
        <li>주소록 파일 형식은 .csv와 .xlsx만 가능합니다.</li>
        <li>전화번호 컬럼 이름은 "휴대폰"으로 입력시에만 가능합니다.</li>
        <li>전화번호 형식은 '010-1234-0589' 형식을 지켜주세요.</li>
      </ul>
      <button className="file-upload-btn">내 주소록 불러오기 📂</button>
    </div>
  );
};

export default AddressUpload;
