package com.example.exceljs;

import com.example.exceljs.dto.TestDto;
import com.example.exceljs.dto.ToastGridDto;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
public class ExampleApiController {

    @GetMapping("/api/v1/readData")
    public ToastGridDto.Response readData(ToastGridDto.Request requestDto){
		ToastGridDto.Response response = new ToastGridDto.Response();

		List<TestDto> contents = new ArrayList<>();

		int start = (requestDto.getPage()-1) * requestDto.getPerPage();
		int end = (requestDto.getPage() * requestDto.getPerPage()) + requestDto.getPerPage();
		for(int i = start ; i < end ; i++ ){
			contents.add(new TestDto(i));
		}


		response.getData().setContents(contents);

		response.getData().setPagination(ToastGridDto.Pagination.builder()
				.page(requestDto.getPage())
				.pageSize(requestDto.getPerPage())
				.totalCount(10000)
				.build());

		return response;
    }
}
