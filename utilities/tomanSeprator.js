function FormatNumber(InputNumber) {
    let FormattedNumber = isNaN(InputNumber) ? "0" : InputNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    return FormattedNumber
  }
  // divider digit -----------------------------
function ToRial(str) {
  if(!str=="0"){
     str = str.replace(/\,/g, '');
        var objRegex = new RegExp('(-?[0-9]+)([0-9]{3})');
        while (objRegex&& objRegex.test(str)) {
            str = str.replace(objRegex, '$1,$2');
        }

        return str;
  }

    }

  export {FormatNumber ,ToRial }
