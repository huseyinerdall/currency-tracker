function capitalize(str) {
    if (typeof str !== 'string') return ''
    return str.charAt(0).toUpperCase() + str.slice(1)
}

// search in array of objects a specific value key
function search(nameKey, array) {
    let res;
    for (var i = 0; i < array.length; i++) {
        if (array[i].name === nameKey) {
            res = array[i];
        }
    }
    if (res) {
        return res;
    }
    nameKey = capitalize(nameKey);
    for (var i = 0; i < array.length; i++) {
        if (array[i].name === nameKey) {
            res = array[i];
        }
    }
    return res;
}

// this function convert string which contains turkish char to english string
// also remove spaces in the string  REŞİT ALTIN --> RESITALTIN
function turkishToEnglish(str) {
    let temp = str
        .replace(/Ğ/g, "G")
        .replace(/Ü/g, "U")
        .replace(/Ş/g, "S")
        .replace(/I/g, "I")
        .replace(/İ/g, "I")
        .replace(/Ö/g, "O")
        .replace(/Ç/g, "C")
        .replace(/ğ/g, "g")
        .replace(/ü/g, "u")
        .replace(/ş/g, "s")
        .replace(/ı/g, "i")
        .replace(/ö/g, "o")
        .replace(/ç/g, "c")
        .replace(/\s/g, ''); // \s -> space
    return temp;
}


function removeDashes(str) {
    return str.replaceAll('-', '');
}

