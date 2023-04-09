package com.example.kdw.board2.service.implementation;

import java.util.List;

import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.kdw.board2.common.constant.ResponseMessage;
import com.example.kdw.board2.dto.request.board.LikeReqeustDto;
import com.example.kdw.board2.dto.request.board.PatchBoardRequestDto;
import com.example.kdw.board2.dto.request.board.PostBoardRequestDto;
import com.example.kdw.board2.dto.request.board.PostCommentRequestDto;
import com.example.kdw.board2.dto.response.ResponseDto;
import com.example.kdw.board2.dto.response.board.DeleteBoardResponseDto;
import com.example.kdw.board2.dto.response.board.GetBoardResponseDto;
import com.example.kdw.board2.dto.response.board.GetListResponseDto;
import com.example.kdw.board2.dto.response.board.GetMyListResponseDto;
import com.example.kdw.board2.dto.response.board.GetSearchListResponseDto;
import com.example.kdw.board2.dto.response.board.LikeResponseDto;
import com.example.kdw.board2.dto.response.board.PatchBoardResponseDto;
import com.example.kdw.board2.dto.response.board.PostBoardResponseDto;
import com.example.kdw.board2.dto.response.board.PostCommentResponseDto;
import com.example.kdw.board2.entity.BoardEntity;
import com.example.kdw.board2.entity.CommentEntity;
import com.example.kdw.board2.entity.LikyEntity;
import com.example.kdw.board2.entity.SearchWordLogEntity;
import com.example.kdw.board2.entity.UserEntity;
import com.example.kdw.board2.repository.BoardRepository;
import com.example.kdw.board2.repository.CommentRepository;
import com.example.kdw.board2.repository.LikyRepository;
import com.example.kdw.board2.repository.SearchWordLogRepository;
import com.example.kdw.board2.repository.UserRepository;
import com.example.kdw.board2.service.BoardService;

@Service
public class BoardServiceImplements implements BoardService{
    
    @Autowired UserRepository userRepository;
    @Autowired BoardRepository boardRepository;
    @Autowired CommentRepository commentRepository;
    @Autowired LikyRepository likyRepository;
    @Autowired SearchWordLogRepository searchWordLogRepository;

    //? 게시물 작성
    public ResponseDto<PostBoardResponseDto> postBoard(String email, PostBoardRequestDto dto){

        PostBoardResponseDto data = null;

        try {

           UserEntity userEntity = userRepository.findByEmail(email);
           if(userEntity == null) return ResponseDto.setFailed(ResponseMessage.NOT_EXIST_USER);
        
           BoardEntity boardEntity = new BoardEntity(userEntity, dto);
           boardRepository.save(boardEntity);

           data = new PostBoardResponseDto(boardEntity);

        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.setFailed(ResponseMessage.DATABASE_ERROR);
        }

        return ResponseDto.setSuccess(ResponseMessage.SUCCESS, data);
    }

    //? 댓글 작성
    public ResponseDto<PostCommentResponseDto> postComment(String email, PostCommentRequestDto dto){

        PostCommentResponseDto data = null;

        int boardNumber = dto.getBoardNumber();

        try {

            UserEntity userEntity = userRepository.findByEmail(email);
            if(userEntity == null) return ResponseDto.setFailed(ResponseMessage.NOT_EXIST_USER);

            BoardEntity boardEntity = boardRepository.findByBoardNumber(boardNumber);
            if(boardEntity == null) return ResponseDto.setFailed(ResponseMessage.NOT_EXIST_BOARD);

            CommentEntity commentEntity = new CommentEntity(userEntity, dto);
            commentRepository.save(commentEntity);

            boardEntity.increaseCommentCount();
            boardRepository.save(boardEntity);

            List<CommentEntity> commentList = commentRepository.findByBoardNumberOrderByWriteDatetimeDesc(boardNumber);
            List<LikyEntity> likyList = likyRepository.findByBoardNumber(boardNumber);

            data = new PostCommentResponseDto(boardEntity, likyList, commentList);

            
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.setFailed(ResponseMessage.DATABASE_ERROR);
        }

        return ResponseDto.setSuccess(ResponseMessage.SUCCESS, data);
    }

    //? 좋아요 누르기
    public ResponseDto<LikeResponseDto> like(String email, LikeReqeustDto dto){

        LikeResponseDto data = null;
        int boardNumber = dto.getBoardNumber();

        try {

            UserEntity userEntity = userRepository.findByEmail(email);
            if(userEntity == null) return ResponseDto.setFailed(ResponseMessage.NOT_EXIST_USER);
            System.out.println(userEntity);

            BoardEntity boardEntity = boardRepository.findByBoardNumber(boardNumber);
            if(boardEntity == null) return ResponseDto.setFailed(ResponseMessage.NOT_EXIST_BOARD);

            LikyEntity likyEntity = likyRepository.findByUserEmailAndBoardNumber(email, boardNumber);
            if(likyEntity == null){
                likyEntity = new LikyEntity(userEntity, boardNumber);
                likyRepository.save(likyEntity);
                boardEntity.increaseLikeCount();
            }
            else{
                likyRepository.delete(likyEntity);
            }

            boardRepository.save(boardEntity);

            List<CommentEntity> commentList = commentRepository.findByBoardNumberOrderByWriteDatetimeDesc(boardNumber);
            List<LikyEntity> likyList = likyRepository.findByBoardNumber(boardNumber);

            data = new LikeResponseDto(boardEntity, likyList, commentList);

        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.setFailed(ResponseMessage.DATABASE_ERROR);
        }

        return ResponseDto.setSuccess(ResponseMessage.SUCCESS, data);
    }

