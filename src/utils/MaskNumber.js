import _ from "lodash";
import {ExponentsToDecimal} from './ExponentsToDecimal'


export function MaskNumber(input, addEmptyDecimal = false, checkDecimal = true, decimalCount = 7) {
	try {
		if (input == "" || input == undefined) {
			return '';
		}

		let str = input;
		str = str.toString();

		if (_.isNaN(parseFloat(str))) {

			return 0;

		} else{

			let dotIndex = str.indexOf('.')
	

			str = ExponentsToDecimal(str)
			str = str.toString();
		
			let parts = str.split(".");
			str = parts[0];

			if(dotIndex == -1 && parseFloat(str) == 0){
				return 0
			}


			if(parseFloat(parts[1]) != 0 && checkDecimal){
				let temp = `1.` + parts[1]
				temp = parseFloat(temp)
				temp = temp.toString()
				temp = temp.split(".")[1];
				parts[1] = temp
			}
			
		
			str = str.replace(/\,/g, "");
			var objRegex = new RegExp("(-?[0-9]+)([0-9]{3})");
		
			while (objRegex.test(str)) {
				str = str.replace(objRegex, "$1,$2");
			}
		
			if (parts[1] && parts[1].length > decimalCount) {
				parts[1] = parts[1].substr(0, decimalCount);
			}
		
			parts[1] = parts[1] != undefined ? parts[1] : '';
			if(parts[1].length == decimalCount && parseFloat(parts[1]) == 0){
				parts[1] = 0
			}
		
			if (dotIndex != -1) {
				if(parts[1] == ''){
					if(addEmptyDecimal){
						str += "." + parts[1];
					}
				}else{
					str += "." + parts[1];
				}
			}
			
			return str;
		}
	
		
	} catch (error) {
		
	}
}

export function toFixed(num, fixed) {
	var re = new RegExp('^-?\\d+(?:\.\\d{0,' + (fixed || -1) + '})?');
	return num.toString().match(re)[0];
}
