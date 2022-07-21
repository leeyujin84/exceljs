
importScripts("/assets/polyfill.min.js_7.10.4/cdnjs/polyfill.min.js");
importScripts("/assets/exceljs/dist/exceljs.bare.js");
importScripts("/assets/xlsx-populate/browser/xlsx-populate.js");

class ExcelExport{
    constructor(options) {
        onmessage = this.message.bind(this);
    }

    async export() {
        try {
            const columns = [
                {header: '이름', key: 'name', width: 40},
                {header: '성별', key: 'gender', hidden:false, width: 30},
                {header: '부서코드', key: 'deptCode', width: 60},
                {header: '부서명', key: 'deptName', width: 100,
                    // 스타일 설정
                    style: {
                        // Font 설정
                        font: {name: 'Arial Black', size: 20},
                        // Borders 설정
                        border: {
                            top: {style:'thin', color: {argb:'FF00FF00'}},
                            left: {style:'thin', color: {argb:'FF00FF00'}},
                            bottom: {style:'thin', color: {argb:'FF00FF00'}},
                            right: {style:'thin', color: {argb:'FF00FF00'}},
                        },
                        // Fills 설정
                        fill: {
                            type: 'pattern',
                            fgColor: {argb: 'FFFFFF00'},
                            bgColor: {argb: 'FF0000FF'}
                        }
                    }
                }
                ];

            let sampleData = new Array();

            for(let i = 0; i<10 ; i++){
//                sampleData.push({ name: '홍길동'+i, code: 'A100', gender: 'F', entryDate: '20200101', deptCode: 'A1000', deptName: '금융팀' })
                sampleData.push(['홍길동'+i, 'A100', 'F', '20200101', 'A1000', '금융팀' ])
            }

            this.createWorkBook();
            this.createSheet("sheet1")
//            this.createHeader(this.workbook.getWorksheet(1), columns);
            this.createBody(this.workbook.getWorksheet(1), sampleData)


            //this.workbook.getWorksheet(1).addRow({ name: '이유진', code: 'A100', gender: 'F', entryDate: '20200101', deptCode: 'A1000', deptName: '금융팀' }, 11);
            this.workbook.getWorksheet(1).addRow(['홍길동', 'A100', 'F', '20200101', 'A1000', '금융팀' ], 1);


            let blob = await this.workbook.xlsx.writeBuffer();
            let populateWorkbook = await XlsxPopulate.fromDataAsync(blob);
            let data = await populateWorkbook.toDataAsync({password : 'asdf'});
            blob = new Blob([data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
            postMessage({type : "blob", data : blob})





            /*const borderStyle = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
*/
           /* sampleData.map((item, index) => {
                sheetOne.addRow(item);
                // 추가된 행의 컬럼 설정(헤더와 style이 다를 경우)
                for(let loop = 1; loop <= 4; loop++) {
                    const col = sheetOne.getRow(index + 2).getCell(loop);
                    col.border = borderStyle;
                    col.font = {name: 'Arial Black', size: 40};
                }
            });*/
        } catch(error) {
            console.error(error);
        }
    }

    message(eventMessage) {
        console.log(eventMessage)
        this.window = eventMessage.data;
        this.export();
    }

    createWorkBook(){
        // 엑셀 생성
        this.workbook = new ExcelJS.Workbook();
        // 생성자
        this.workbook.creator = '작성자';
        // 최종 수정자
        this.workbook.lastModifiedBy = '최종 수정자';
        // 생성일(현재 일자로 처리)
        this.workbook.created = new Date();
        // 수정일(현재 일자로 처리)
        this.workbook.modified = new Date();
    }

    createSheet(sheetName){
        this.workbook.addWorksheet(sheetName);
    }

    createHeader(sheet, columns){
        sheet.columns = columns;
    }

    createBody(sheet, body){
        const borderStyle = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
        };

        body.map((item, index) => {
            sheet.addRow(item);
            // 추가된 행의 컬럼 설정(헤더와 style이 다를 경우)
            for(let loop = 1; loop <= 4; loop++) {
                const col = sheet.getRow(index + 2).getCell(loop);
                col.border = borderStyle;
                col.font = {name: 'Arial Black', size: 40};
            }
        });
    }

    createFooter(){

    }

    encrypt(){

    }
}

new ExcelExport();
