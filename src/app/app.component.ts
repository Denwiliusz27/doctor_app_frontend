import {Component, ViewChild} from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import {observable, ReplaySubject} from "rxjs";
import {jqxSchedulerComponent} from 'jqwidgets-ng/jqxscheduler';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  printButton: any = null;

  @ViewChild('schedulerReference', { static: false }) scheduler: jqxSchedulerComponent;
  ngAfterViewInit(): void {
    this.scheduler.ensureAppointmentVisible('id1');
  }
  getWidth(): any {
    if (document.body.offsetWidth < 850) {
      return '90%';
    }

    return 850;
  }

  generateAppointments(): any {
    let appointments = new Array();
    let appointment1 = {
      id: 'id1',
      description: 'George brings projector for presentations.',
      location: '',
      subject: 'Quarterly Project Review Meeting',
      calendar: 'Room 1',
      start: new Date(2020, 10, 23, 9, 0, 0),
      end: new Date(2020, 10, 23, 16, 0, 0)
    };
    let appointment2 = {
      id: 'id2',
      description: '',
      location: '',
      subject: 'IT Group Mtg.',
      calendar: 'Room 2',
      start: new Date(2020, 10, 24, 10, 0, 0),
      end: new Date(2020, 10, 24, 15, 0, 0)
    };

    appointments.push(appointment1);
    appointments.push(appointment2);

    return appointments;
  };
  source: any =
    {
      dataType: 'array',
      dataFields: [
        { name: 'id', type: 'string' },
       // { name: 'description', type: 'string' },
       // { name: 'location', type: 'string' },
       // { name: 'subject', type: 'string' },
       // { name: 'calendar', type: 'string' },
        { name: 'start', type: 'date' },
        { name: 'end', type: 'date' }
      ],
      id: 'id',
      localData: this.generateAppointments()
    };
  dataAdapter: any = new jqx.dataAdapter(this.source);
  date: any = new jqx.date(2020, 11, 23);
  appointmentDataFields: any =
    {
      from: 'start',
      to: 'end',
      id: 'id',
      /*description: 'description',
      location: 'location',
      subject: 'subject',
      resourceId: 'calendar'*/
    };
  resources: any =
    {
      colorScheme: 'scheme05',
      dataField: 'calendar',
      source: new jqx.dataAdapter(this.source)
    };
  views: any[] =
    [
      { type: 'weekView', showWeekends: true, timeRuler: { hidden: false }, workTime:
          {
            fromDayOfWeek: 1,
            toDayOfWeek: 6,
            fromHour: 7,
            toHour: 21
          } },
    ];

  editDialogCreate = (dialog, fields, editAppointment) => {
    // hide repeat option
    console.log(fields);
    fields.repeatContainer.hide();
    // hide timeZone option
    fields.timeZoneContainer.hide();
    // hide color option
    fields.colorContainer.hide();
    fields.subjectContainer.hide();


    fields.statusLabel.html('witam');
    fields.status
    console.log(fields.statusContainer);

 /*   const child2: [] = fields.statusContainer.children;
    fields.statusContainer.remove(child2);*/
    console.log(fields.statusContainer);
    const dziecko = fields.statusContainer.style;
    console.log(dziecko);


    fields.locationContainer.hide();
    fields.fromContainer.hide();
    fields.toContainer.hide();
    fields.resourceContainer.hide();
    fields.allDayContainer.hide();
    fields.descriptionContainer.hide();
    let buttonElement = document.createElement("BUTTON");
    buttonElement.innerText = 'Print';
    buttonElement.style.cssFloat = 'right';
    buttonElement.style.marginLeft = '5px';
    buttonElement.id = 'PrintButton';
    fields.buttons[0].appendChild(buttonElement);
    let printButton: jqwidgets.jqxButton = jqwidgets.createInstance('#PrintButton', 'jqxButton', {
      width: 50,
      height: 25
    });
    this.printButton = printButton;
    printButton.addEventHandler('click', function () {
      let appointment = editAppointment;
      if (!appointment && printButton.disabled) {
        return;
      }
      let appointmentContent =
        "<table class='printTable'>" +
        "<tr>" +
        "<td class='label'>Title</td>" +
        "<td>" + fields.subject.val() + "</td>" +
        "</tr>" +
        "<tr>" +
        "<td class='label'>Start</td>" +
        "<td>" + fields.from.val() + "</td>" +
        "</tr>" +
        "<tr>" +
        "<td class='label'>End</td>" +
        "<td>" + fields.to.val() + "</td>" +
        "</tr>" +
        "<tr>" +
        "<td class='label'>Where</td>" +
        "<td>" + fields.location.val() + "</td>" +
        "</tr>" +
        "<tr>" +
        "<td class='label'>Calendar</td>" +
        "<td>" + fields.resource.val() + "</td>" +
        "</tr>"
        + "</table>";
      let newWindow = window.open('', '', 'width=800, height=500'),
        document = newWindow.document.open(),
        pageContent =
          '<!DOCTYPE html>\n' +
          '<html>\n' +
          '<head>\n' +
          '<meta charset="utf-8" />\n' +
          '<title>jQWidgets Scheduler</title>\n' +
          '<style>\n' +
          '.printTable {\n' +
          'border-color: #aaa;\n' +
          '}\n' +
          '.printTable .label {\n' +
          'font-weight: bold;\n' +
          '}\n' +
          '.printTable td{\n' +
          'padding: 4px 3px;\n' +
          'border: 1px solid #DDD;\n' +
          'vertical-align: top;\n' +
          '}\n' +
          '</style>' +
          '</head>\n' +
          '<body>\n' + appointmentContent + '\n</body>\n</html>';
      try {
        document.write(pageContent);
        document.close();
      }
      catch (error) {
      }
      newWindow.print();
    });

  };
  /**
   * called when the dialog is opened. Returning true as a result disables the built-in handler.
   * @param {Object} dialog - jqxWindow's jQuery object.
   * @param {Object} fields - Object with all widgets inside the dialog.
   * @param {Object} the selected appointment instance or NULL when the dialog is opened from cells selection.
   */
  editDialogOpen = (dialog, fields, editAppointment) => {
    console.log('jestem tutaj');
    if (!editAppointment && this.printButton) {
      this.printButton.setOptions({ disabled: true });
    }
    else if (editAppointment && this.printButton) {
      this.printButton.setOptions({ disabled: false });
    }
  };

  editDialogClose = (dialog, fields, editAppointment) => {
    console.log('wychodzę');
    console.log(dialog);
    console.log(fields);
    console.log(editAppointment);
  };

  AppointmentAdd() {
    console.log('add');
  }

  AppointmentClick() {
    console.log('dodaje');
  }
}

