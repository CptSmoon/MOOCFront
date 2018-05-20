/**
 * Created by Abbes on 30/06/2017.
 */
declare let jQuery: any;
declare let swal: any;


export class Utils {


  public static zero(n: number) {
    if (n < 10) {
      return '0' + n;
    }
    return n;
  }

  static configDataTables() {
    jQuery.extend(jQuery.fn.dataTable.defaults, {
      autoWidth: false,
      columnDefs: [{
        orderable: false,
        width: '100px',
        targets: [5]
      }],
      dom: '<"datatable-header"fl><"datatable-scroll"t><"datatable-footer"ip>',
      language: {
        search: '<span>Filter:</span> _INPUT_',
        lengthMenu: '<span>Show:</span> _MENU_',
        paginate: {'first': 'First', 'last': 'Last', 'next': '&rarr;', 'previous': '&larr;'}
      },
      drawCallback: function () {
        jQuery(this).find('tbody tr').slice(-3).find('.dropdown, .btn-group').addClass('dropup');
      },
      preDrawCallback: function () {
        jQuery(this).find('tbody tr').slice(-3).find('.dropdown, .btn-group').removeClass('dropup');
      }
    });
  }


  private static groupBy(xs, key) {
    return xs.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };

  static initializeDataTables(timeout: number, columnNumber: number, classdata: string) {
    // Basic datatable
    const tableListStation = jQuery('.' + classdata);
    if (jQuery.fn.DataTable.isDataTable('.' + classdata)) {
      tableListStation.dataTable().fnDestroy();
    }
    setTimeout(function () {
      tableListStation.DataTable({
        dom: 'Bfrtip',

        buttons: [
          { extend: 'copyHtml5', footer: true },
          { extend: 'excelHtml5', footer: true },
          { extend: 'print', footer: true },
          { extend: 'pdfHtml5', footer: true }
          ]
        ,columnDefs: [{
          targets: [columnNumber - 1]
        }]
      });
    }, timeout);
  }

  static convertDate(date: string) {
    if (date) {
      console.log(date.substring(8, 10) + '/' + date.substring(5, 7) + '/' + date.substring(0, 4) + date.substring(10));
      return date.substring(8, 10) + '/' + date.substring(5, 7) + '/' + date.substring(0, 4) + date.substring(10);
    }
    return null;
  }

  static convertTime(time: string) {
    if (time) {
      return time.substring(0, 5);
    }
    return null;
  }

  static convertRealDate(date: string, time?: string) {
    if (date) {
      console.log(date);

      console.log(date.substring(0, 2), date.substring(3, 5), date.substring(6, 10));
      if (!time) {
        return new Date(+date.substring(6, 10), (+date.substring(3, 5) - 1), +date.substring(0, 2));
      } else {
        return new Date(+date.substring(6, 10), (+date.substring(3, 5) - 1), +date.substring(0, 2), +time.substring(0, 2), +time.substring(3, 5));
      }
    }
    return null;
  }

  static initializeClickNavBar(timeout: number) {
    setTimeout(function () {
      jQuery('.has_sub a').on('click', function () {
        console.log('Click 2 !!!');

        if (!jQuery(this).hasClass('subdrop')) {
          // hide any open menus and remove all other classes
          jQuery('ul', jQuery(this).parents('ul:first')).slideUp(350);
          jQuery('a', jQuery(this).parents('ul:first')).removeClass('subdrop');
          jQuery('#sidebar-menu .pull-right i').removeClass('md-remove').addClass('md-add');

          // open our new menu and add the open class
          jQuery(this).next('ul').slideDown(350);
          jQuery(this).addClass('subdrop');
          jQuery('.pull-right i', jQuery(this).parents('.has_sub:last')).removeClass('md-add').addClass('md-remove');
          jQuery('.pull-right i', jQuery(this).siblings('ul')).removeClass('md-remove').addClass('md-add');
        } else if (jQuery(this).hasClass('subdrop')) {
          jQuery(this).removeClass('subdrop');
          jQuery(this).next('ul').slideUp(350);
          jQuery('.pull-right i', jQuery(this).parent()).removeClass('md-remove').addClass('md-add');
        }
      });
    }, timeout);
  }

  static initializeScroll(timeout: number) {
    setTimeout(function () {
      jQuery('.slimscrollleft').slimScroll({
        height: 'auto',
        position: 'right',
        size: '5px',
        color: '#dcdcdc',
        wheelStep: 5
      });
    }, timeout);
  }

