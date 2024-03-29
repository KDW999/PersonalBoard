package com.example.kdw.board2.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.kdw.board2.common.constant.ApiPattern;
import com.example.kdw.board2.service.FileService;

@RestController
@RequestMapping(ApiPattern.FILE)
public class FileController {
    
    @Autowired private FileService fileService;

    private final String UPLOAD = "/upload";
    private final String GET_FILE = "/{fileName}";

    //? postman에선 body에 form data
    //? 파일 업로드
    @PostMapping(UPLOAD)
    public String upload(@RequestParam("file") MultipartFile file ){
        String response = fileService.upload(file);
        return response;
    }

    //? 사진 이름이 sun.jpg면 url에 sun.jpg 그대로 적기
    //? 파일 다운로드
    @GetMapping(value = GET_FILE, produces = {MediaType.ALL_VALUE})
    public Resource getFile(@PathVariable("fileName") String fileName){
        Resource response = fileService.getFile(fileName);
        return response;
    }
}