function mailTemplate(userId) {
    return `
    <table width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
        <tbody>
        <tr>
            <td align="center">
                <table class="col-600" width="600" border="0" align="center" cellpadding="0" cellspacing="0">
                    <tbody>
                    <tr>
                        <td align="center" valign="top" background="https://para.guru/img/back.fw.b967de0d.webp"
                            bgcolor="#66809b" style="background-size:cover; background-position:top;height=" 400
                        ""="">
                        <table class="col-600" width="600" height="240" border="0" align="center" cellpadding="0"
                               cellspacing="0">
    
                            <tbody>
                            <tr>
                                <td height="10"></td>
                            </tr>
    
    
                            <tr>
                                <td align="center" style="line-height: 0px;">
                                    <img style="display:block; line-height:0px; font-size:0px; border:0px;"
                                         src="https://para.guru/img/logo.fb7d3ed9.png" width="109" height="103" alt="logo">
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </td>
        </tr>
        <tr>
            <td align="center">
                <table align="center" class="col-600" width="600" border="0" cellspacing="0" cellpadding="0">
                    <tbody>
                    <tr>
                        <td align="center" bgcolor="#2a3b4c">
                            <table class="col-600" width="600" align="center" border="0" cellspacing="0" cellpadding="0">
                                <tbody>
                                <tr>
                                    <td height="33"></td>
                                </tr>
                                <tr>
                                    <td>
    
    
                                        <table class="col1" width="183" border="0" align="left" cellpadding="0"
                                               cellspacing="0">
    
                                            <tbody>
                                            <tr>
                                                <td height="18"></td>
                                            </tr>
    
                                            <tr>
                                                <td align="center">
                                                    <img style="display:block; line-height:0px; font-size:0px; border:0px;"
                                                         class="images_style"
                                                         src="https://designmodo.com/demo/emailtemplate/images/icon-title.png"
                                                         alt="img" width="156" height="136">
                                                </td>
    
    
                                            </tr>
                                            </tbody>
                                        </table>
    
    
                                        <table class="col3_one" width="380" border="0" align="right" cellpadding="0"
                                               cellspacing="0">
    
                                            <tbody>
                                            <tr align="left" valign="top">
                                                <td style="font-family: 'Raleway', sans-serif; font-size:20px; color:#f1c40f; line-height:30px; font-weight: bold;">
                                                    Hesap aktivasyon
                                                </td>
                                            </tr>
    
    
                                            <tr>
                                                <td height="5"></td>
                                            </tr>
    
    
                                            <tr align="left" valign="top">
                                                <td style="font-family: 'Lato', sans-serif; font-size:14px; color:#fff; line-height:24px; font-weight: 300;">
                                                    Aşağıdaki butona tıklayarak hesabını aktif hale getirebilirsin.
                                                </td>
                                            </tr>
    
                                            <tr>
                                                <td height="10"></td>
                                            </tr>
    
                                            <tr align="left" valign="top">
                                                <td>
                                                    <table class="button" style="border: 2px solid #fff;" bgcolor="#2b3c4d"
                                                           width="30%" border="0" cellpadding="0" cellspacing="0">
                                                        <tbody>
                                                        <tr>
                                                            <td width="10"></td>
                                                            <td height="30" align="center"
                                                                style="font-family: 'Open Sans', Arial, sans-serif; font-size:13px; color:#ffffff;">
                                                                <a href="${'https://para.guru'}/activating/NdwpcOASVe5gdcPSfZpwFvWkJzoUzy7n6bi/user/${userId}"
                                                                   style="color:#ffffff;">AKTİF ET</a>
                                                            </td>
                                                            <td width="10"></td>
                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
    
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td height="33"></td>
                                </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </td>
        </tr>
        <tr>
            <td align="center">
                <table class="col-600" width="600" border="0" align="center" cellpadding="0" cellspacing="0"
                       style="margin-left:20px; margin-right:20px;">
                    <tbody>
                    <tr>
                        <td align="center">
                            <table align="center" width="100%" border="0" cellspacing="0" cellpadding="0"
                                   style=" border-left: 1px solid #dbd9d9; border-right: 1px solid #dbd9d9;">
                                <tbody>
                                <tr>
                                    <td align="center" bgcolor="#34495e"
                                        background="https://para.guru/img/back.fw.b967de0d.webp" height="185">
                                        <table class="col-600" width="600" border="0" align="center" cellpadding="0"
                                               cellspacing="0">
                                            <tbody>
                                            <tr>
                                                <td height="25"></td>
                                            </tr>
    
                                            <tr>
                                                <td align="center"
                                                    style="font-family: 'Raleway',  sans-serif; font-size:26px; font-weight: 500; color:#f1c40f;">
                                                    Bizi takip edin.
                                                </td>
                                            </tr>
                                            <tr>
                                                <td height="25"></td>
                                            </tr>
                                            </tbody>
                                        </table>
                                        <table align="center" width="35%" border="0" cellspacing="0" cellpadding="0">
                                            <tbody>
                                            <tr>
                                                <td align="center" width="30%" style="vertical-align: top;">
                                                    <a href="" target="_blank"> <img
                                                            src="https://designmodo.com/demo/emailtemplate/images/icon-fb.png">
                                                    </a>
                                                </td>
    
                                                <td align="center" class="margin" width="30%" style="vertical-align: top;">
                                                    <a href="" target="_blank"> <img
                                                            src="https://designmodo.com/demo/emailtemplate/images/icon-twitter.png">
                                                    </a>
                                                </td>
    
                                                <td align="center" width="30%" style="vertical-align: top;">
                                                    <a href="" target="_blank"> <img
                                                            src="https://designmodo.com/demo/emailtemplate/images/icon-googleplus.png">
                                                    </a>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </td>
        </tr>
        <!-- END FOOTER -->
        </tbody>
    </table>
    `;
}

