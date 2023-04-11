package com.example.kdw.board2.service.implementation;

import java.io.File;
import java.util.UUID;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.kdw.board2.service.FileService;

@Service
public class FileServiceImplements implements FileService{

    @Value("${file.path}") //? 사진 올리면 저장되는 곳?
    private String FILE_PATH;

    @Value("${file.url}") //? 사진 위치?
    private String FILE_URL;

    //^ 파일 올리는 법 정도로 이해하자
    public String upload(MultipartFile file) {

        if(file.isEmpty()) return null;

        String originalFileName = file.getOriginalFilename(); //? 파일 이름 저장?
        String extension = originalFileName.substring(originalFileName.lastIndexOf(".")); //? 첫 인덱스부터 뒤에 첫 번째 . 까지 잘라내서 확장자명만 남김     
       
        String uuid = UUID.randomUUID().toString();

        String saveName = uuid + extension;
        String savePath = FILE_PATH + saveName;

        try {
            file.transferTo(new File(savePath));
        } catch (Exception exception) {
            exception.printStackTrace();
            return null;
        }

        String url = FILE_URL + saveName;
        return url;
    }
    
    public Resource getFile(String fileName){
        Resource resource = null;

        try {
            resource = new UrlResource("file:"+ FILE_PATH + fileName);
        } catch (Exception exception) {
            exception.printStackTrace();
            return null;
        }

        return resource;
    }
}
