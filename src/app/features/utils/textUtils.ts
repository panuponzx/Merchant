export function  getOptionsText(value:string) {
    switch (value) {
      case "CUSTOMER:CREATE":
        return "ลงทะเบียนผู้ใช้";
      case "WALLET:CREATE":
        return "ลงทะเบียนวอเลต";
      case "WALLET:UPDATE":
        return "แก้ไขวอเลต";
      case "OBU:CREATE":
        return "ลงทะเบียนOBU";
      case "OBU:UPDATE":
        return "แก้ไขOBU";
      case "OBU:REPLACE":
        return "เปลื่ยนOBU";
      case "OBU:SUSPEND":
        return "ระงับOBU";
      case "OBU:ACTIVATE":
        return "เปิดใช้งานOBU";
        default:
    return value;
    }    
  }