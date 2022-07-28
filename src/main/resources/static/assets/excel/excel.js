
importScripts("/assets/polyfill.min.js_7.10.4/cdnjs/polyfill.min.js");
importScripts("/assets/exceljs/dist/exceljs.js");
importScripts("/assets/xlsx-populate/browser/xlsx-populate.js");

class ExcelExport{
    constructor(options) {
        onmessage = this.message.bind(this);
    }

    async export() {
        try {
			console.log(this.excel);
			postMessage({type : "message", data : "데이터 생성"});
            this.createWorkBook(this.excel.writer);
			postMessage({type : "message", data : "createWorkBook"});
			for(let sheet of this.excel.worksheets){
				sheet.data = await this.createData(sheet);
				this.createSheet(sheet);
			}

            let blob = await this.workbook.xlsx.writeBuffer();
			postMessage({type : "message", data : "writeBuffer"});
            let populateWorkbook = await XlsxPopulate.fromDataAsync(blob);
			postMessage({type : "message", data : "readBuffer"});
            let data = await populateWorkbook.toDataAsync({password : this.excel.password});
			postMessage({type : "message", data : "encryption"});
            blob = new Blob([data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
            postMessage({type : "blob", data : blob});

        } catch(error) {
            console.error(error);
        }
    }

    message(eventMessage) {
		this.excel = eventMessage.data.data;
        this.export(eventMessage.data.data);


    }

	async createData(){
		try{
			postMessage({type : "message", data : "createData .. start!"});
			let rows = new Array();
			for( let i = 0 ; i < 10; i++ ){
				let url = '/api/v1/readData';
				let response = await fetch(url, {method : "GET"});
				let json = await response.json();
				rows = rows.concat(json.data.contents);
			}
			return rows;

		}catch (e){
			console.error(e);
		}finally{
			postMessage({type : "message", data : "createData .. end!!"});
		}
	}

    createWorkBook(creator){
		try{
			postMessage({type : "message", data : "createWorkBook .. start!"});

			// 엑셀 생성
			this.workbook = new ExcelJS.Workbook();
			// 생성자
			this.workbook.creator = creator;
			// 최종 수정자
			this.workbook.lastModifiedBy = creator;
			// 생성일(현재 일자로 처리)
			this.workbook.created = new Date();
			// 수정일(현재 일자로 처리)
			this.workbook.modified = new Date();

		}catch (e){

		}finally {
			postMessage({type : "message", data : "createWorkBook .. end!"});
		}
    }

    createSheet(sheet){
		try{
			postMessage({type : "message", data : "createSheet .. start!"});
			this.workbook.addWorksheet(sheet.sheetName);
			let worksheet = this.workbook.getWorksheet(sheet.sheetName);
			worksheet.columns = sheet.columns;
			worksheet.addRows(sheet.data, "i");

			return worksheet;

		}catch (e){

		}finally {
			postMessage({type : "message", data : "createSheet .. end!"});
		}
    }
}

new ExcelExport();
