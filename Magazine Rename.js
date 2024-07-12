function OnGetNewName(getNewNameData)
{
var strStem = getNewNameData.newname_stem
var strExt = getNewNameData.newname_ext

strMagName = strStem.replace('.TruePDF','');
var strOrigName = strMagName

var dashpos = strMagName.indexOf('-');

if (dashpos == -1) // new format file name 'magname mm.yyyy'
{
	var dotpos = strMagName.indexOf('.');

	var strDate = ''
	var strMonth = strMagName.substring(dotpos-2, dotpos)
	var strYear = strMagName.substring(strMagName.length - 4, strMagName.length)
		
	strMagName = strMagName.substring(0, dotpos-3)
	
	var strTheRest = strOrigName.substring(dotpos+1, strOrigName.length)
	var dot2pos = strTheRest.indexOf('.')
	
	if (dot2pos > -1) // New format weekly
	{
		strDate = '-' + strTheRest.substring(dot2pos-2, dot2pos)
	}
	
	strNewStem = strMagName + ' ' + strYear + '-' + strMonth + strDate}
else
{
	var strMonthYear = strMagName.substring(dashpos+1,strMagName.length);

	// JavaScript engine doesn't do indexOf arrays, so...

	strMonthYear = strMonthYear.replace('January','01');
	strMonthYear = strMonthYear.replace('February','02');
	strMonthYear = strMonthYear.replace('March','03');
	strMonthYear = strMonthYear.replace('April','04');
	strMonthYear = strMonthYear.replace('May','05');
	strMonthYear = strMonthYear.replace('June','06');
	strMonthYear = strMonthYear.replace('July','07');
	strMonthYear = strMonthYear.replace('August','08');
	strMonthYear = strMonthYear.replace('September','09');
	strMonthYear = strMonthYear.replace('October','10');
	strMonthYear = strMonthYear.replace('November','11');
	strMonthYear = strMonthYear.replace('December','12');

	var dotpos = strMonthYear.indexOf('.');

	var intYear = strMonthYear.substring(dotpos+1,strMonthYear.length);

	if (intYear.length == 7) // Weekly
	{
	   intYear = strMonthYear.substring(dotpos+4,strMonthYear.length);
	   var intDate = '-' + strMonthYear.substring(0,2);
	   var intMonth = strMonthYear.substring(3,5);
	}
	else // Monthly
	{
	   var intDate = '';
	   var intMonth = strMonthYear.substring(0,2);
	}

	strNewStem = strMagName.substring(0, dashpos) + ' ' + intYear + '-' + intMonth + intDate;
	strNewStem = strNewStem.replace(/\x2E/g,' ');
}

return strNewStem + strExt
}
