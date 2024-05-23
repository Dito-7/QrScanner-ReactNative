import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import XLSX from 'xlsx';

const exportToExcel = async (data) => {
    const ws = XLSX.utils.json_to_sheet(data.map((item, index) => ({ No: index + 1, Data: item.data })));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'QR Data');

    const wbout = XLSX.write(wb, { type: 'base64', bookType: 'xlsx' });

    const uri = FileSystem.documentDirectory + 'QRData.xlsx';

    await FileSystem.writeAsStringAsync(uri, wbout, {
        encoding: FileSystem.EncodingType.Base64,
    });

    if (!(await Sharing.isAvailableAsync())) {
        alert(`Your device does not support the sharing feature`);
        return;
    }

    await Sharing.shareAsync(uri);
};

export default exportToExcel;
