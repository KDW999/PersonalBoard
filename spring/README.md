
#### jpa 의존성 implementation 'org.springframework.boot:spring-boot-starter-data-jpa'
#### dto 유효성 검사 implementation 'org.springframework.boot:spring-boot-starter-validation'

### DB의 테이블과 Entity의 변수명이 같은지 확인
### MySql에서 password VARCHAR(45)로 범위를 잡으니 패스워드를 4글자만 적어도 데이터가 너무 크단다 → VARCHAR(255) 변경해줌
### MySql EER diagram로 테이블 생성 후 1:1 연결 이후 DB로 변환하는 과정에서 영문을 알 수 없는 레코드가 추가적으로 Not Null 상태로 만들어짐 → Spring Terminal 상에서 오류 코드 보고 추가된 레코드 삭제해줌
