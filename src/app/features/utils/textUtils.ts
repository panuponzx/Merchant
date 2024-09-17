import { CustomerModel, ILogModel } from 'src/app/core/interfaces';

export function getOptionsText(value: string) {
  switch (value) {
    case 'CUSTOMER:CREATE':
      return 'ลงทะเบียนผู้ใช้';
    case 'WALLET:CREATE':
      return 'ลงทะเบียนวอเลต';
    case 'WALLET:UPDATE':
      return 'แก้ไขวอเลต';
    case 'OBU:CREATE':
      return 'ลงทะเบียนOBU';
    case 'OBU:UPDATE':
      return 'แก้ไขOBU';
    case 'OBU:REPLACE':
      return 'เปลื่ยนOBU';
    case 'OBU:SUSPEND':
      return 'อายัดOBU';
    case 'OBU:ACTIVATE':
      return 'ถอนอายัดOBU';
    default:
      return value;
  }
}
export function handleActionDetail(action: string, row: ILogModel) {
  var value = JSON.parse(row.detail.value);
  if (action === 'CUSTOMER:CREATE') {
    return (
      `ลงทะเบียนผู้ใช้\n` +
      `ชื่อลูกค้า: ${row.CustomerName || ''}\n` +
      `${value.requestParam.remark
        ? 'หมายเหตุ:' + value.requestParam.remark + ''
        : ''
      }`
    );
  }

  if (action === 'WALLET:CREATE') {
    return (
      `ลงทะเบียน Wallet\n` +
      `${value.wallet.walletName
        ? 'ชื่อ Wallet: ' + value.wallet.walletName + '\n'
        : ''
      }` +
      `${value.customer.id ? 'รหัสลูกค้า:' + value.customer.id + '\n' : ''}` +
      `${value.requestParam.role
        ? 'บทบาท: ' + value.requestParam.role + '\n'
        : ''
      }` +
      `${value.requestParam.email
        ? 'Email: ' + value.requestParam.email + '\n'
        : ''
      }` +
      `${value.requestParam.taxId
        ? 'Tax ID: ' + value.requestParam.taxId + '\n'
        : ''
      }` +
      `${value.requestParam.title
        ? 'หัวข้อ: ' + value.requestParam.title + '\n'
        : ''
      }` +
      `${value.requestParam.token
        ? 'Token: ' + value.requestParam.token + '\n'
        : ''
      }` +
      `${value.requestParam.gender
        ? 'เพศ: ' + value.requestParam.gender + '\n'
        : ''
      }` +
      `${value.requestParam.status
        ? 'สถานะ: ' + value.requestParam.status + '\n'
        : ''
      }` +
      `${value.requestParam.branchId
        ? 'รหัสสาขา: ' + value.requestParam.branchId + '\n'
        : ''
      }` +
      `${value.requestParam.lastName
        ? 'นามสกุล: ' + value.requestParam.lastName + '\n'
        : ''
      }` +
      `${value.requestParam.pictures
        ? 'รูปภาพ: ' + value.requestParam.pictures + '\n'
        : ''
      }` +
      `${value.requestParam.titleEng
        ? 'Title (Eng): ' + value.requestParam.titleEng + '\n'
        : ''
      }` +
      `${value.requestParam.birthdate
        ? 'วันเกิด: ' + value.requestParam.birthdate + '\n'
        : ''
      }` +
      `${value.requestParam.citizenId
        ? 'บัตรประจำตัวประชาชน: ' + value.requestParam.citizenId + '\n'
        : ''
      }` +
      `${value.requestParam.createdBy
        ? 'สร้างโดย: ' + value.requestParam.createdBy + '\n'
        : ''
      }` +
      `${value.requestParam.firstName
        ? 'ชื่อจริง: ' + value.requestParam.firstName + '\n'
        : ''
      }` +
      `${value.requestParam.createDate
        ? 'วันที่สร้าง: ' + value.requestParam.createDate + '\n'
        : ''
      }` +
      `${value.requestParam.occupation
        ? 'อาชีพ: ' + value.requestParam.occupation + '\n'
        : ''
      }` +
      `${value.requestParam.updateDate
        ? 'วันที่อัปเดต: ' + value.requestParam.updateDate + '\n'
        : ''
      }` +
      `${value.requestParam.cardExpDate
        ? 'วันที่หมดอายุของบัตร: ' + value.requestParam.cardExpDate + '\n'
        : ''
      }` +
      `${value.requestParam.lastNameEng
        ? 'Last Name (Eng): ' + value.requestParam.lastNameEng + '\n'
        : ''
      }` +
      `${value.requestParam.mobilePhone
        ? 'โทรศัพท์มือถือ: ' + value.requestParam.mobilePhone + '\n'
        : ''
      }` +
      `${value.requestParam.branchTypeId
        ? 'Branch Type ID: ' + value.requestParam.branchTypeId + '\n'
        : ''
      }` +
      `${value.requestParam.citizenDocId
        ? 'เอกสารแสดงตัวประชาชน: ' + value.requestParam.citizenDocId + '\n'
        : ''
      }` +
      `${value.requestParam.customerEtax
        ? 'ลูกค้า ETAX: ' + value.requestParam.customerEtax + '\n'
        : ''
      }` +
      `${value.requestParam.firstNameEng
        ? 'First Name (Eng): ' + value.requestParam.firstNameEng + '\n'
        : ''
      }` +
      `${value.requestParam.isEtaxActive
        ? 'ETAX Active: ' + value.requestParam.isEtaxActive + '\n'
        : ''
      }` +
      `${value.requestParam.corporateName
        ? 'ชื่อองค์กร: ' + value.requestParam.corporateName + '\n'
        : ''
      }` +
      `${value.requestParam.corporatePhone
        ? 'โทรศัพท์องค์กร: ' + value.requestParam.corporatePhone + '\n'
        : ''
      }` +
      `${value.requestParam.customerTypeId
        ? 'รหัสประเภทลูกค้า: ' + value.requestParam.customerTypeId + '\n'
        : ''
      }` +
      `${value.requestParam.corporateBranch
        ? 'สาขาองค์กร: ' + value.requestParam.corporateBranch + '\n'
        : ''
      }` +
      `${value.requestParam.customerTypeName
        ? 'ชื่อประเภทลูกค้า: ' + value.requestParam.customerTypeName + '\n'
        : ''
      }` +
      `${value.requestParam.etaxSettingLevel
        ? 'ระดับการตั้งค่า ETAX: ' +
        value.requestParam.etaxSettingLevel +
        '\n'
        : ''
      }` +
      `${value.requestParam.displayCreateDateTime
        ? 'แสดงวันที่สร้างเวลา: ' +
        value.requestParam.displayCreateDateTime +
        '\n'
        : ''
      }`
    );
  }

  if (action === 'WALLET:UPDATE') {
    return (
      `แก้ไข Wallet\n` +
      `${value.walletId ? 'หมายเลข Wallet: ' + value.walletId + '\n' : ''}` +
      `${value.walletName ? 'ชื่อ Wallet: ' + value.walletName + '\n' : ''}` +
      `${value.requestParam.channelId
        ? 'ช่องทาง: ' + value.requestParam.channelId + '\n'
        : ''
      }`
    );
  }

  if (action === 'OBU:CREATE') {
    return (
      `ลงทะเบียน OBU \n` +
      `${value.car.licensePlate
        ? 'เลขทะเบียน: ' + value.car.licensePlate + '\n'
        : ''
      }` +
      `${value.car.province ? 'จังหวัด: ' + value.car.province + '\n' : ''}` +
      `${value.car.brand ? 'ยี่ห้อ: ' + value.car.brand + '\n' : ''}` +
      `${value.car.model ? 'รุ่น: ' + value.car.model + '\n' : ''}` +
      `${value.car.color ? 'สี: ' + value.car.color + '\n' : ''}` +
      `${value.car.yearRegistration
        ? 'ปีที่จดทะเบียน: ' + value.car.yearRegistration + '\n'
        : ''
      }` +
      `${value.obu.obuPan ? 'หมายเลข OBU: ' + value.obu.obuPan + '\n' : ''}` +
      `${value.obu.isType9 !== undefined
        ? 'ประเภท OBU: ' +
        (value.obu.isType9 ? 'ประเภท 9' : 'ไม่ใช่ประเภท 9') +
        '\n'
        : ''
      }` +
      `${value.obu.smartcardNo
        ? 'หมายเลขบัตร Smartcard: ' + value.obu.smartcardNo + '\n'
        : ''
      }` +
      `${value.obu.walletId ? 'หมายเลข Wallet: ' + value.obu.walletId + '\n' : ''
      }` +
      `${value.customer?.id ? 'หมายเลขลูกค้า: ' + value.customer.id + '\n' : ''
      }`
    );
  }

  if (action === 'OBU:UPDATE') {
    return (
      `แก้ไข OBU\n` +
      `${value.car.licensePlate
        ? 'เลขทะเบียน: ' + value.car.licensePlate + '\n'
        : ''
      }` +
      `${value.car.province ? 'จังหวัด: ' + value.car.province + '\n' : ''}` +
      `${value.car.brand ? 'ยี่ห้อ: ' + value.car.brand + '\n' : ''}` +
      `${value.car.model ? 'รุ่น: ' + value.car.model + '\n' : ''}` +
      `${value.car.color ? 'สี: ' + value.car.color + '\n' : ''}` +
      `${value.car.yearRegistration
        ? 'ปีที่จดทะเบียน: ' + value.car.yearRegistration + '\n'
        : ''
      }` +
      `${value.obu.obuPan ? 'หมายเลข OBU: ' + value.obu.obuPan + '\n' : ''}` +
      `${value.obu.isType9 !== undefined
        ? 'ประเภท OBU: ' +
        (value.obu.isType9 ? 'ประเภท 9' : 'ประเภทอื่น') +
        '\n'
        : ''
      }` +
      `${value.obu.smartcardNo
        ? 'หมายเลขบัตร Smartcard: ' + value.obu.smartcardNo + '\n'
        : ''
      }` +
      `${value.obu.walletId ? 'หมายเลข Wallet: ' + value.obu.walletId + '\n' : ''
      }`
    );
  }

  if (action === 'OBU:REPLACE') {
    return (
      `เปลี่ยน OBU\n` +
      `OBU ใหม่\n` +
      `${value.newObu.obuPan
        ? ' -หมายเลข OBU ใหม่: ' + value.newObu.obuPan + '\n'
        : ''
      }` +
      `${value.newObu.smartcardNo
        ? ' -หมายเลข Smartcard ใหม่: ' + value.newObu.smartcardNo + '\n'
        : ''
      }` +
      `OBU เก่า\n` +
      `${value.oldObu.obuPan
        ? ' -หมายเลข OBU เก่า: ' + value.oldObu.obuPan + '\n'
        : ''
      }` +
      `${value.oldObu.smartcardNo
        ? ' -หมายเลข Smartcard เก่า: ' + value.oldObu.smartcardNo + '\n'
        : ''
      }`
    );
  }

  if (action === 'OBU:SUSPEND') {
    return (
      `อายัด OBU\n` +
      `${value.obu.obuPan ? 'หมายเลข OBU: ' + value.obu.obuPan + '\n' : ''}` +
      `${value.obu.smartcardNo
        ? 'หมายเลข Smartcard: ' + value.obu.smartcardNo + '\n'
        : ''
      }` +
      `${value.obu.obuStatusRemark
        ? 'หมายเหตุสถานะ OBU: ' + value.obu.obuStatusRemark + '\n'
        : ''
      }` +
      `${value.wallet.id ? 'หมายเลข Wallet: ' + value.wallet.id + '\n' : ''}` +
      `${value.reasonId ? 'เหตุผล: ' + value.reasonId + '\n' : ''}` +
      `${value.isByProxy
        ? 'ดำเนินการโดย Proxy: ใช่\n'
        : 'ดำเนินการโดย Proxy: ไม่ใช่\n'
      }` +
      `${value.requestBy ? 'ผู้ขอ: ' + value.requestBy + '\n' : ''}` +
      `${value.requestIdNo ? 'หมายเลขคำขอ: ' + value.requestIdNo + '\n' : ''}` +
      `${value.requestParam.reqId
        ? 'รหัสคำขอ: ' + value.requestParam.reqId + '\n'
        : ''
      }` +
      `${value.requestPosition
        ? 'ตำแหน่งคำขอ: ' + value.requestPosition + '\n'
        : ''
      }` +
      `${value.requestRelation
        ? 'ความสัมพันธ์คำขอ: ' + value.requestRelation + '\n'
        : ''
      }`
    );
  }

  if (action === 'OBU:ACTIVATE') {
    return (
      `ถอนอายัด OBU\n` +
      `${value.obu.obuPan ? 'หมายเลข OBU: ' + value.obu.obuPan + '\n' : ''}` +
      `${value.obu.smartcardNo
        ? 'หมายเลข Smartcard: ' + value.obu.smartcardNo + '\n'
        : ''
      }` +
      `${value.obu.obuStatusRemark
        ? 'หมายเหตุสถานะ OBU: ' + value.obu.obuStatusRemark + '\n'
        : ''
      }` +
      `${value.wallet.id ? 'หมายเลข Wallet: ' + value.wallet.id + '\n' : ''}` +
      `${value.reasonId ? 'เหตุผล: ' + value.reasonId + '\n' : ''}` +
      `${value.isByProxy
        ? 'ดำเนินการโดย Proxy: ใช่\n'
        : 'ดำเนินการโดย Proxy: ไม่ใช่\n'
      }` +
      `${value.requestBy ? 'ผู้ขอ: ' + value.requestBy + '\n' : ''}` +
      `${value.requestParam.reqId
        ? 'รหัสคำขอ: ' + value.requestParam.reqId + '\n'
        : ''
      }` +
      `${value.requestPosition
        ? 'ตำแหน่งคำขอ: ' + value.requestPosition + '\n'
        : ''
      }` +
      `${value.requestRelation
        ? 'ความสัมพันธ์คำขอ: ' + value.requestRelation + '\n'
        : ''
      }`
    );
  }

  return `ไม่พบข้อมูล`;
}

export function formatDate(date: Date) {
  const formattedDate = new Intl.DateTimeFormat('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(date);
  return formattedDate.split('/').reverse().join('-');
}
export function formatDateTime(date: Date) {
  const options = { 
    year: 'numeric' as const, 
    month: '2-digit' as const, 
    day: '2-digit' as const, 
    hour: '2-digit' as const, 
    minute: '2-digit' as const 
  };
  const formattedDate = new Intl.DateTimeFormat('en-GB', options).format(date);
  const [datePart, timePart] = formattedDate.split(', ');

  return datePart.split('/').reverse().join('-') + ' ' + timePart.slice(0, 5);
}
export function getCustomerName(customer: CustomerModel) {
  let customerName = '';
  if (customer.customerTypeId === 3) {
    customerName = customer.corporateName + ' ' + customer.corporateBranch + ' ' + customer.branchId
  } else {
    customerName = customer.firstName + ' ' + customer.lastName
  }
  return customerName;
}