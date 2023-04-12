interface ResponseDto{
    board: {
        "boardContent": string,
        "boardImgUrl": string | null,
        "boardNumber": number,
        "boardTitle": string,
        "boardWriteDatetime": string,
        "commentCount": number,
        "likeCount": number,
        "viewCount": number,
        "writerEmail": string,
        "writerNickname": string,
        "writerProfileUrl": string | null
    },
    commentList: [
        {
            "boardNumber": number,
            "commentContent": string,
            "commentNumber": number,
            "writeDatetime": string,
            "writeProfileUrl": string | null,
            "writerEmail": string,
            "writerNickname": string
        }
    ],
    likeList: [
        {
            "boardNumber": number,
            "userEmail": string,
            "userNickname": string,
            "userProfileUrl": string | null
        }
    ]

}

export default ResponseDto;