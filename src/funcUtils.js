export const GetNameChoose=(state, type, sanh)=>{
    if(sanh==="Tài xỉu 1p"||sanh==="Tài xỉu 5p"||sanh==="Tài xỉu 3p"){
        if(Number(state)==1&&type==null){
            return "Chọn T "
        }
        if(Number(state)==2&&type==null){
            return "Chọn X "
        }
        if(Number(state)==3&&type==null){
            return "Chọn L "
        }
        if(Number(state)==4&&type==null){
            return "Chọn C "
        }else{
            return "Chọn "+state
        }
    }
    if(sanh==="Xúc sắc 3p"||sanh==="Xúc sắc 5p"){
        if(Number(state)==1&&type==null){
            return "Chọn T "
        }
        if(Number(state)==2&&type==null){
            return "Chọn X "
        }
        if(Number(state)==3&&type==null){
            return "Chọn L "
        }
        if(Number(state)==4&&type==null){
            return "Chọn C "
        }else{
            return "Chọn "+state
        }
    }else{
        if(Number(state)==1&&type==null){
            return "Đôi bên: Bi số 1 chọn T "
        }
        if(Number(state)==2&&type==null){
            return "Đôi bên: Bi số 1 chọn X "
        }
        if(Number(state)==3&&type==null){
            return "Đôi bên: Bi số 1 chọn L "
        }
        if(Number(state)==4&&type==null){
            return "Đôi bên: Bi số 1 chọn C "
        }
        if(Number(state)==5&&type==null){
            return "Đôi bên: Bi số 2 chọn T "
        }
        if(Number(state)==6&&type==null){
            return "Đôi bên: Bi số 2 chọn X "
        }
        if(Number(state)==7&&type==null){
            return "Đôi bên: Bi số 2 chọn L "
        }
        if(Number(state)==8&&type==null){
            return "Đôi bên: Bi số 2 chọn C "
        }
        if(Number(state)==9&&type==null){
            return "Đôi bên: Bi số 3 chọn T "
        }
        if(Number(state)==10&&type==null){
            return "Đôi bên: Bi số 3 chọn X "
        }
        if(Number(state)==11&&type==null){
            return "Đôi bên: Bi số 3 chọn L  "
        }
        if(Number(state)==12&&type==null){
            return "Đôi bên: Bi số 3 chọn C "
        }
        if(Number(state)==13&&type==null){
            return "Đôi bên: Bi số 4 chọn T "
        }
        if(Number(state)==14&&type==null){
            return "Đôi bên: Bi số 4 chọn X "
        }
        if(Number(state)==15&&type==null){
            return "Đôi bên: Bi số 4 chọn L "
        }
        if(Number(state)==16&&type==null){
            return "Đôi bên: Bi số 4 chọn C"
        }
        if(Number(state)==17&&type==null){
            return "Đôi bên: Bi số 5 chọn T "
        }
        if(Number(state)==18&&type==null){
            return "Đôi bên: Bi số 5 chọn X "
        }
        if(Number(state)==19&&type==null){
            return "Đôi bên: Bi số 5 chọn L "
        }
        if(Number(state)==20&&type==null){
            return "Đôi bên: Bi số 5 chọn C"
        }
        if(Number(state)==21&&type==null){
            return "Đôi bên: Tổng chọn T "
        }
        if(Number(state)==22&&type==null){
            return "Đôi bên:  Tổng chọn X "
        }
        if(Number(state)==23&&type==null){
            return "Đôi bên:  Tổng chọn L "
        }
        if(Number(state)==24&&type==null){
            return "Đôi bên:  Tổng chọn C"
        }
        if(type==1&&state!=null){
            return "Lô: Chọn số "+state
        }
        if(type==2&&state!=null){
            return "Ba càng: Chọn số "+state
        }
        if(type==3&&state!=null){
            return "Đề: Chọn số "+state
        }
        if(type==4&&state!=null){
            return "Lô xiên 2: Chọn số "+state
        }
        if(type==5&&state!=null){
            return "Lô xiên 3: Chọn số "+state
        }
        if(type==6&&state!=null){
            return "Lô xiên 4: Chọn số "+state
        }
        if(type==7&&state!=null){
            return "Trượt xiên 4: Chọn số "+state
        }
        if(type==8&&state!=null){
            return "Trượt xiên 8: Chọn số "+state
        }
    }
}