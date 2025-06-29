function phoneNumberChecker(number) {
    if(number.length!==11){
        return 'شماره موبایل اشتباه است'
    }else{
        if(!(/^09/.test(number))){
            return 'فرمت شماره موبایل اشتباه است'
        }else{
            return ''
        }
    }
}

const nationalCodeChecker =(code)=> {
    // Ensure the code is a string and has exactly 10 digits
    if (!/^\d{10}$/.test(code)) return 'کد ملی اشتباه';

    // Convert the code into an array of digits
    const digits = code.split('').map(Number);

    // All digits are the same (invalid case)
    if (digits.every(digit => digit === digits[0])) return 'کد ملی اشتباه';

    // Calculate the control number
    const controlDigit = digits[9];
    const sum = digits.slice(0, 9).reduce((acc, digit, index) => acc + digit * (10 - index), 0);
    const remainder = sum % 11;

    // Validation logic
    if (!((remainder < 2 && controlDigit === remainder) || (remainder >= 2 && controlDigit === 11 - remainder))) {
        return 'فرمت کد ملی اشتباه';
    }

    return '';
}


const passwordStrongChecker =(password)=>{
    if (password?.length < 8) {
        return  'طول رمز نباید کمتر از هشت رقم باشد '
    }
    if (!/^[a-zA-Z0-9!@#]+$/.test(password)) {
        return  'کیبرد خود را انگلیسی نمایید'
    }
    if (!/[a-zA-Z]/.test(password)) {
        return  "حداقل یک حرف در رمز الزامیست"
    }
    if (!/\d/.test(password)) {
        return  "در رمز از عدد استفاده نمایید "
    }
    // بررسی وجود حداقل یک کاراکتر خاص !@#
    // if (!/[!@#]/.test(password)) {
    //     return  ' '
    // }

}


export { phoneNumberChecker , nationalCodeChecker ,passwordStrongChecker  }