  static sweetAlert(title: string, content: string, type: string) {
    swal({
      title: title,
      text: content,
      type: type,
      button: 'OK!',
    });
  }
  static getModalTemplate() {
    return '<div class="modal-dialog modal-lg" role="document">\n' +
      '  <div class="modal-content">\n' +
      '    <div class="modal-header">\n' +
      '      <div class="kv-zoom-actions btn-group">{toggleheader}{fullscreen}{borderless}{close}</div>\n' +
      '      <h6 class="modal-title">{heading} <small><span class="kv-zoom-title"></span></small></h6>\n' +
      '    </div>\n' +
      '    <div class="modal-body">\n' +
      '      <div class="floating-buttons btn-group"></div>\n' +
      '      <div class="kv-zoom-body file-zoom-content"></div>\n' + '{prev} {next}\n' +
      '    </div>\n' +
      '  </div>\n' +
      '</div>\n';
  }

  static getPreviewZoomButtonClasses() {
    return {
      toggleheader: 'btn btn-default btn-icon btn-xs btn-header-toggle',
      fullscreen: 'btn btn-default btn-icon btn-xs',
      borderless: 'btn btn-default btn-icon btn-xs',
      close: 'btn btn-default btn-icon btn-xs'
    };
  }

  static getPreviewZoomButtonIcons() {
    return {
      prev: '<i class="icon-arrow-left32"></i>',
      next: '<i class="icon-arrow-right32"></i>',
      toggleheader: '<i class="icon-menu-open"></i>',
      fullscreen: '<i class="icon-screen-full"></i>',
      borderless: '<i class="icon-alignment-unalign"></i>',
      close: '<i class="icon-cross3"></i>'
    };
  }

  static initializeUploadFile(url: string, className: string,
                              fileSize : number,
                              initialData?: any[],
                              initialPreviewConfig?: InitialPreviewConfig[],
                              allowedFileExtensions?: string[]) {
    jQuery(className).fileinput({
      uploadUrl: url, // server upload action
      uploadAsync: true,
      maxFileCount: 10,
      maxFileSize: fileSize, //2MO
      showUpload: true,
      overwriteInitial: false,
      initialPreview: initialData,
      initialPreviewAsData: true,
      initialPreviewFileType: 'image', // image is the default and can be overridden in config below
      dropZoneTitle: "Pas encore de fichier(s) selectionné(s)",
      initialPreviewConfig: initialPreviewConfig,
      fileActionSettings: {
        removeIcon: '<i class="icon-trash"></i>',
        uploadIcon: '<i class="icon-cloud-upload"></i>',
        indicatorNew: '<i class="icon-plus text-slate"></i>',
        indicatorSuccess: '<i class="icon-checkmark3 file-icon-large text-success"></i>',
        indicatorError: '<i class="icon-cross2 text-danger"></i>',
        indicatorLoading: '<i class="icon-spinner2 spinner text-muted"></i>',
      },
      layoutTemplates: {
        icon: '<i class="icon-file-check"></i>',
        modal: Utils.getModalTemplate()
      },
      purifyHtml: true, // this by default purifies HTML data for preview
      initialCaption: "Pas encore de fichier selectionné",
      previewZoomButtonClasses: Utils.getPreviewZoomButtonClasses(),
      previewZoomButtonIcons: Utils.getPreviewZoomButtonIcons(),
      ajaxSettings: {headers: {'Authorization': 'Bearer ' }},
    });
  }

  static loadTypeFromExtension(ext: string) {
    if (ext.toLowerCase().match(/(avi|mpg|mkv|mov|mp4|3gp|webm|wmv)$/i)) {
      return "video";
    }
    if (ext.toLowerCase().match(/(pdf)$/i)) {
      return "pdf";
    }
  }

  static loadFileTypeFromExtension(ext: string) {
    if (ext.toLowerCase().match(/(avi|mpg|mkv|mov|mp4|3gp|webm|wmv)$/i)) {
      return "video/" + ext;
    }
    if (ext.toLowerCase().match(/(pdf)$/i)) {
      return "pdf";
    }
  }
}

export class InitialPreviewConfig {
  caption?: string;
  size?: number;
  width?: string;
  type?: string;
  filetype?: string;
  url: string;
  key: number;
}
