/** Parser CSV tối giản: hỗ trợ trường có dấu phẩy/xuống dòng/dấu ngoặc kép ("...""...") theo RFC 4180. */
export function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];

    if (inQuotes) {
      if (char === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i += 1;
        } else {
          inQuotes = false;
        }
      } else {
        field += char;
      }
      continue;
    }

    if (char === '"') {
      inQuotes = true;
    } else if (char === ',') {
      row.push(field);
      field = '';
    } else if (char === '\r') {
      // bỏ qua, xử lý ở \n
    } else if (char === '\n') {
      row.push(field);
      rows.push(row);
      row = [];
      field = '';
    } else {
      field += char;
    }
  }

  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }

  return rows.filter((r) => r.some((cell) => cell.trim() !== ''));
}

/** Chuyển ma trận CSV (đã có header ở dòng đầu) thành mảng object, bỏ các cột "Column N" trống thừa của Google Sheets. */
export function csvToObjects(rows) {
  if (rows.length === 0) return [];
  const header = rows[0].map((h) => h.trim());
  return rows.slice(1).map((r) => {
    const obj = {};
    header.forEach((key, idx) => {
      if (!key || /^Column \d+$/.test(key)) return;
      obj[key] = (r[idx] ?? '').trim();
    });
    return obj;
  });
}