    //? 게시글 조회
    public ResponseDto<GetBoardResponseDto> getBoard(int boardNumber){

        GetBoardResponseDto data = null;

        try {

        BoardEntity boardEntity = boardRepository.findByBoardNumber(boardNumber);
        System.out.println(boardEntity);

        if(boardEntity == null) return ResponseDto.setFailed(ResponseMessage.NOT_EXIST_BOARD);

        List<LikyEntity> likyList = likyRepository.findByBoardNumber(boardNumber);
        List<CommentEntity> commentList = commentRepository.findByBoardNumberOrderByWriteDatetimeDesc(boardNumber);

        boardEntity.increaseViewCount();
        boardRepository.save(boardEntity);

        data = new GetBoardResponseDto(boardEntity, likyList, commentList);
        
            
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.setFailed(ResponseMessage.DATABASE_ERROR);
        }

        return ResponseDto.setSuccess(ResponseMessage.SUCCESS, data);
    }

    //? 글 수정
    public ResponseDto<PatchBoardResponseDto> patchBoard(String email, PatchBoardRequestDto dto){

        PatchBoardResponseDto data = null;

        //? boardNumber 변수 만들어서 게시물 번호 넣어주던가 아니면 dto.getBoardNumber()로 바로 가져와서 사용하던가
        // int boardNumber = dto.getBoardNumber();

        try {

            //? 존재하는 게시물 번호인지
            BoardEntity boardEntity = boardRepository.findByBoardNumber(dto.getBoardNumber());
            if(boardEntity == null) return ResponseDto.setFailed(ResponseMessage.NOT_EXIST_BOARD);

            //? 글 작성자와 같은 유저인지, 이메일로 비교했는데 닉네임을 unique로 지정하면 닉네임으로도 구분지을 수 있지 않을까
            boolean isEqualWriter = email.equals(boardEntity.getWriterEmail());
            if(!isEqualWriter) return ResponseDto.setFailed(ResponseMessage.NOT_PERMISSION);

            boardEntity.patch(dto);
            boardRepository.save(boardEntity); 

            List<LikyEntity> likyList = likyRepository.findByBoardNumber(dto.getBoardNumber());
            List<CommentEntity> commentList = commentRepository.findByBoardNumberOrderByWriteDatetimeDesc(dto.getBoardNumber());

            //? 위에서 연산한 값들로 ResponseDto의 생성자를 실행해서 값을 저장하고 새로 저장한 데이터를 클라이언트에게 보여준다.
            data = new PatchBoardResponseDto(boardEntity, likyList, commentList);

        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.setFailed(ResponseMessage.DATABASE_ERROR);
        }

        return ResponseDto.setSuccess(ResponseMessage.SUCCESS, data);
    }

    //? 글 삭제
    public ResponseDto<DeleteBoardResponseDto> deleteBoard(String email, int boardNumber){
        
        DeleteBoardResponseDto data = null;

        try {

            //? 글 번호를 넣어서 해당 번호에 해당하는 글의 정보를 가져와서 boardEntity에 담는다
            BoardEntity boardEntity = boardRepository.findByBoardNumber(boardNumber);
            if(boardEntity == null) return ResponseDto.setFailed(ResponseMessage.NOT_EXIST_BOARD);

            //? 가져온 글의 정보와 현재 로그인한 유저의 email을 비교해서 같아야 삭제 가능
            boolean isEqualWriter = email.equals(boardEntity.getWriterEmail());
            if(!isEqualWriter) return ResponseDto.setFailed(ResponseMessage.NOT_PERMISSION);
            
            commentRepository.deleteByBoardNumber(boardNumber);
            likyRepository.deleteByBoardNumber(boardNumber);

            boardRepository.delete(boardEntity);
            data = new DeleteBoardResponseDto(true);

        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.setFailed(ResponseMessage.DATABASE_ERROR);

        }

        return ResponseDto.setSuccess(ResponseMessage.SUCCESS, data);
    }

    //? 전체 글 목록 보기
    public ResponseDto<List<GetListResponseDto>> getList(){

        List<GetListResponseDto> data = null;

        try {

            List<BoardEntity> boardEntityList = boardRepository.findByOrderByBoardWriteDatetimeDesc();
            data = GetListResponseDto.copyList(boardEntityList);
            
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.setFailed(ResponseMessage.DATABASE_ERROR);
        }

        return ResponseDto.setSuccess(ResponseMessage.SUCCESS, data);
    }

    //? 내 글 목록 보기
    public ResponseDto<List<GetMyListResponseDto>> getMyList(String email){

        List<GetMyListResponseDto> data = null;

        try {

            List<BoardEntity> boardEntityList = boardRepository.findByWriterEmailOrderByBoardWriteDatetimeDesc(email);
            data = GetMyListResponseDto.copyList(boardEntityList);
            
        } catch (Exception exception) {
            exception.printStackTrace();;
            return ResponseDto.setFailed(ResponseMessage.DATABASE_ERROR);
        }
        return ResponseDto.setSuccess(ResponseMessage.SUCCESS, data);
    }

    //? 검색어 리스트 조회
    public ResponseDto<List<GetSearchListResponseDto>> getSearchList(String searchWord, String previousSearchWord){

        List<GetSearchListResponseDto> data = null;

        try {

            SearchWordLogEntity searchWordLogEntity = new SearchWordLogEntity(searchWord);
            searchWordLogRepository.save(searchWordLogEntity);

            //? 이전 검색어에 값이 있고, 비어있지 않다면 
            if(previousSearchWord != null && !previousSearchWord.isBlank()){
                RelatedSearch
            }

            
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.setFailed(ResponseMessage.DATABASE_ERROR);
        }
        return ResponseDto.setSuccess(ResponseMessage.SUCCESS, data);
    }
}
