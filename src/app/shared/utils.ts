/**
 * Created by Abbes on 30/06/2017.
 */
declare var jQuery: any;

/**
 * Created by Vyndee on 27/03/2017.
 */
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
        columnDefs: [{
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
