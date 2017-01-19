
class FileUtil {
    MIMEMAP = {
        'css': 'text/css',
        'gif': 'image/gif',
        'html': 'text/html',
        'ico': 'image/x-icon',
        'jpeg': 'image/jpeg',
        'jpg': 'image/jpeg',
        'js': 'text/javascript',
        'json': 'application/json',
        'pdf': 'application/pdf',
        'png': 'image/png',
        'svg': 'image/svg+xml',
        'swf': 'application/x-shockwave-flash',
        'tiff': 'image/tiff',
        'txt': 'text/plain',
        'wav': 'audio/x-wav',
        'wma': 'audio/x-ms-wma',
        'wmv': 'video/x-ms-wmv',
        'xml': 'text/xml',
        'apk': 'application/vnd.android.package-archive',
        'avi': 'video/x-msvideo',
        'doc': 'application/msword',
        'dot': 'application/msword',
        'htm': 'text/html',
        'shtml': 'text/html',
        'jpe': 'image/jpeg',
        'mpeg': 'video/mpeg',
        'mpg': 'video/mpeg',
        'mpe': 'video/mpeg',
        'mp3': 'audio/mpeg',
        'qt ': 'video/quicktime',
        'mov': 'video/quicktime',
        'ppt': 'application/mspowerpoint',
        'ppz': 'application/mspowerpoint',
        'pps': 'application/mspowerpoint',
        'pot': 'application/mspowerpoint',
        'rar': 'application/octet-stream',
        'rtf': 'application/rtf',
        'rtx': 'text/richtext',
        'xls': 'application/msexcel',
        'xla': 'application/msexcel',
        'z': 'application/x-compress',
        'zip': 'application/x-zip-compressed',
        'rmvb': 'application/vnd.rn-realmedia',
        'rm': 'application/vnd.rn-realmedia',
        'swf': 'application/x-shockwave-flash',
        'cab': 'application/x-shockwave-flash',
        'mp4': 'video/mp4',
        'mpg4': 'video/mp4',
    }

    getMIME(fileName) {
        if (!fileName) {
            return null
        }
        var index1 = fileName.lastIndexOf(".");
        var index2 = fileName.length;
        var postf = fileName.substring(index1 + 1, index2);//后缀名  
        var mime = this.MIMEMAP[postf]
        if (!mime) {
            return '*/*'
        }
        return mime
    }

    ICONMAP = {
        'gif': require('../resource/img/fileformat/format_picture.png'),
        'html': require('../resource/img/fileformat/format_html.png'),
        'ico': require('../resource/img/fileformat/format_picture.png'),
        'jpeg': require('../resource/img/fileformat/format_picture.png'),
        'jpg': require('../resource/img/fileformat/format_picture.png'),
        'json': require('../resource/img/fileformat/format_text.png'),
        'pdf': require('../resource/img/fileformat/format_pdf.png'),
        'png': require('../resource/img/fileformat/format_picture.png'),
        'svg': require('../resource/img/fileformat/format_picture.png'),
        'swf': require('../resource/img/fileformat/format_flash.png'),
        'tiff': require('../resource/img/fileformat/format_picture.png'),
        'txt': require('../resource/img/fileformat/format_text.png'),
        'wav': require('../resource/img/fileformat/format_music.png'),
        'wma': require('../resource/img/fileformat/format_music.png'),
        'wmv': require('../resource/img/fileformat/format_media.png'),
        'apk': require('../resource/img/fileformat/format_app.png'),
        'avi': require('../resource/img/fileformat/format_media.png'),
        'doc': require('../resource/img/fileformat/format_word.png'),
        'dot': require('../resource/img/fileformat/format_word.png'),
        'htm': require('../resource/img/fileformat/format_html.png'),
        'shtml': require('../resource/img/fileformat/format_html.png'),
        'jpe': require('../resource/img/fileformat/format_picture.png'),
        'mpeg': require('../resource/img/fileformat/format_media.png'),
        'mpg': require('../resource/img/fileformat/format_media.png'),
        'mpe': require('../resource/img/fileformat/format_media.png'),
        'mp3': require('../resource/img/fileformat/format_music.png'),
        'qt ': require('../resource/img/fileformat/format_media.png'),
        'mov': require('../resource/img/fileformat/format_media.png'),
        'ppt': require('../resource/img/fileformat/format_ppt.png'),
        'ppz': require('../resource/img/fileformat/format_ppt.png'),
        'pps': require('../resource/img/fileformat/format_ppt.png'),
        'pot': require('../resource/img/fileformat/format_ppt.png'),
        'rar': require('../resource/img/fileformat/format_zip.png'),
        'xls': require('../resource/img/fileformat/format_excel.png'),
        'xla': require('../resource/img/fileformat/format_excel.png'),
        'z': require('../resource/img/fileformat/format_zip.png'),
        'zip': require('../resource/img/fileformat/format_zip.png'),
        'mp4': require('../resource/img/fileformat/format_media.png'),
        'mpg4': require('../resource/img/fileformat/format_media.png'),
        'rmvb': require('../resource/img/fileformat/format_media.png'),
        'rm': require('../resource/img/fileformat/format_media.png'),
        'swf': require('../resource/img/fileformat/format_flash.png'),
        'cab': require('../resource/img/fileformat/format_flash.png'),
    }

    getIcon(fileName) {
        if (!fileName) {
            return null
        }
        var index1 = fileName.lastIndexOf(".");
        var index2 = fileName.length;
        var postf = fileName.substring(index1 + 1, index2);//后缀名  
        var icon = this.ICONMAP[postf]
        if (!icon) {
            return require('../resource/img/fileformat/format_unkown.png')
        }
        return icon
    }
}

const FileUtils = new FileUtil()

export default FileUtils