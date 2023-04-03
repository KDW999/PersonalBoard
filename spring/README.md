
#### jpa 의존성 implementation 'org.springframework.boot:spring-boot-starter-data-jpa'
#### dto 유효성 검사 implementation 'org.springframework.boot:spring-boot-starter-validation'

### DB의 테이블과 Entity의 변수명이 같은지 확인
### MySQL에서 password VARCHAR(45)로 범위를 잡으니 패스워드를 4글자만 적어도 데이터가 너무 크단다 → VARCHAR(255) 변경해줌
