// @TODO: Implement DynaWrapper
/*:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
IMPORT MODULE: DynaWrapper

  DYNATABLE FACADE
  based on: https://www.dynatable.com/
:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::*/
(function MODULE_DynaWrapper (ENTITIES) {
  DEPENDENCIES.DynaWrapper.setSchema = function (COMPONENT) {
    var
      schema             = JSON.parse(COMPONENT.dataset.schema),
      headerContainer    = COMPONENT.querySelector('.Dynatable__header'),
      tplTitleCellQuery  = '[data-template="Dynatable__titleCell"]',
      tplTitleCell       = COMPONENT.querySelector(tplTitleCellQuery)
    ;
    delete tplTitleCell.dataset.template;
    headerContainer.innerHTML   = '';
    for(var concept = 0, tpl; concept < schema.length; concept++) {
      tpl = tplTitleCell.cloneNode();
      tpl.dataset.dynatableColumn = schema[concept];
      tpl.innerHTML = schema[concept];
      headerContainer.appendChild(tpl);
    }
  };
  DEPENDENCIES.DynaWrapper.initTable = function (COMPONENT) {
    // $.dynatableSetup({
    //   // your global default options here
    // });
    ENTITIES[0] = $(COMPONENT.querySelector('table'))
    .dynatable({
      table: {
        // match rails params+inputName conventions - OTHERS: e.g.'camelCase'
         defaultColumnIdStyle: 'underscore',
        // headRowSelector: 'thead tr', // or e.g. tr:first-child
        // bodyRowSelector: 'tbody tr',
        // headRowClass: null,
        // columns: ['name', 'song']
        // bodyRowSelector: 'li',       // DOES SOMETHING
      },
      dataset: {
        // ajax: false,
        // ajaxUrl: null,
        // ajaxCache: null,
        // ajaxOnLoad: false,
        // ajaxMethod: 'GET',
        // ajaxDataType: 'json',

        // totalRecordCount: null,
        // queries: null,
        // queryRecordCount: null,

        // recordCountText: '{dataset.recordCountText} {x} to {y} out of {z} {params.records}', // doesnt work
        processingText: 'Loading <img src="/images/loading.gif" />',

        // page: null,
        perPageDefault: 100,
        perPageOptions: [10,20,50,100],

        // sorts: null,
        // sortsKeys: null,
        // sortTypes: {},
        records: JSON.parse(COMPONENT.dataset.json)
      },
      features: {
        paginate: true,                 // Pages: Previous, 1, 2, ..., Next
        sort: true,                     // (sort onClick(headercolumn))
        pushState: true,                // (update URL with sort/filter params)
        search: true,                   // Search: ...
        recordCount: true,              // Showing 1 to 10 of 15 records
        perPageSelect: true             // Show: 10, 20, 50, 100
      },
      inputs: {
      //   queries: null,
      //   sorts: null,
        multisort: ['ctrlKey', 'shiftKey', 'metaKey'],
      //   page: null,                        // ???
        // queryEvent: 'blur change',         // ???
        recordCountPlacement: 'before',
        paginationLinkPlacement: 'before',
        paginationPrev: '<<',
        paginationNext: '>>',
        paginationGap: [1,2,2,1],
        searchTarget        : COMPONENT.querySelector('Dynatable__menu'), // doesnt work
        recordCountTarget   : COMPONENT.querySelector('Dynatable__menu'), // doesnt work
        paginationLinkTarget: COMPONENT.querySelector('Dynatable__menu'), // doesnt work

      //   searchPlacement: 'before',
      //   perPageTarget: null,
      //   perPagePlacement: 'before',
      //   perPageText: 'Show: ',
      //   recordCountText: 'Showing ',
        processingText: 'Processing...'
      },
      params: {
      //   dynatable: 'dynatable',
      //   queries: 'queries',
      //   sorts: 'sorts',
      //   page: 'page',
      //   perPage: 'perPage',
      //   offset: 'offset',
        records: 'ASDF_ASDF'
      //   record: null,
      //   queryRecordCount: 'queryRecordCount',
      //   totalRecordCount: 'totalRecordCount'
      },

      // Built-in writer functions,
      // can be overwritten, any additional functions
      // provided in writers will be merged with
      // this default object.
      writers: {
        _rowWriter: function customRowWriter(rowIndex, record, columns, cellWriter) {
          var tr = '';
          // grab the record's attribute for each column
          for (var i = 0, len = columns.length; i < len; i++) {
            tr += cellWriter(columns[i], record);
          }
          return "<tr "+
            "data-json='"+JSON.stringify(record)+"' "+
            "data-json-id='"+record.id+"'>" + tr + "</tr>";
        },
        _cellWriter: function customCellWriter(column, record) {
          var
            content = column.attributeWriter(record),
            td      = '<td class="'+content.property+'" '
          ;
          if (column.hidden || column.textAlign) {
            td += ' style="';
            // keep cells for hidden column headers hidden
            if (column.hidden) {
              td += 'display: none;';
            }
            // keep cells aligned as their column headers are aligned
            if (column.textAlign) {
              td += 'text-align: ' + column.textAlign + ';';
            }
            td += '"';
          }
          return td + '>' + content.html + '</td>';
        },
        _attributeWriter: function customAttributeWriter(record) {
          return {
            property  : 'Dynatable__contentCell__' + this.id,
            html      : '' + (function generateFrom(property) {
              switch (property) {
                case '':
                  return '----';
                case 'action':
                  // @TODO: Hacked Dynatable - Be careful, it might change RECORD
                  record[property] = '';

                  return 'ACTION MENU' + record.id;
                default:
                  return record[property];
              }
            })(this.id)
          }
        }
      },
      // Built-in reader functions,
      // can be overwritten, any additional functions
      // provided in readers will be merged with
      // this default object.
      readers: {
        _rowReader: function customRowReader(index, element, record) {
          var args = Array.prototype.slice.call(arguments);
          console.log('customRowReader');
          // var $li = $(element),
          //     $caption = $li.find('.caption');
          // record.thumbnail = $li.find('.thumbnail-image').html();
          // record.caption = $caption.html();
          // record.label = $caption.find('h3').text();
          // record.description = $caption.find('p').text();
          // record.color = $li.data('color');
          debugger;
        },
        _attributeReader: function customAttributeReader(index, element, record) {
          var args = Array.prototype.slice.call(arguments);
          console.log('customAttributeReader');
          debugger;
        }
      }
    }).data('dynatable');

    var
      dynatable   = ENTITIES[0],
      dynaRecords = dynatable.settings.dataset.originalRecords,
      max_length  = 10//dynaRecords.length || 10;
    ;
    return (function API_ENV() {
      function _findByID (id, exclude) {
        var results = dynaRecords.filter(function findById (o) {
          return o.id === id ? true : false;
        });
        return results.length === 0 ?
          undefined
          : results.length === 1 ? results[0] : results
      }
      function _updateItem (item, updates) {
        // LESEZEICHEN - UPDATE data-json and/or item
        for (prop in updates) {
          // @TODO: needs SchemaMapping again!!! - for now DIRTY HACK
          if (prop === 'fullname') {
            var temp = updates[prop].split(' ');
            item.firstname = temp[0];
            item.lastname  = temp[1];
          }
          item[prop] = updates[prop];
        }
        // @TODO: dirty update hack
        var element = COMPONENT.querySelector('tbody [data-json-id="'+item.id+'"]');
        element.dataset.json = item;

      }


      // THINK !!!!
      // Instead of having an "TARGET API INTERFACE" with "functions" to call
      // The "parameters" of all the functions could be "attributes" of the COMPONENT DOM,
      // thus: If someone wants to call the "TARGET API INTERFACE", he/she just sets the PARAMS,
      // which notifies the TARGET via MutationObservers, which in return processes the params
      // with the right internal procedures and updates its own DOM ATTRIBUTES, which others
      // listen to, so they know when to update themselves!
      // Problem:
      //  If multiple COMPONENTS listen to a TARGET COMPONENTs DOM ATTRIBUTEs, how could they know,
      //  whether its a JOB-RESULT-UPDATE or a REQUESTED-JOB-UPDATE, especially, when multiple
      //  REQUESTERS file JOBS for a TARGET COMPONENT...
      //
      // Benefit: The RESULTS of an operation are available all the time, until they get updated.
      // they are not an "EVENT" but a "SIGNAL"
      //


      // INTERFACE STORAGE
      COMPONENT.API = {
        // INPUT INTERFACE
        INTERFACE     : { // add, set, get, end
          add: function (item) {
            if (!item) return;
            // @TODO: check SCHEMA !!!!
            // => 1. every field has to be STRING
            // => 2. empty/undefined fields have to be 'empty string'
            max_length++;
            item.id = max_length;
            dynaRecords.push(item);
            dynatable.process();
            return item;
          },
          set: function (id, updates) {
            // @TODO: check SCHEMA !!!!
            // => 1. every field has to be STRING
            // => 2. empty/undefined fields have to be 'empty string'
            if (!updates) return;
            var item = _findByID(id);
            if (!item) { COMPONENT.API.INTERFACE.add(updates); } // @TODO: test this intensively
            _updateItem(item, updates);
            dynatable.process();
            return item;
          },
          get:    function (id) {
            return _findByID(id);
          },
          end: function (id) {
            var item = _findByID(id);
            if (item) {
              var position = dynaRecords.indexOf(item);
              // http://stackoverflow.com/questions/18347033/how-to-shorten-my-conditional-statements/18347047#answer-18347047
              if ( ~position ) { dynaRecords.splice(position, 1); }
              dynatable.process();
              return item;
            }
          }
        },
        // OUTPUT INTERFACE
        EVENTS  : { 
          'ADD' : 'DESCRIPTION: Get User Data and call "ADD" API of Dynatable',
          'SET' : 'DESCRIPTION: Get Update Data from user and call "SET" API of Dynatable',
          'GET' : 'DESCRIPTION: Call "GET" API of Dynatable and show data to user',
          'END' : 'DESCRIPTION: Call "END" API of Dynatable with id specified by user to delete'
        }
      };
      // SOFTWARE DEVELOPER KIT
      var SDK = {
        EVENTS: {
          'ADD'    : function (ID) {
            return new CustomEvent('ADD', { detail: {
              description: COMPONENT.API.EVENTS['ADD'],
              data: { id: ID}
            }}); // @TODO: test - new event gets copy of message
          },
          'SET'      : function (DATA) {
            return new CustomEvent('SET', { detail: {
              description: COMPONENT.API.EVENTS['SET'],
              data: DATA
            }}); // @TODO: test - new event gets copy of message
          },
          'GET'    : function (DATA) {
            return new CustomEvent('GET', { detail: {
              description: COMPONENT.API.EVENTS['GET'],
              data: DATA
            }}); // @TODO: test - new event gets copy of message
          },
          'END'    : function (DATA) {
            return new CustomEvent('END', { detail: {
              description: COMPONENT.API.EVENTS['END'],
              data: DATA
            }}); // @TODO: test - new event gets copy of message
          }
        }
      }

      // PUBLISH API
      COMPONENT.dataset.apiInterface = (function serialize (tmp) {
        var serialization = '  ';
        for(method in tmp) { serialization += method + '  '; }
        return serialization; 
      })(COMPONENT.API.INTERFACE);

      COMPONENT.dataset.apiEvents = (function serialize (tmp) {
        // @TODO: Create a data-events-* attribute for each event
        //        and set its value to the events description
        var serialization = '  ';
        for(name in tmp) {
            serialization += name + '  ';
          }
        return serialization; 
      })(COMPONENT.API.EVENTS);

      // POSTPROCESS
      var
        searchContainer     = COMPONENT.querySelector('.Dynatable__search'),
        paginationContainer = COMPONENT.querySelector('.Dynatable__paginator'),
        searchbar           = COMPONENT.querySelector('.dynatable-search'),
        recordCounter       = COMPONENT.querySelector('.dynatable-record-count'),
        paginationSwitcher  = COMPONENT.querySelector('.dynatable-pagination-links'),
        recordShower        = COMPONENT.querySelector('.dynatable-per-page')
      ;
      searchContainer.appendChild(searchbar);
      paginationContainer.appendChild(recordCounter);
      paginationContainer.appendChild(paginationSwitcher);
      paginationContainer.appendChild(recordShower);
      paginationSwitcher.querySelector('li span').innerHTML = '&nbsp;on page: ';

      function createListener (eventName) {
        switch (eventName) {
          case 'dynatable:afterUpdate':
            return function afterUpdate(e, dynatable) {
              // @Patch Menu Text for Pagination
              COMPONENT.querySelector('.dynatable-pagination-links').
              querySelector('li span').innerHTML = '&nbsp;on page: ';

              // ADD EVENT LISTENER to ROWS
              var contentCells = COMPONENT.querySelectorAll('[class*="Dynatable__contentCell"]');
              for(var index=0, cell, type; index<contentCells.length; index++) {
                cell = contentCells[index];
                type = cell.getAttribute('class').match(/Dynatable__contentCell__(.*)/)[1];
                switch (type) {
                  case 'action':
                    break;
                  case 'email':
                    break;
                  default:
                    // @TODO: maybe proper detaching/cleanup of EventListener is necessary
                    cell.addEventListener('click', function onClick (event) {
                      // @TODO: very slow to update the whole dataset
                      debugger;
                      COMPONENT.dispatchEvent(SDK.EVENTS['SET'](
                        JSON.parse(cell.parentNode.dataset.json)
                      ));
                    });
                    break;
                }
              }
            };
          default:
            return function onDynatableEvent (e, dynatable) {
              var e = eventName;
              var args = arguments;
              // console.log(e, args);
            };
        }
         
      }
      /*
      EVENT HOOKS
        dynatable:init
        Run after dynatable is initialized and setup, right before the initial process() is run.  dynatable (attached dynatable instance object)

        dynatable:beforeProcess
        Run at the beginning of process().  data (the data object containing the settings and records for the process() function)

        dynatable:ajax:success
        Run only if the dynatable instance has dataset.ajax=true, when the AJAX request returns successfully during the process() function. response (the jqXhr response object)

        dynatable:afterProcess
        Run at the end of the process() function. data (the data object containing the settings and records for the process() function)

        dynatable:beforeUpdate
        Run right before the DOM is updated with the current record set.  $rows (the set of DOM rows about to be written to the DOM)

        dynatable:afterUpdate
        Run right after the DOM is updated with the current record set. $rows (the set of DOM rows just written to the DOM)

        dynatable:push
        Run when pushState data is pushed to the window.  data (the data object containing the settings and records to be cached in the pushState cache)
      */
      ENTITIES[0].$element
      .bind('dynatable:preinit',        createListener('dynatable:preinit'))
      .bind('dynatable:init',           createListener('dynatable:init'))
      .bind('dynatable:beforeProcess',  createListener('dynatable:beforeProcess'))
      .bind('dynatable:ajax:success',   createListener('dynatable:ajax:success'))
      .bind('dynatable:afterProcess',   createListener('dynatable:afterProcess'))
      .bind('dynatable:beforeUpdate',   createListener('dynatable:beforeUpdate'))
      .bind('dynatable:afterUpdate',    createListener('dynatable:afterUpdate'))
      .bind('dynatable:push',           createListener('dynatable:push'));


      // DISPATCH EVENTS
      // New Item Button
      var addButton = COMPONENT.querySelector('.Dynatable__createItem');
      addButton.addEventListener('click', function onClick (event) {
        var eventAdd = new CustomEvent('ADD', SDK.EVENTS['ADD'](max_length + 1));
        COMPONENT.dispatchEvent(eventAdd);
      });

      return COMPONENT.API;
    })();

  }
})({});