import { AppBar, Box, FormControl, IconButton, InputAdornment, OutlinedInput, Toolbar, Typography, Button } from '@mui/material';
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { useUserStore } from '../../stores'

export default function NavigationBar() {

    const [content, setContent] = useState<string>(''); // 초기화 값이 없다면 undefined로 됨
    
    const path = useLocation();
    const navigator = useNavigate();

    const { user } = useUserStore();

    const onSearchHandler = () => {
        if(!content.trim()){ // 공백 확인 여부
          alert('검색어 입력');
          return
        }

        navigator('/board/search/${content}');
    }

    console.log(path.pathname);

    return (
        <Box sx = {{ flexGrow : 1}}>
            <AppBar variant = 'outlined' position='static' sx = {{ p : '0px 120px', backgroundColor : '#ffffff'}}>
                <Toolbar> {/* 툴바로 감싸기 */} 
    {/* Text? */}  <Typography 
                    variant = "h6"
                    noWrap
                    component="div"
                    sx = {{flexGrow : 1, display : {xs : 'none', sm : 'block', color : '#000000'}}}
                    onClick = {() => navigator('/')}>
                        KDW Board
                        </Typography>

                <Box sx = {{ display : 'flex'}}>
                    <FormControl variant='outlined' sx = {{ mr : '10px'}}>
                        <OutlinedInput size = 'small'
                        type = 'text'
                        placeholder = '검색어 입력'
                        endAdornment = {
                            <InputAdornment position='end'>
                                <IconButton edge = 'end' onClick = {onSearchHandler}>
                                    <SearchIcon/>
                                </IconButton>
                            </InputAdornment>
                        }
                        onChange = {(event) => setContent(event.target.value)}
                        />
                    </FormControl>
                    {path.pathname !== '/auth' && (user ? // 유저가 로그인/비로그인 시 보여줄 화면들
                    (
                        <Button variant = 'outlined'
                        sx = {{ backgroundColor : '#ffffff', color : '#000000'}}
                        onClick = {() => navigator('/myPage')}>
                            My Page
                        </Button>
                    ) : (
                        <Button
                        variant='contained'
                        sx = {{ backgroundColor : "#000000"}}
                        onClick = {() => navigator('/auth')}>
                            로그인
                        </Button>
                    ))}
                </Box>
                </Toolbar>
            </AppBar>
        </Box>
  )
}
