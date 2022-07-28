package com.example.exceljs.dto;

import lombok.Builder;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.ArrayList;
import java.util.List;

public class ToastGridDto {

	@Data
	public static class Request{
		int perPage;
		int page;
	}

	@Data
	public static class Response<T>{
		boolean result = true;
		GridData<T> data = new GridData<>();
	}

	@Data
	public static class GridData<T>{
		List<T> contents;
		Pagination pagination;
	}

	@Data
	@Builder
	public static class Pagination{
        int page;
		int pageSize;
		long totalCount;
	}
}
