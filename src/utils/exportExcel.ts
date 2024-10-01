import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

export interface IMailMessage {
  to: string;
  data?: Blob;
  subject: String;
}

export function blobToDataUrl(blob: any) {
  return new Promise((r) => {
    let a = new FileReader();
    a.onload = r;
    a.readAsDataURL(blob);
  }).then((e: any) => e.target.result);
}

export const ExportToExcel = (apiData: any, fileName: any) => {
  FileSaver.saveAs(getExportData(apiData), `${fileName}`);
};

export const getExportData = (apiData: any) => {
  const ws = XLSX.utils.json_to_sheet(apiData);
  const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
  const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  const data = new Blob([excelBuffer], { type: "xlsx" });
  return data;
};

export const download = (data: Blob, fileName: any) => {
  FileSaver.saveAs(data, `${fileName}`);
};

export const sendEmail = async (mail: IMailMessage, apiClient: any) => {
  apiClient.post("http://localhost:3000/mail", {
    data: mail.data,
    to: mail.to,
    subject: mail.subject,
  });
};
