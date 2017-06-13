import qrcode = require("qrcode-generator");

type DataURI = string;

const cache: { [k: string]: string } = {};
export default function qrcode_converter(data: string): DataURI {
  if (data in cache) {
    return cache[data];
  }

  const qr = qrcode(getTypeByString(data), "L");
  qr.addData(data);
  qr.make();
  const imgTag = qr.createImgTag();
  const dataURI = imgTag.replace(/^.*src="([^"]*)".*$/, "$1");

  cache[data] = dataURI;
  return dataURI;
}

// 誤り訂正レベル "L" のときの、QR コードタイプ (1 - 40) 別の最大格納バイト数の一覧
// tslint:disable-next-line:max-line-length whitespace
const maximumNumsOfByteWithL = [17,32,53,78,106,134,154,192,230,271,321,367,425,458,520,586,644,718,792,858,929,1003,1091,1171,1273,1367,1465,1528,1628,1732,1840,1952,2068,2188,2303,2431,2563,2699,2809,2953];

/**
 * 与えられた文字列が全て格納できるだけの QR コードタイプを返す
 * ただし、誤り訂正レベル "L" / 格納タイプ "バイト" を前提とする
 */
function getTypeByString(data: string): number {
  const dataLength = qrcode.stringToBytes(data).length;
  for (let i = 1; i <= maximumNumsOfByteWithL.length; i += 1) {
    if (maximumNumsOfByteWithL[i - 1] >= dataLength) {
      return i;
    }
  }
  throw new Error(`QR Code は長すぎる文字列を格納できません 長さ:${ dataLength } データ:${ data }`);
}