function passwdMailTemplate(ps) {
    return `
    <table width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
        <tbody>
        <tr>
            <td align="center">
                <table class="col-600" width="600" border="0" align="center" cellpadding="0" cellspacing="0">
                    <tbody>
                    <tr>
                        <td align="center" valign="top" background="https://para.guru/img/back.fw.b967de0d.webp"
                            bgcolor="#66809b" style="background-size:cover; background-position:top;height=" 400
                        ""="">
                        <table class="col-600" width="600" height="240" border="0" align="center" cellpadding="0"
                               cellspacing="0">
    
                            <tbody>
                            <tr>
                                <td height="10"></td>
                            </tr>
    
    
                            <tr>
                                <td align="center" style="line-height: 0px;">
                                    <img style="display:block; line-height:0px; font-size:0px; border:0px;"
                                         src="https://para.guru/img/logo.fb7d3ed9.png" width="109" height="103" alt="logo">
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </td>
        </tr>
        <tr>
            <td align="center">
                <table align="center" class="col-600" width="600" border="0" cellspacing="0" cellpadding="0">
                    <tbody>
                    <tr>
                        <td align="center" bgcolor="#2a3b4c">
                            <table class="col-600" width="600" align="center" border="0" cellspacing="0" cellpadding="0">
                                <tbody>
                                <tr>
                                    <td height="33"></td>
                                </tr>
                                <tr>
                                    <td>
                                        <table class="col1" width="183" border="0" align="left" cellpadding="0"
                                               cellspacing="0">
    
                                            <tbody>
                                            <tr>
                                                <td height="18"></td>
                                            </tr>
    
                                            <tr>
                                                <td align="center">
                                                    <img style="display:block; line-height:0px; font-size:0px; border:0px;"
                                                         class="images_style"
                                                         src="https://designmodo.com/demo/emailtemplate/images/icon-title.png"
                                                         alt="img" width="156" height="136">
                                                </td>
    
    
                                            </tr>
                                            </tbody>
                                        </table>
    
    
                                        <table class="col3_one" width="380" border="0" align="right" cellpadding="0"
                                               cellspacing="0">
    
                                            <tbody>
                                            <tr align="center" valign="top">
                                                <td style="font-family: 'Raleway', sans-serif; font-size:20px; color:#f1c40f; line-height:30px; font-weight: bold;">
                                                    Parola Sıfırlama
                                                </td>
                                            </tr>
    
    
                                            <tr>
                                                <td height="5"></td>
                                            </tr>
    
                                            <tr>
                                                <td height="10"></td>
                                            </tr>
    
                                            <tr align="left" valign="top">
                                                <td>
                                                    <table class="button" style="border: 2px solid #fff;" bgcolor="#2b3c4d"
                                                           width="30%" border="0" cellpadding="0" cellspacing="0">
                                                        <tbody>
                                                        <tr>
                                                            <td width="10"></td>
                                                            <td height="30" align="center"
                                                                style="font-family: 'Open Sans', Arial, sans-serif; font-size:13px; color:#ffffff;">
                                                                <span>${ps}</span>
                                                            </td>
                                                            <td width="10"></td>
                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
    
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td height="33"></td>
                                </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </td>
        </tr>
        <tr>
            <td align="center">
                <table class="col-600" width="600" border="0" align="center" cellpadding="0" cellspacing="0"
                       style="margin-left:20px; margin-right:20px;">
                    <tbody>
                    <tr>
                        <td align="center">
                            <table align="center" width="100%" border="0" cellspacing="0" cellpadding="0"
                                   style=" border-left: 1px solid #dbd9d9; border-right: 1px solid #dbd9d9;">
                                <tbody>
                                <tr>
                                    <td align="center" bgcolor="#34495e"
                                        background="https://para.guru/img/back.fw.b967de0d.webp" height="185">
                                        <table class="col-600" width="600" border="0" align="center" cellpadding="0"
                                               cellspacing="0">
                                            <tbody>
                                            <tr>
                                                <td height="25"></td>
                                            </tr>
    
                                            <tr>
                                                <td align="center"
                                                    style="font-family: 'Raleway',  sans-serif; font-size:26px; font-weight: 500; color:#f1c40f;">
                                                    Bizi takip edin.
                                                </td>
                                            </tr>
                                            <tr>
                                                <td height="25"></td>
                                            </tr>
                                            </tbody>
                                        </table>
                                        <table align="center" width="35%" border="0" cellspacing="0" cellpadding="0">
                                            <tbody>
                                            <tr>
                                                <td align="center" width="30%" style="vertical-align: top;">
                                                    <a href="" target="_blank"> <img
                                                            src="https://designmodo.com/demo/emailtemplate/images/icon-fb.png">
                                                    </a>
                                                </td>
    
                                                <td align="center" class="margin" width="30%" style="vertical-align: top;">
                                                    <a href="" target="_blank"> <img
                                                            src="https://designmodo.com/demo/emailtemplate/images/icon-twitter.png">
                                                    </a>
                                                </td>
    
                                                <td align="center" width="30%" style="vertical-align: top;">
                                                    <a href="" target="_blank"> <img
                                                            src="https://designmodo.com/demo/emailtemplate/images/icon-googleplus.png">
                                                    </a>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </td>
        </tr>
        <!-- END FOOTER -->
        </tbody>
    </table>
    `;
}

function getRandomInt( min, max ) {
    return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
}

function generateProductKey() {
    var code = "";
    for( var i = 0; i < 6; i++ ) {
        var k = getRandomInt( 0, 9 );
        code += k;
    }
    return code;
}

module.exports = {search, turkishToEnglish, mailTemplate, passwdMailTemplate, generateProductKey};