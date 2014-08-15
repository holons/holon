// @TODO: Implement Complexform
/*:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
IMPORT MODULE: Complexform
:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::*/
// (function MODULE_Complexform (TEMP_ID) {
  var TEMP_ID;
  var TEMP_DATA;
  var schemaMapping = { // @TODO: use schema instead of hardcode!!!
    gender                      : '.Complexform__person__gender__input',
    business_unit               : '.Complexform__person__department__input',
    title                       : '.Complexform__person__title__input',
    position                    : '.Complexform__person__position__input',
    firstname                   : '.Complexform__person__prename__input',
    MOCK_contact_person         : '.Complexform__person__contactPerson__input',
    lastname                    : '.Complexform__person__surname__input',
    MOCK_other_contact_persons  : '.Complexform__person__otherContactPersons__input',
    businessrelations           : '.Complexform__person__relations__input',
    topics                      : '.Complexform__person__topics__input',
    phone                       : '.Complexform__communication__phone__input',
    phone_company               : '.Complexform__communication__phoneCompany__input',
    mobile                      : '.Complexform__communication__mobile__input',
    fax                         : '.Complexform__communication__fax__input',
    email                       : '.Complexform__communication__email__input',
    email_company               : '.Complexform__communication__emailCompany__input',
    company_name                : '.Complexform__address__name1__input',
    company_name_addition       : '.Complexform__address__name2__input',
    street                      : '.Complexform__address__street1__input',
    street_addition             : '.Complexform__address__street2__input',
    zip                         : '.Complexform__address__zip__input',
    post_box                    : '.Complexform__address__postbox__input',
    city                        : '.Complexform__address__city__input',
    post_box_zip                : '.Complexform__address__zipbox__input',
    country_name                : '.Complexform__address__country__input',
    region                      : '.Complexform__address__region__input',
    event_invitation_receiver   : '.Complexform__settings__event__input',
    phone_receiver              : '.Complexform__settings__phone__input',
    email_receiver              : '.Complexform__settings__email__input',
    fax_receiver                : '.Complexform__settings__fax__input',
    mass_email_receiver         : '.Complexform__settings__massEmail__input',
    letter_receiver             : '.Complexform__settings__letter__input',
    attaining_public_office     : '.Complexform__settings__office__input',
    history_text                : '.Complexform__journal__entry__content',      
    history_time                : '.Complexform__journal__entry__date',
    history_author              : '.Complexform__journal__entry__user'
  };
  DEPENDENCIES.Complexform.init = function (COMPONENT) {
    function fillForm (DATA) { // @TODO: USE SCHEMA and DO NOT HARDCODE!!!!
      for(var prop in DATA) {
        if (DATA.hasOwnProperty(prop)) {
          if (schemaMapping[prop]) {
            COMPONENT.querySelector(schemaMapping[prop]).innerHTML = DATA[prop];
          }
        }
      }
    }
    // INIT COMPLEXFORM
    COMPONENT.API = {
      // INPUT INTERFACE
      INTERFACE: {
        'USER_SET'  : function (DATA) { // @TODO: test this methods intensively
          TEMP_ID   = DATA.id;
          fillForm(DATA);
        },
        'USER_ADD'  : function (ID) { // @TODO: test this methods intensively
          TEMP_ID   = ID;
          TEMP_DATA = undefined;
          fillForm({});
        }
      },
      // OUTPUT INTERFACE
      EVENTS  : { 
        'CANCEL'  : 'DESCRIPTION: user did not provide any input and aborted',
        'SAVE'    : 'DESCRIPTION: user provided data which should be made persistent'
      }
    };
    // SOFTWARE DEVELOPER KIT
    var SDK = {
      EVENTS: {
        'CANCEL'    : function () {
          return new CustomEvent('CANCEL', { detail: {
            description: COMPONENT.API.EVENTS['CANCEL']
          }}); // @TODO: test - new event gets copy of message
        },
        'SAVE'      : function (DATA) {
          return new CustomEvent('SAVE', { detail: {
            description: COMPONENT.API.EVENTS['SAVE'],
            data: DATA
          }}); // @TODO: test - new event gets copy of message
        }
      }
    }


    // DISPATCH EVENTS - @TODO: BEM interActions could include EventNames
    var cancelButton  = COMPONENT.querySelector('.Complexform__menu__cancel');
    // var cancelButton  = COMPONENT.querySelector('.Complexform__button:CANCEL');
    cancelButton.addEventListener('click', function onClick (event) {
      COMPONENT.dispatchEvent(SDK.EVENTS['CANCEL']());
    });


    function getDataFromForm () {
      // @TODO: improve this shit
      // @TODO: add all the fields of a row
      return {
        id            : TEMP_ID,
        fullname      : COMPONENT.querySelector('.Complexform__person__prename__input').innerHTML + ' ' +
                        COMPONENT.querySelector('.Complexform__person__surname__input').innerHTML,
        phone         : COMPONENT.querySelector('.Complexform__communication__phone__input').innerHTML,
        email         : COMPONENT.querySelector('.Complexform__communication__email__input').innerHTML,
        company_name  : COMPONENT.querySelector('.Complexform__address__name1__input').innerHTML + ' - ' +
                        COMPONENT.querySelector('.Complexform__address__name2__input').innerHTML,
        action        : 'ACTION MENU' + TEMP_ID
      };
    }

    for(
      var index = 0, inputfields = COMPONENT.querySelectorAll('[contenteditable]');
      index < inputfields.length;
      index++
    ) {
      inputfields[index].addEventListener('blur', function onBlur (event) {
        // @TODO: Fix quick&dirty expensive saving
        var data = getDataFromForm();
        COMPONENT.dispatchEvent(SDK.EVENTS['SAVE']( data ));
      });
    }

    return COMPONENT.API;
  }
// })();