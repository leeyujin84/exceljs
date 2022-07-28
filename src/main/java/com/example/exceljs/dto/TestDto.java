package com.example.exceljs.dto;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.Date;

@Data
public class TestDto {
	char          columnChar='Y';
	String        columnString="String가나다!@#$";
	int           columnInt=9999;
	long          columnLong=999999999999999l;
	double        columnDouble=99.999;
	boolean       columnBoolean=true;
	Date          columnDate=new Date();
	LocalDateTime columnLocalDateTime=LocalDateTime.now();

	public TestDto(int num){
		this.columnInt = num;
	}
}
